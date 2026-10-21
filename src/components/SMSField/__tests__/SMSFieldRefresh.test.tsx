import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SMSField } from "../SMSField";
import { ISMSFieldProps } from "../types";
import { RefreshIcon } from "../components/RefreshIcon";
import { EComponentSize } from "../../../enums/EComponentSize";
import styles from "../styles/SMSField.module.less";

const createProps = (): ISMSFieldProps => ({
    code: "",
    onChangeCode: vi.fn(),
    onSubmitCode: vi.fn(),
    size: EComponentSize.MD,
});

describe("SMSField.Refresh", () => {
    it("disables refresh while countdown is active and shows progress", () => {
        const handleRefresh = vi.fn();

        render(
            <SMSField {...createProps()}>
                <SMSField.Refresh
                    aria-label="Запросить новый код"
                    countdownTime={10}
                    countdownTimeLeft={5}
                    onRefresh={handleRefresh}
                />
            </SMSField>,
        );

        const refreshButton = screen.getByRole("button", { name: "Запросить новый код" });
        expect(refreshButton).toBeDisabled();
        expect(refreshButton).toHaveClass(styles.disabled);
        fireEvent.click(refreshButton);
        expect(handleRefresh).not.toHaveBeenCalled();

        expect(refreshButton.querySelector("clipPath")).toHaveAttribute("id", "clipFront0.5");
    });

    it("invokes onRefresh and onClick when enabled", () => {
        const handleRefresh = vi.fn();
        const handleClick = vi.fn();

        render(
            <SMSField {...createProps()}>
                <SMSField.Refresh
                    aria-label="Получить код"
                    countdownTime={30}
                    countdownTimeLeft={0}
                    onRefresh={handleRefresh}
                    onClick={handleClick}
                />
            </SMSField>,
        );

        const refreshButton = screen.getByRole("button", { name: "Получить код" });
        expect(refreshButton).toBeEnabled();

        fireEvent.click(refreshButton);
        expect(handleRefresh).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: refreshButton }));

        expect(refreshButton.querySelector("clipPath")).toHaveAttribute("id", "clipFront0.999");
    });
});

describe("RefreshIcon", () => {
    it("clamps percent to three decimal places and applies disabled class", () => {
        const { container } = render(<RefreshIcon disabled percent={1.5} size={EComponentSize.MD} />);

        expect(container.querySelector("clipPath")).toHaveAttribute("id", "clipFront0.999");
        expect(container.querySelector(`.${styles.disabled}`)).toBeInTheDocument();
    });

    it("renders large icon dimensions for LG size", () => {
        const { container } = render(<RefreshIcon disabled={false} percent={0.25} size={EComponentSize.LG} />);

        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "32");
        expect(svg).toHaveAttribute("height", "32");
    });
});
