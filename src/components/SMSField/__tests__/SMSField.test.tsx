import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SMSField } from "../SMSField";
import { ISMSFieldProps } from "../types";
import { EFormFieldStatus } from "../../FormField/enums";
import { EComponentSize } from "../../../enums/EComponentSize";

const createProps = (): ISMSFieldProps => ({
    code: "1234",
    onChangeCode: vi.fn(),
    onSubmitCode: vi.fn(),
    size: EComponentSize.MD,
});

describe("SMSField", () => {
    it("forwards an object ref to the root div and passes native attributes and className", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SMSField
                {...createProps()}
                aria-label="SMS confirmation"
                className="custom-field"
                data-test-id="sms-confirmation"
                id="sms-confirmation"
                ref={ref}
                role="group"
            >
                <SMSField.Input aria-label="SMS code" />
            </SMSField>,
        );

        const root = screen.getByRole("group", { name: "SMS confirmation" });
        expect(ref.current).toBe(root);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(root).toHaveClass("smsField", "custom-field");
        expect(root).toHaveAttribute("id", "sms-confirmation");
        expect(root).toHaveAttribute("data-test-id", "sms-confirmation");
        expect(root).toContainElement(screen.getByRole("textbox", { name: "SMS code" }));
    });

    it("calls a callback ref with the root div and clears it on unmount", () => {
        const ref = vi.fn();
        const { unmount } = render(
            <SMSField {...createProps()} aria-label="SMS confirmation" ref={ref} role="group" />,
        );

        expect(ref).toHaveBeenCalledWith(screen.getByRole("group", { name: "SMS confirmation" }));

        unmount();

        expect(ref).toHaveBeenLastCalledWith(null);
    });

    it("passes root event handlers with their native event arguments", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(
            <SMSField {...createProps()} onClick={onClick}>
                <span>Confirmation content</span>
            </SMSField>,
        );

        const content = screen.getByText("Confirmation content");
        await user.click(content);

        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ target: content }));
    });

    it.each(Object.values(EComponentSize))("provides size %s to every nested control", (size) => {
        render(
            <SMSField {...createProps()} size={size}>
                <SMSField.Refresh
                    aria-label="Request code"
                    countdownTime={10}
                    countdownTimeLeft={0}
                    onRefresh={vi.fn()}
                />
                <SMSField.Input aria-label="SMS code" />
                <SMSField.Submit aria-label="Send code" />
            </SMSField>,
        );

        expect(screen.getByRole("textbox", { name: "SMS code" })).toHaveClass(size);
        expect(screen.getByRole("button", { name: "Request code" })).toHaveClass(size);
        expect(screen.getByRole("button", { name: "Send code" })).toHaveClass(size);
    });

    it("provides the default status when status is omitted", () => {
        render(
            <SMSField {...createProps()}>
                <SMSField.Input aria-label="SMS code" />
                <SMSField.Submit aria-label="Send code" />
            </SMSField>,
        );

        const input = screen.getByRole("textbox", { name: "SMS code" });
        expect(input).toBeEnabled();
        expect(input).not.toHaveAttribute("aria-invalid");
        expect(screen.getByRole("button", { name: "Send code" })).toBeEnabled();
    });

    it("updates controlled code and callbacks in nested controls when props change", async () => {
        const user = userEvent.setup();
        const props = createProps();
        const nextOnSubmitCode = vi.fn();
        const renderField = (fieldProps: ISMSFieldProps) => (
            <SMSField {...fieldProps}>
                <SMSField.Input aria-label="SMS code" />
                <SMSField.Submit aria-label="Send code" />
            </SMSField>
        );
        const { rerender } = render(renderField(props));
        const input = screen.getByRole("textbox", { name: "SMS code" });

        fireEvent.change(input, { target: { value: "5678" } });

        expect(props.onChangeCode).toHaveBeenCalledWith("5678");
        expect(input).toHaveValue("1234");

        rerender(renderField({ ...props, code: "5678", onSubmitCode: nextOnSubmitCode }));

        expect(input).toHaveValue("5678");

        await user.click(screen.getByRole("button", { name: "Send code" }));
        fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });

        expect(nextOnSubmitCode).toHaveBeenCalledTimes(2);
        expect(nextOnSubmitCode).toHaveBeenNthCalledWith(1, "5678");
        expect(nextOnSubmitCode).toHaveBeenNthCalledWith(2, "5678");
        expect(props.onSubmitCode).not.toHaveBeenCalled();
    });

    it("propagates status changes and blocks submissions while disabled", async () => {
        const user = userEvent.setup();
        const props = createProps();
        const onRefresh = vi.fn();
        const renderField = (status: ISMSFieldProps["status"]) => (
            <SMSField {...props} status={status}>
                <SMSField.Refresh
                    aria-label="Request code"
                    countdownTime={10}
                    countdownTimeLeft={0}
                    onRefresh={onRefresh}
                />
                <SMSField.Input aria-label="SMS code" />
                <SMSField.Submit aria-label="Send code" />
            </SMSField>
        );
        const { rerender } = render(renderField(EFormFieldStatus.ERROR));
        const input = screen.getByRole("textbox", { name: "SMS code" });
        const submit = screen.getByRole("button", { name: "Send code" });
        const refresh = screen.getByRole("button", { name: "Request code" });

        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toBeEnabled();
        expect(submit).toBeEnabled();

        rerender(renderField(EFormFieldStatus.DISABLED));

        expect(input).toBeDisabled();
        expect(input).not.toHaveAttribute("aria-invalid");
        expect(submit).toBeDisabled();
        expect(refresh).toBeDisabled();

        await user.click(submit);
        await user.click(refresh);
        fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });

        expect(props.onSubmitCode).not.toHaveBeenCalled();
        expect(onRefresh).not.toHaveBeenCalled();

        rerender(renderField(EFormFieldStatus.DEFAULT));

        expect(input).toBeEnabled();
        expect(submit).toBeEnabled();
        expect(refresh).toBeEnabled();

        await user.click(submit);

        expect(props.onSubmitCode).toHaveBeenCalledWith("1234");
    });
});
