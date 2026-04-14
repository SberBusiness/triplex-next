import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HelpBox } from "../HelpBox";
import { ETooltipSize, ETooltipPreferPlace } from "../../Tooltip/enums";

vi.mock("focus-trap-react", () => {
    const FocusTrap = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
    return { FocusTrap, default: FocusTrap };
});

vi.mock("@sberbusiness/icons-next", () => ({
    QuestioncircleFilledSrvIcon16: ({ paletteIndex }: { paletteIndex?: number }) => (
        <div data-testid="question-icon" data-palette-index={paletteIndex}>
            Question Icon
        </div>
    ),
    CrossStrokeSrvIcon16: ({ paletteIndex }: { paletteIndex?: number }) => (
        <div data-testid="cross-icon" data-palette-index={paletteIndex}>
            Cross Icon
        </div>
    ),
}));

describe("HelpBox", () => {
    it("renders target button with aria-label passed via rest props", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} preferPlace={ETooltipPreferPlace.BELOW} aria-label="Подсказка">
                Текст подсказки
            </HelpBox>,
        );

        const button = screen.getByRole("button", { name: "Подсказка" });
        expect(button).toBeInTheDocument();
    });

    it("renders tooltip content when open", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.SM} isOpen>
                Видимый контент тултипа
            </HelpBox>,
        );

        expect(screen.getByText("Видимый контент тултипа")).toBeInTheDocument();
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("applies aria and data attributes to tooltip container", () => {
        render(
            <HelpBox
                tooltipSize={ETooltipSize.LG}
                isOpen
                tooltipAriaAttributes={{ label: "Custom" }}
                tooltipDataAttributes={{ testid: "hb" }}
            >
                Контент
            </HelpBox>,
        );

        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-label", "Custom");
        expect(dialog).toHaveAttribute("data-testid", "hb");
    });

    it("calls toggle(false) when close button is pressed in controlled mode", () => {
        const handleToggle = vi.fn();
        render(
            <HelpBox
                tooltipSize={ETooltipSize.LG}
                isOpen
                toggle={handleToggle}
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Контент
            </HelpBox>,
        );

        const close = screen.getByRole("button", { name: "Закрыть" });
        fireEvent.click(close);
        expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it("passes tooltipXButtonProps to close button", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} isOpen tooltipXButtonProps={{ "aria-label": "Close" }}>
                Контент
            </HelpBox>,
        );

        expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });

    it("forwards ref to button element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} ref={ref} aria-label="Подсказка">
                Контент
            </HelpBox>,
        );

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(screen.getByRole("button", { name: "Подсказка" }));
    });

    it("passes className to target button", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} className="custom-class" aria-label="Подсказка">
                Контент
            </HelpBox>,
        );

        const button = screen.getByRole("button", { name: "Подсказка" });
        expect(button).toHaveClass("custom-class");
    });
});
