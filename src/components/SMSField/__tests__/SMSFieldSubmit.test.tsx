import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SMSField } from "../SMSField";
import { SMSFieldContext } from "../SMSFieldContext";
import { ISMSFieldProps } from "../types";
import { SubmitIcon } from "../components/SubmitIcon";
import { EComponentSize } from "../../../enums/EComponentSize";
import styles from "../styles/SMSField.module.less";

const createProps = (): ISMSFieldProps => ({
    code: "",
    onChangeCode: vi.fn(),
    onSubmitCode: vi.fn(),
    size: EComponentSize.MD,
});

describe("SMSField.Submit", () => {
    it("disables submit button when code is empty", () => {
        render(
            <SMSField {...createProps()}>
                <SMSField.Submit aria-label="Отправить" />
            </SMSField>,
        );

        const submitButton = screen.getByRole("button", { name: "Отправить" });
        expect(submitButton).toBeDisabled();
        expect(submitButton).not.toHaveClass(styles.active);
    });

    it("activates submit button and calls onSubmitCode when code is provided", () => {
        const props = { ...createProps(), code: "9876" };

        render(
            <SMSField {...props}>
                <SMSField.Submit aria-label="Подтвердить" />
            </SMSField>,
        );

        const submitButton = screen.getByRole("button", { name: "Подтвердить" });
        expect(submitButton).toBeEnabled();
        expect(submitButton).toHaveClass(styles.active);

        fireEvent.click(submitButton);
        expect(props.onSubmitCode).toHaveBeenCalledWith("9876");
    });

    it("updates disabledSubmit flag in context based on code presence", async () => {
        const disabledSubmitListener = vi.fn();

        const DisabledSubmitProbe: React.FC<{ listener: (value: boolean) => void }> = ({ listener }) => {
            const { disabledSubmit } = React.useContext(SMSFieldContext);

            React.useEffect(() => {
                listener(disabledSubmit);
            }, [disabledSubmit, listener]);

            return null;
        };

        const ControlledSMSField: React.FC = () => {
            const [code, setCode] = React.useState("");

            return (
                <SMSField code={code} onChangeCode={setCode} onSubmitCode={vi.fn()} size={EComponentSize.MD}>
                    <DisabledSubmitProbe listener={disabledSubmitListener} />
                    <SMSField.Input aria-label="SMS code" />
                    <SMSField.Submit aria-label="Отправить код" />
                </SMSField>
            );
        };

        render(<ControlledSMSField />);

        expect(disabledSubmitListener).toHaveBeenLastCalledWith(true);

        fireEvent.change(screen.getByRole("textbox", { name: "SMS code" }), { target: { value: "1234" } });
        await waitFor(() => expect(disabledSubmitListener).toHaveBeenLastCalledWith(false));
    });

    it("forwards ref to the submit button", () => {
        const ref = React.createRef<HTMLButtonElement>();

        render(
            <SMSField {...createProps()}>
                <SMSField.Submit aria-label="Отправить" ref={ref} />
            </SMSField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button", { name: "Отправить" }));
    });
});

describe("SubmitIcon", () => {
    it("renders svg with large size dimensions for LG variant", () => {
        const { container } = render(<SubmitIcon size={EComponentSize.LG} />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "26");
        expect(svg).toHaveAttribute("height", "26");
    });

    it("renders svg with default dimensions for non-LG sizes", () => {
        const { container } = render(<SubmitIcon size={EComponentSize.MD} />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "20");
        expect(svg).toHaveAttribute("height", "20");
    });
});
