import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LightBoxPrev } from "../LightBoxControls/LightBoxPrev";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import styles from "../styles/LightBoxControls.module.less";

vi.mock("@sberbusiness/icons-next", () => ({
    CaretleftStrokeSrvIcon32: () => <span data-testid="icon-prev-desktop" />,
    CaretleftStrokeSrvIcon20: () => <span data-testid="icon-prev-mobile" />,
}));

/**
 * Мокает offsetParent, моделируя видимость кнопок: скрыта кнопка противоположного режима.
 * В jsdom offsetParent всегда null, а TriggerClickOnKeyDownEvent кликает только по видимой кнопке.
 */
const mockViewport = (mode: "desktop" | "mobile") => {
    const hiddenClassName = mode === "desktop" ? styles.lightBoxControlsMobile : styles.lightBoxControlsDesktop;

    vi.spyOn(HTMLElement.prototype, "offsetParent", "get").mockImplementation(function (this: HTMLElement) {
        return this.classList.contains(hiddenClassName) ? null : document.body;
    } as () => Element | null);
};

describe("LightBoxPrev", () => {
    beforeEach(() => {
        mockViewport("desktop");
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("renders desktop and mobile buttons with data-test-id", () => {
        render(<LightBoxPrev title="Назад" onClick={vi.fn()} />);

        const buttons = screen.getAllByTitle("Назад");
        expect(buttons).toHaveLength(2);
        buttons.forEach((button) => expect(button).toHaveAttribute("data-test-id", "lightBox-prev"));
    });

    it("renders keyboard and non-keyboard button groups when clickByArrowLeft is set", () => {
        render(<LightBoxPrev title="Назад" onClick={vi.fn()} clickByArrowLeft />);

        expect(screen.getAllByTitle("Назад")).toHaveLength(4);
    });

    it("calls onClick on button click", () => {
        const onClick = vi.fn();
        render(<LightBoxPrev title="Назад" onClick={onClick} />);

        fireEvent.click(screen.getAllByTitle("Назад")[0]);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once on ArrowLeft keydown in desktop mode when clickByArrowLeft is set", () => {
        const onClick = vi.fn();
        render(<LightBoxPrev title="Назад" onClick={onClick} clickByArrowLeft />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once on ArrowLeft keydown in mobile mode when clickByArrowLeft is set", () => {
        mockViewport("mobile");
        const onClick = vi.fn();
        render(<LightBoxPrev title="Назад" onClick={onClick} clickByArrowLeft />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick on ArrowRight keydown", () => {
        const onClick = vi.fn();
        render(<LightBoxPrev title="Назад" onClick={onClick} clickByArrowLeft />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        expect(onClick).not.toHaveBeenCalled();
    });

    it("does not call onClick on ArrowLeft keydown without clickByArrowLeft", () => {
        const onClick = vi.fn();
        render(<LightBoxPrev title="Назад" onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });
        expect(onClick).not.toHaveBeenCalled();
    });

    it("sets data-tutorial-id on buttons", () => {
        render(<LightBoxPrev title="Назад" onClick={vi.fn()} dataTutorialId="tutorial-prev" />);

        screen
            .getAllByTitle("Назад")
            .forEach((button) => expect(button).toHaveAttribute("data-tutorial-id", "tutorial-prev"));
    });

    it("merges className on the root container", () => {
        const { container } = render(<LightBoxPrev title="Назад" onClick={vi.fn()} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class", styles.lightBoxPrev);
    });
});
