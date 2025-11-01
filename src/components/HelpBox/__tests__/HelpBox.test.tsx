import React from "react";
import { vi } from "vitest";
import { describe, it, expect, vi as vitestVi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HelpBox } from "../HelpBox";
import { ETooltipSize, ETooltipPreferPlace } from "@sberbusiness/triplex-next/components/Tooltip/enums";

vi.mock("focus-trap-react", () => {
    const FocusTrap = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
    return { FocusTrap, default: FocusTrap };
});

describe("HelpBox", () => {
    it("renders target button with aria-label", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} preferPlace={ETooltipPreferPlace.BELOW}>
                Текст подсказки
            </HelpBox>,
        );

        const button = screen.getByRole("button", { name: "Подсказка" });
        expect(button).toBeInTheDocument();
    });

    it("renders tooltip content when open", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} isOpen>
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
        const handleToggle = vitestVi.fn();
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} isOpen toggle={handleToggle}>
                Контент
            </HelpBox>,
        );

        const close = screen.getByRole("button", { name: "Закрыть" });
        fireEvent.click(close);
        expect(handleToggle).toHaveBeenCalledWith(false);
    });
});
