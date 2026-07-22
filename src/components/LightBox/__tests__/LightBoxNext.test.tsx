import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LightBoxNext } from "../LightBoxControls/LightBoxNext";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";
import styles from "../styles/LightBoxControls.module.less";

vi.mock("@sberbusiness/icons-next", () => ({
    CaretrightStrokeSrvIcon32: () => <span data-testid="icon-next-desktop" />,
    CaretrightStrokeSrvIcon20: () => <span data-testid="icon-next-mobile" />,
}));

describe("LightBoxNext", () => {
    beforeEach(() => {
        // В jsdom offsetParent всегда null, а TriggerClickOnKeyDownEvent кликает только по видимой кнопке.
        vi.spyOn(HTMLElement.prototype, "offsetParent", "get").mockReturnValue(document.body);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it("renders desktop and mobile buttons with data-test-id", () => {
        render(<LightBoxNext title="Вперёд" onClick={vi.fn()} />);

        const buttons = screen.getAllByTitle("Вперёд");
        expect(buttons).toHaveLength(2);
        buttons.forEach((button) => expect(button).toHaveAttribute("data-test-id", "lightBox-next"));
    });

    it("renders keyboard and non-keyboard button groups when clickByArrowRight is set", () => {
        render(<LightBoxNext title="Вперёд" onClick={vi.fn()} clickByArrowRight />);

        expect(screen.getAllByTitle("Вперёд")).toHaveLength(4);
    });

    it("calls onClick on button click", () => {
        const onClick = vi.fn();
        render(<LightBoxNext title="Вперёд" onClick={onClick} />);

        fireEvent.click(screen.getAllByTitle("Вперёд")[0]);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick on ArrowRight keydown when clickByArrowRight is set", () => {
        const onClick = vi.fn();
        render(<LightBoxNext title="Вперёд" onClick={onClick} clickByArrowRight />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick on ArrowLeft keydown", () => {
        const onClick = vi.fn();
        render(<LightBoxNext title="Вперёд" onClick={onClick} clickByArrowRight />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });
        expect(onClick).not.toHaveBeenCalled();
    });

    it("does not call onClick on ArrowRight keydown without clickByArrowRight", () => {
        const onClick = vi.fn();
        render(<LightBoxNext title="Вперёд" onClick={onClick} />);

        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        expect(onClick).not.toHaveBeenCalled();
    });

    it("sets data-tutorial-id on buttons", () => {
        render(<LightBoxNext title="Вперёд" onClick={vi.fn()} dataTutorialId="tutorial-next" />);

        screen
            .getAllByTitle("Вперёд")
            .forEach((button) => expect(button).toHaveAttribute("data-tutorial-id", "tutorial-next"));
    });

    it("merges className on the root container", () => {
        const { container } = render(<LightBoxNext title="Вперёд" onClick={vi.fn()} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class", styles.lightBoxNext);
    });
});
