import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@sberbusiness/triplex-next/components/TextField/TextFieldBase", () => ({
    TextFieldBase: vi.fn(({ children, ...props }) => (
        <div data-testid="text-field-base" {...props}>
            {children}
        </div>
    )),
}));

vi.mock("@sberbusiness/triplex-next/components/NumberField/NumberFieldInput", () => ({
    NumberFieldInput: vi.fn((props) => <input data-testid="number-field-input" {...props} />),
}));

import { NumberField } from "@sberbusiness/triplex-next/components/NumberField";
import { TextFieldBase } from "@sberbusiness/triplex-next/components/TextField/TextFieldBase";
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
        counter: "0/100",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render TextFieldBase with correct props", () => {
        render(<NumberField {...defaultProps} className="test-class" />);

        expect(TextFieldBase).toHaveBeenCalledWith(
            {
                className: "test-class",
                label: "Label",
                prefix: "Prefix",
                postfix: "Postfix",
                description: "Description",
                counter: "0/100",
                children: expect.any(Object),
            },
            {},
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

        expect(NumberFieldInput).toHaveBeenCalledWith(
            { value: "123", placeholder: "0", required: true, name: "test-field" },
            {},
        );
    });

    it("should render NumberFieldInput as child of TextFieldBase", () => {
        render(<NumberField {...defaultProps} />);

        const textFieldBaseCall = (TextFieldBase as any).mock.calls[0];
        const children = textFieldBaseCall[0].children;

        expect(children.type).toBe(NumberFieldInput);
        expect(children.props).toEqual({ value: "123", placeholder: "0" });
    });
});
