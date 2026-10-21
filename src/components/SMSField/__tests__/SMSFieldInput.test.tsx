import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SMSField } from "../SMSField";
import { ISMSFieldProps } from "../types";
import { EFormFieldStatus } from "../../FormField/enums";
import { EComponentSize } from "../../../enums/EComponentSize";
import styles from "../styles/SMSField.module.less";

const createProps = (status?: ISMSFieldProps["status"]): ISMSFieldProps => ({
    code: "",
    onChangeCode: vi.fn(),
    onSubmitCode: vi.fn(),
    size: EComponentSize.MD,
    status,
});

describe("SMSField.Input", () => {
    it("accepts only numeric input, updates controlled value and submits on Enter", async () => {
        const handleChangeCode = vi.fn();
        const handleSubmitCode = vi.fn();
        const handleOnChange = vi.fn();

        const ControlledSMSField: React.FC = () => {
            const [code, setCode] = React.useState("");

            const handleCodeChange = (value: string) => {
                setCode(value);
                handleChangeCode(value);
            };

            return (
                <SMSField
                    code={code}
                    onChangeCode={handleCodeChange}
                    onSubmitCode={handleSubmitCode}
                    size={EComponentSize.MD}
                >
                    <SMSField.Input aria-label="SMS code" placeholder="Введите код" onChange={handleOnChange} />
                    <SMSField.Submit aria-label="Отправить код" />
                </SMSField>
            );
        };

        render(<ControlledSMSField />);

        const input = screen.getByRole("textbox", { name: "SMS code" });

        fireEvent.change(input, { target: { value: "12" } });
        expect(handleChangeCode).toHaveBeenLastCalledWith("12");
        expect(handleOnChange).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue("12");

        fireEvent.change(input, { target: { value: "12a" } });
        expect(handleChangeCode).toHaveBeenCalledTimes(1);
        expect(handleOnChange).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue("12");

        fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });
        await waitFor(() => expect(handleSubmitCode).toHaveBeenCalledWith("12"));
    });

    it("renders description text and counter content", () => {
        render(
            <SMSField {...createProps()} code="1234">
                <SMSField.Input
                    aria-label="SMS code"
                    counter={<span data-testid="sms-counter">4 / 8</span>}
                    description="Введите код, отправленный по SMS"
                />
            </SMSField>,
        );

        expect(screen.getByText("Введите код, отправленный по SMS")).toBeInTheDocument();
        expect(screen.getByTestId("sms-counter")).toHaveTextContent("4 / 8");
    });

    it("shows error text instead of placeholder in error status", () => {
        render(
            <SMSField {...createProps(EFormFieldStatus.ERROR)}>
                <SMSField.Input aria-label="SMS code" errorText="Неверный код" placeholder="Введите код" />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });
        expect(input).toBeEnabled();
        expect(input).toHaveAttribute("placeholder", "Неверный код");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveClass(styles.errorPlaceholder);
    });

    it("returns own placeholder on focus and restores error text on blur", () => {
        render(
            <SMSField {...createProps(EFormFieldStatus.ERROR)}>
                <SMSField.Input aria-label="SMS code" errorText="Неверный код" placeholder="Введите код" />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });

        fireEvent.focus(input);
        expect(input).toHaveAttribute("placeholder", "Введите код");
        expect(input).not.toHaveClass(styles.errorPlaceholder);

        fireEvent.blur(input);
        expect(input).toHaveAttribute("placeholder", "Неверный код");
        expect(input).toHaveClass(styles.errorPlaceholder);
    });

    it("ignores errorText in disabled status", () => {
        render(
            <SMSField {...createProps(EFormFieldStatus.DISABLED)}>
                <SMSField.Input aria-label="SMS code" errorText="Неверный код" placeholder="Введите код" />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });
        expect(input).toBeDisabled();
        expect(input).toHaveAttribute("placeholder", "Введите код");
        expect(input).not.toHaveClass(styles.errorPlaceholder);
        expect(input).not.toHaveAttribute("aria-invalid");
    });

    it("shows own placeholder and error status when errorText is not set", () => {
        render(
            <SMSField {...createProps(EFormFieldStatus.ERROR)}>
                <SMSField.Input aria-label="SMS code" placeholder="Введите код" />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });
        expect(input).toHaveAttribute("placeholder", "Введите код");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).not.toHaveClass(styles.errorPlaceholder);
    });

    it("ignores errorText without error status", () => {
        render(
            <SMSField {...createProps()}>
                <SMSField.Input aria-label="SMS code" errorText="Неверный код" placeholder="Введите код" />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });
        expect(input).toHaveAttribute("placeholder", "Введите код");
        expect(input).not.toHaveAttribute("aria-invalid");
        expect(input).not.toHaveClass(styles.errorPlaceholder);
    });

    it("forwards own onFocus and onBlur handlers", () => {
        const onFocus = vi.fn();
        const onBlur = vi.fn();

        render(
            <SMSField {...createProps()}>
                <SMSField.Input aria-label="SMS code" onBlur={onBlur} onFocus={onFocus} placeholder="Введите код" />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });

        fireEvent.focus(input);
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ target: input }));

        fireEvent.blur(input);
        expect(onBlur).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ target: input }));
    });

    it("calls own onKeyDown with the input as currentTarget", () => {
        const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLInputElement>) => event.currentTarget);

        render(
            <SMSField {...createProps()}>
                <SMSField.Input aria-label="SMS code" onKeyDown={onKeyDown} />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });
        fireEvent.keyDown(input, { key: "1" });

        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyDown.mock.results[0].value).toBe(input);
    });
});
