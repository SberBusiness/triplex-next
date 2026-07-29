import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LightBoxClose } from "../LightBoxControls/LightBoxClose";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import styles from "../styles/LightBoxControls.module.less";

vi.mock("@sberbusiness/icons-next", () => ({
    CrossStrokeSrvIcon32: () => <span data-testid="icon-close-desktop" />,
    CrossStrokeSrvIcon20: () => <span data-testid="icon-close-mobile" />,
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

describe("LightBoxClose", () => {
    beforeEach(() => {
        mockViewport("desktop");
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("renders keyboard and non-keyboard button groups with default title", () => {
        render(<LightBoxClose onClick={vi.fn()} />);

        expect(screen.getAllByTitle("Закрыть")).toHaveLength(4);
    });

    it("supports custom title", () => {
        render(<LightBoxClose onClick={vi.fn()} title="Close" />);

        expect(screen.getAllByTitle("Close")).toHaveLength(4);
    });

    it("calls onClick on button click", () => {
        const onClick = vi.fn();
        render(<LightBoxClose onClick={onClick} />);

        fireEvent.click(screen.getAllByTitle("Закрыть")[0]);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once on Escape keydown in desktop mode", () => {
        const onClick = vi.fn();
        render(<LightBoxClose onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once on Escape keydown in mobile mode", () => {
        mockViewport("mobile");
        const onClick = vi.fn();
        render(<LightBoxClose onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ESCAPE });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick on other keydown", () => {
        const onClick = vi.fn();
        render(<LightBoxClose onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ENTER });
        expect(onClick).not.toHaveBeenCalled();
    });

    it("merges className on the root container", () => {
        const { container } = render(<LightBoxClose onClick={vi.fn()} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class", styles.lightBoxClose);
    });
});
