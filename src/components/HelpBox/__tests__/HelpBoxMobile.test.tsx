import React from "react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, within } from "@testing-library/react";
import type { FocusTrapProps } from "focus-trap-react";
import { HelpBox } from "../HelpBox";
import { ETooltipSize } from "../../Tooltip/enums";

vi.mock("focus-trap-react", () => {
    // Ловушки различаем по props: HelpBox передаёт containerElements, Puller — шторку в children.
    const FocusTrap = ({
        active,
        children,
        containerElements,
    }: Pick<FocusTrapProps, "active" | "children" | "containerElements">) => (
        <div data-testid={containerElements ? "helpbox-focus-trap" : "puller-focus-trap"} data-active={active}>
            {children}
        </div>
    );
    return { FocusTrap, default: FocusTrap };
});

vi.mock("@sberbusiness/icons-next", () => ({
    QuestioncircleFilledSrvIcon16: () => <div data-testid="question-icon">Question Icon</div>,
    CrossStrokeSrvIcon16: () => <div data-testid="cross-icon">Cross Icon</div>,
}));

/** Подменяет matchMedia так, чтобы MobileView считал экран мобильным. */
const mockMobileScreen = () => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: true,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
};

describe("HelpBox (мобильная версия)", () => {
    beforeAll(() => {
        mockMobileScreen();
    });

    it("renders mobileHeaderContent in the mobile tooltip", () => {
        render(
            <HelpBox
                tooltipSize={ETooltipSize.LG}
                isOpen
                mobileHeaderContent="Заголовок подсказки"
                aria-label="Подсказка"
            >
                Контент подсказки
            </HelpBox>,
        );

        expect(screen.getByText("Заголовок подсказки")).toBeInTheDocument();
        expect(screen.getByText("Контент подсказки")).toBeInTheDocument();
        // Заголовок отрисован — TooltipMobile не уходит в headerless-режим.
        expect(screen.getByRole("dialog").closest(".tooltipMobile")).not.toHaveClass("headerless");
    });

    it("switches the tooltip to headerless mode when mobileHeaderContent is not passed", () => {
        render(
            <HelpBox tooltipSize={ETooltipSize.LG} isOpen aria-label="Подсказка">
                Контент подсказки
            </HelpBox>,
        );

        const dialog = screen.getByRole("dialog");

        // Отсутствие заголовка наблюдаемо: TooltipMobile помечает подсказку классом
        // headerless и подставляет кнопку закрытия прямо в её тело.
        expect(dialog.closest(".tooltipMobile")).toHaveClass("headerless");
        expect(within(dialog).getByTestId("cross-icon")).toBeInTheDocument();
        expect(screen.getByText("Контент подсказки")).toBeInTheDocument();
    });

    it("delegates focus trapping to Puller on mobile", () => {
        render(
            <HelpBox
                tooltipSize={ETooltipSize.LG}
                isOpen
                mobileHeaderContent="Заголовок подсказки"
                aria-label="Подсказка"
            >
                Контент подсказки
            </HelpBox>,
        );

        // Собственная ловушка HelpBox — только для desktop; на mobile фокус удерживает шторка Puller.
        expect(screen.queryByTestId("helpbox-focus-trap")).not.toBeInTheDocument();
        const pullerFocusTrap = screen.getByTestId("puller-focus-trap");
        expect(pullerFocusTrap).toHaveAttribute("data-active", "true");
        expect(pullerFocusTrap).toContainElement(screen.getByRole("dialog"));
    });
});
