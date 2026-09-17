import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TriggerClickOnKeyDownEvent } from "../TriggerClickOnKeyDownEvent";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

/**
 * В jsdom offsetParent всегда null, а компонент кликает только по видимой кнопке
 * (offsetParent !== null). Поэтому видимость элемента задаётся в тесте явно.
 */
const setElementVisible = (element: HTMLElement, visible: boolean): void => {
    Object.defineProperty(element, "offsetParent", {
        configurable: true,
        get: () => (visible ? document.body : null),
    });
};

describe("TriggerClickOnKeyDownEvent", () => {
    it("renders children as is, without own markup", () => {
        const targetRef = React.createRef<HTMLButtonElement>();

        const { container } = render(
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={targetRef}>
                <button type="button" ref={targetRef}>
                    Close
                </button>
            </TriggerClickOnKeyDownEvent>,
        );

        expect(container.firstChild).toBe(screen.getByRole("button"));
        expect(container.childElementCount).toBe(1);
    });

    it("clicks the target button when the pressed key matches eventKeyCode", () => {
        const onClick = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        render(
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={targetRef}>
                <button type="button" ref={targetRef} onClick={onClick}>
                    Close
                </button>
            </TriggerClickOnKeyDownEvent>,
        );
        setElementVisible(screen.getByRole("button"), true);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    it("does not click the target button when another key is pressed", () => {
        const onClick = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        render(
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={targetRef}>
                <button type="button" ref={targetRef} onClick={onClick}>
                    Close
                </button>
            </TriggerClickOnKeyDownEvent>,
        );
        setElementVisible(screen.getByRole("button"), true);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });

        expect(onClick).not.toHaveBeenCalled();
    });

    // Инвариант: клик выполняется только по видимой кнопке. На этот чек опираются LightBoxClose
    // и LightBoxArrow, где десктопная и мобильная копии кнопки скрываются через display: none.
    it("does not click the target button when it is hidden", () => {
        const onClick = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        render(
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={targetRef}>
                <button type="button" ref={targetRef} onClick={onClick}>
                    Close
                </button>
            </TriggerClickOnKeyDownEvent>,
        );
        setElementVisible(screen.getByRole("button"), false);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).not.toHaveBeenCalled();
    });

    // Ошибка из нативного слушателя не пробрасывается наружу dispatchEvent (DOM-спека, шаг
    // «report an exception»), поэтому not.toThrow() здесь всегда зелёный и защиту не фиксирует.
    // jsdom поднимает такую ошибку событием error на window — его и слушаем.
    it("does nothing when targetRef is not attached to an element", () => {
        const onError = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        render(
            <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={targetRef}>
                <span>Content</span>
            </TriggerClickOnKeyDownEvent>,
        );

        window.addEventListener("error", onError);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });
        window.removeEventListener("error", onError);

        expect(targetRef.current).toBeNull();
        expect(onError).not.toHaveBeenCalled();
    });

    it("clicks the target button on any key code when an array is passed", () => {
        const onClick = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        render(
            <TriggerClickOnKeyDownEvent
                eventKeyCode={[EVENT_KEY_CODES.ARROW_LEFT, EVENT_KEY_CODES.ARROW_RIGHT]}
                targetRef={targetRef}
            >
                <button type="button" ref={targetRef} onClick={onClick}>
                    Prev
                </button>
            </TriggerClickOnKeyDownEvent>,
        );
        setElementVisible(screen.getByRole("button"), true);

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_UP });

        expect(onClick).toHaveBeenCalledTimes(2);
    });

    // targetRef не обязан указывать на children: так вложенные триггеры в LightBoxClose
    // обслуживают две разные кнопки, отрисованные одним children.
    it("clicks the target button rendered outside children", () => {
        const onClick = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        render(
            <>
                <button type="button" ref={targetRef} onClick={onClick}>
                    Outside
                </button>
                <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={targetRef}>
                    <span>Content</span>
                </TriggerClickOnKeyDownEvent>
            </>,
        );
        setElementVisible(screen.getByRole("button"), true);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    // Кнопка живёт вне размонтируемого поддерева: иначе React обнулил бы targetRef.current,
    // и тест остался бы зелёным из-за пустого ref, а не из-за снятого слушателя.
    it("stops clicking the target button after unmount", () => {
        const onClick = vi.fn();
        const targetRef = React.createRef<HTMLButtonElement>();

        const Wrapper = ({ withTrigger }: { withTrigger: boolean }) => (
            <>
                <button type="button" ref={targetRef} onClick={onClick}>
                    Close
                </button>
                {withTrigger ? (
                    <TriggerClickOnKeyDownEvent eventKeyCode={EVENT_KEY_CODES.ESCAPE} targetRef={targetRef}>
                        <span>Content</span>
                    </TriggerClickOnKeyDownEvent>
                ) : null}
            </>
        );

        const { rerender } = render(<Wrapper withTrigger />);
        setElementVisible(screen.getByRole("button"), true);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(onClick).toHaveBeenCalledTimes(1);

        rerender(<Wrapper withTrigger={false} />);
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ESCAPE });

        expect(targetRef.current).not.toBeNull();
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
