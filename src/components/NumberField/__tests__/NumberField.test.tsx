import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { ITextFieldBaseProps } from "../../TextField/TextFieldBase";
import type { IFormFieldInputProps } from "../../FormField";
import type { INumberFieldProps } from "../types";

const { textFieldBaseRender, numberFieldInputRender } = vi.hoisted(() => ({
    textFieldBaseRender: vi.fn<React.ForwardRefRenderFunction<HTMLDivElement, ITextFieldBaseProps>>(),
    numberFieldInputRender: vi.fn<React.ForwardRefRenderFunction<HTMLInputElement, IFormFieldInputProps>>(),
}));

vi.mock("@sberbusiness/triplex-next/components/TextField/TextFieldBase", () => {
    textFieldBaseRender.mockImplementation(
        ({ children, description, counter, prefix, postfix, label, ...props }, ref) => (
            <div data-testid="text-field-base" {...props} ref={ref}>
                {children}
            </div>
        ),
    );
    const TextFieldBase = React.forwardRef(textFieldBaseRender);
    TextFieldBase.displayName = "TextFieldBaseMock";
    return { TextFieldBase };
});

vi.mock("@sberbusiness/triplex-next/components/NumberField/NumberFieldInput", () => {
    numberFieldInputRender.mockImplementation((props, ref) => (
        <input data-testid="number-field-input" {...props} readOnly ref={ref} />
    ));
    const NumberFieldInput = React.forwardRef(numberFieldInputRender);
    NumberFieldInput.displayName = "NumberFieldInputMock";
    return { NumberFieldInput };
});

import { NumberField } from "@sberbusiness/triplex-next/components/NumberField";
import { NumberFieldInput } from "@sberbusiness/triplex-next/components/NumberField/NumberFieldInput";

describe("NumberField", () => {
    const defaultProps = {
        inputProps: {
            value: "123",
            placeholder: "0",
        },
        label: "Label",
        prefix: "Prefix",
        postfix: "Postfix",
        description: "Description",
        counter: "Counter",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render TextFieldBase with correct props", () => {
        render(<NumberField {...defaultProps} className="test-class" />);

        expect(textFieldBaseRender).toHaveBeenCalledWith(
            {
                className: "test-class",
                label: "Label",
                prefix: "Prefix",
                postfix: "Postfix",
                description: "Description",
                counter: "Counter",
                children: expect.any(Object),
            },
            null,
        );
    });

    it("should render NumberFieldInput with correct inputProps", () => {
        const propsWithInputAttributes = {
            ...defaultProps,
            inputProps: {
                ...defaultProps.inputProps,
                required: true,
                name: "test-field",
            },
        };

        render(<NumberField {...propsWithInputAttributes} />);

        expect(numberFieldInputRender).toHaveBeenCalledWith(
            { value: "123", placeholder: "0", required: true, name: "test-field" },
            null,
        );
    });

    it("should render NumberFieldInput as child of TextFieldBase", () => {
        render(<NumberField {...defaultProps} />);

        const textFieldBaseCall = vi.mocked(textFieldBaseRender).mock.calls[0];
        const children = textFieldBaseCall[0].children;

        expect(React.isValidElement(children)).toBe(true);
        if (React.isValidElement<INumberFieldProps["inputProps"]>(children)) {
            expect(children.type).toBe(NumberFieldInput);
            expect(children.props).toEqual({ value: "123", placeholder: "0" });
        }
    });
});
