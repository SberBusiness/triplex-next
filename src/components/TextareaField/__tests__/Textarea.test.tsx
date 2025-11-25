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

vi.mock("@sberbusiness/triplex-next/components/FormField/components/FormFieldTextarea", () => ({
    FormFieldTextarea: vi.fn((props) => <input data-testid="number-field-textarea" {...props} />),
}));

import { TextareaField } from "@sberbusiness/triplex-next/components/TextareaField";
import { TextFieldBase } from "@sberbusiness/triplex-next/components/TextField/TextFieldBase";
import { FormFieldTextarea } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldTextarea";

describe("TextareaField", () => {
    const defaultProps = {
        textareaProps: {
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
        render(<TextareaField {...defaultProps} className="test-class" />);

        expect(TextFieldBase).toHaveBeenCalledWith(
            {
                className: "test-class",
                label: "Label",
                prefix: "Prefix",
                postfix: "Postfix",
                description: "Description",
                counter: "Counter",
                children: expect.any(Object),
            },
            {},
        );
    });

    it("should render NumberFieldInput with correct inputProps", () => {
        const propsWithInputAttributes = {
            ...defaultProps,
            textareaProps: {
                ...defaultProps.textareaProps,
                required: true,
                name: "test-field",
            },
        };

        render(<TextareaField {...propsWithInputAttributes} />);

        expect(FormFieldTextarea).toHaveBeenCalledWith(
            { value: "123", placeholder: "0", required: true, name: "test-field" },
            {},
        );
    });

    it("should render NumberFieldInput as child of TextFieldBase", () => {
        render(<TextareaField {...defaultProps} />);

        const textFieldBaseCall = (TextFieldBase as any).mock.calls[0];
        const children = textFieldBaseCall[0].children;

        expect(children.type).toBe(FormFieldTextarea);
        expect(children.props).toEqual({ value: "123", placeholder: "0" });
    });
});
