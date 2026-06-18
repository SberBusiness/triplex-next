import React from "react";
import { render, cleanup } from "@testing-library/react";
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
