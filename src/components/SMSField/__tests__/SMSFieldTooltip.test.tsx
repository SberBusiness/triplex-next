import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SMSField } from "../SMSField";
import { SMSFieldContext } from "../SMSFieldContext";
import { ISMSFieldProps } from "../types";
import { EComponentSize } from "../../../enums/EComponentSize";

const createProps = (): ISMSFieldProps => ({
    code: "",
    onChangeCode: vi.fn(),
    onSubmitCode: vi.fn(),
    size: EComponentSize.MD,
});

describe("SMSField.Tooltip", () => {
    it("generates tooltip id, wires it to refresh button and displays tooltip content", async () => {
        const tooltipListener = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        const TooltipIdProbe: React.FC<{ listener: (value?: string) => void }> = ({ listener }) => {
            const { tooltipId } = React.useContext(SMSFieldContext);

            React.useEffect(() => {
                listener(tooltipId);
            }, [listener, tooltipId]);

            return null;
        };

        render(
            <SMSField {...createProps()}>
                <TooltipIdProbe listener={tooltipListener} />
                <SMSField.Tooltip message="Код повторно отправлен" targetRef={targetRef} isOpen>
                    <SMSField.Refresh
                        aria-label="Отправить снова"
                        countdownTime={10}
                        countdownTimeLeft={0}
                        onRefresh={vi.fn()}
                        ref={targetRef}
                    />
                </SMSField.Tooltip>
            </SMSField>,
        );

        const refreshButton = screen.getByRole("button", { name: "Отправить снова" });

        await waitFor(() => expect(refreshButton.getAttribute("aria-describedby")).toBeTruthy());

        const tooltipId = refreshButton.getAttribute("aria-describedby");
        expect(tooltipListener).toHaveBeenLastCalledWith(tooltipId);
        expect(document.getElementById(tooltipId ?? "")).toHaveTextContent("Код повторно отправлен");
    });

    it("uses provided id and keeps refresh aria-describedby in sync when it changes", async () => {
        const targetRef = React.createRef<HTMLButtonElement>();
        const renderField = (id: string) => (
            <SMSField {...createProps()}>
                <SMSField.Tooltip id={id} message="Запросить код" targetRef={targetRef} isOpen>
                    <SMSField.Refresh
                        aria-label="Отправить снова"
                        countdownTime={10}
                        countdownTimeLeft={0}
                        onRefresh={vi.fn()}
                        ref={targetRef}
                    />
                </SMSField.Tooltip>
            </SMSField>
        );

        const { rerender } = render(renderField("sms-tooltip"));
        const refreshButton = screen.getByRole("button", { name: "Отправить снова" });

        await waitFor(() => expect(refreshButton).toHaveAttribute("aria-describedby", "sms-tooltip"));
        expect(document.getElementById("sms-tooltip")).toHaveTextContent("Запросить код");

        rerender(renderField("sms-tooltip-next"));

        await waitFor(() => expect(refreshButton).toHaveAttribute("aria-describedby", "sms-tooltip-next"));
        expect(document.getElementById("sms-tooltip-next")).toHaveTextContent("Запросить код");
    });
});
