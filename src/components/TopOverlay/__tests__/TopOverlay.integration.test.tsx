import React from "react";
import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import type { FocusTrapProps } from "focus-trap-react";
import { TopOverlay } from "../TopOverlay";

const focusTrapMock = vi.fn<(props: FocusTrapProps) => void>();

// Мокается только focus-trap-react: Overlay и OverlayBase здесь настоящие — тест проверяет их связку.
vi.mock("focus-trap-react", () => ({
    FocusTrap: (props: FocusTrapProps) => {
        focusTrapMock(props);
        return <div data-testid="focus-trap">{props.children}</div>;
    },
}));

/** Последние свойства, с которыми был отрисован FocusTrap. */
const getLastFocusTrapProps = () => focusTrapMock.mock.calls[focusTrapMock.mock.calls.length - 1][0];

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    focusTrapMock.mockClear();
});

describe("TopOverlay + Overlay", () => {
    it("activates the focus trap and reports onOpen when mounted already opened", () => {
        vi.spyOn(window, "getComputedStyle").mockReturnValue({
            getPropertyValue: () => "0px",
        } as unknown as CSSStyleDeclaration);
        // Обёртка отрисована выше вьюпорта — позиционирование должно быть скорректировано.
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: -40 } as DOMRect);
        const handleOpen = vi.fn();

        const { container } = render(
            <TopOverlay opened onOpen={handleOpen}>
                <button type="button">Закрыть</button>
            </TopOverlay>,
        );

        // OverlayBase вызывает onOpen на маунте, TopOverlay в ответ включает ловушку фокуса.
        expect(handleOpen).toHaveBeenCalledTimes(1);
        expect(getLastFocusTrapProps().active).toBe(true);

        // Позицию на маунте не трогаем — её задают стили, измерять в этот момент нечего.
        const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
        expect(wrapper.style.top).toBe("");
    });

    it("does not start the open cycle when mounted closed", () => {
        const handleOpen = vi.fn();

        const { container } = render(
            <TopOverlay opened={false} onOpen={handleOpen}>
                <button type="button">Закрыть</button>
            </TopOverlay>,
        );

        expect(handleOpen).not.toHaveBeenCalled();
        expect(getLastFocusTrapProps().active).toBe(false);
        expect((container.querySelector(".topOverlayWrapper") as HTMLElement).style.top).toBe("");
    });
});
