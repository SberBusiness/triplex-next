import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { OverlayBase, EOverlayDirection, IOverlayChildrenProvideProps } from "../OverlayBase";

afterEach(cleanup);

describe("OverlayBase", () => {
    it("passes provideProps into the children render function", () => {
        const childrenSpy = vi.fn<(props: IOverlayChildrenProvideProps) => React.ReactElement>(() => (
            <div data-testid="content" />
        ));

        render(
            <OverlayBase direction={EOverlayDirection.RIGHT} opened={false} setOpened={vi.fn()}>
                {childrenSpy}
            </OverlayBase>,
        );

        expect(childrenSpy).toHaveBeenCalled();
        const provideProps = childrenSpy.mock.calls[0][0];
        expect(provideProps).toEqual(
            expect.objectContaining({
                closing: false,
                opening: false,
                opened: false,
                direction: EOverlayDirection.RIGHT,
                setOpened: expect.any(Function),
                setClosing: expect.any(Function),
                setOpening: expect.any(Function),
            }),
        );
    });

    it("forwards direction to provideProps", () => {
        let received: IOverlayChildrenProvideProps | undefined;

        render(
            <OverlayBase direction={EOverlayDirection.LEFT} opened setOpened={vi.fn()}>
                {(props) => {
                    received = props;
                    return <div />;
                }}
            </OverlayBase>,
        );

        expect(received?.direction).toBe(EOverlayDirection.LEFT);
        expect(received?.opened).toBe(true);
    });

    it("renders the element returned by the children render function", () => {
        const { getByTestId } = render(
            <OverlayBase direction={EOverlayDirection.RIGHT} opened={false} setOpened={vi.fn()}>
                {() => <div data-testid="rendered-content" />}
            </OverlayBase>,
        );

        expect(getByTestId("rendered-content")).toBeInTheDocument();
    });

    it("calls onOpen on initial mount when opened is true", () => {
        const onOpen = vi.fn();
        const onOpening = vi.fn();
        const onClose = vi.fn();
        const onClosing = vi.fn();

        render(
            <OverlayBase
                direction={EOverlayDirection.RIGHT}
                opened
                setOpened={vi.fn()}
                onOpen={onOpen}
                onOpening={onOpening}
                onClose={onClose}
                onClosing={onClosing}
            >
                {() => <div />}
            </OverlayBase>,
        );

        // Оверлей смонтирован уже открытым: анимации открытия не было, цикл открытия завершён сразу.
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onOpening).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
        expect(onClosing).not.toHaveBeenCalled();
    });

    it("calls onOpen only once when a mounted-open overlay is closed and opened again", () => {
        const onOpen = vi.fn();
        const renderOverlay = (opened: boolean) => (
            <OverlayBase direction={EOverlayDirection.RIGHT} opened={opened} setOpened={vi.fn()} onOpen={onOpen}>
                {(props) => (
                    <div data-testid="panel" onTransitionEnd={() => props.setOpening(false)}>
                        content
                    </div>
                )}
            </OverlayBase>
        );

        const { rerender } = render(renderOverlay(true));

        expect(onOpen).toHaveBeenCalledTimes(1);

        // Закрытие и повторное открытие идут обычным путём: onOpen приходит по завершении анимации открытия.
        rerender(renderOverlay(false));
        rerender(renderOverlay(true));

        expect(onOpen).toHaveBeenCalledTimes(1);

        fireEvent.transitionEnd(screen.getByTestId("panel"));

        expect(onOpen).toHaveBeenCalledTimes(2);
    });

    it("does not call lifecycle callbacks on initial mount when opened is false", () => {
        const onOpen = vi.fn();
        const onOpening = vi.fn();
        const onClose = vi.fn();
        const onClosing = vi.fn();

        render(
            <OverlayBase
                direction={EOverlayDirection.RIGHT}
                opened={false}
                setOpened={vi.fn()}
                onOpen={onOpen}
                onOpening={onOpening}
                onClose={onClose}
                onClosing={onClosing}
            >
                {() => <div />}
            </OverlayBase>,
        );

        expect(onOpen).not.toHaveBeenCalled();
        expect(onOpening).not.toHaveBeenCalled();
        expect(onClose).not.toHaveBeenCalled();
        expect(onClosing).not.toHaveBeenCalled();
    });
});
