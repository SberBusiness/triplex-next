import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LightBoxSideOverlay } from "../LightBoxSideOverlay/LightBoxSideOverlay";
import { EComponentSize } from "../../../enums/EComponentSize";
import styles from "../LightBoxSideOverlay/styles/LightBoxSideOverlay.module.less";
import loaderStyles from "../LightBoxSideOverlay/styles/LightBoxSideOverlayLoader.module.less";

interface IFocusTrapMockProps {
    active?: boolean;
    children?: React.ReactNode;
}

const focusTrapMock = vi.fn();

vi.mock("focus-trap-react", () => {
    const FocusTrapMock = (props: IFocusTrapMockProps) => {
        focusTrapMock(props);
        return <>{props.children}</>;
    };

    // В focus-trap-react 10 (версия React 17-ветки) компонент экспортируется по
    // умолчанию, в 11 — именованным. Отдаём оба, чтобы мок не зависел от версии.
    return { default: FocusTrapMock, FocusTrap: FocusTrapMock };
});

describe("LightBoxSideOverlay", () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    const getWrapper = () => screen.getByRole("dialog");
    const getContent = () => document.querySelector(`.${styles.lightBoxSideOverlayContent}`) as HTMLDivElement;

    it("renders children and merges className on the dialog element", () => {
        render(
            <LightBoxSideOverlay opened className="custom-class">
                <div>Overlay content</div>
            </LightBoxSideOverlay>,
        );

        expect(screen.getByText("Overlay content")).toBeInTheDocument();
        expect(getWrapper()).toHaveClass("custom-class", styles.lightBoxSideOverlayWrapper);
    });

    it("forwards ref to the dialog element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <LightBoxSideOverlay opened ref={ref}>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveAttribute("role", "dialog");
        expect(ref.current).toHaveAttribute("aria-modal", "true");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies size class for size %s", (size, expectedClass) => {
        render(
            <LightBoxSideOverlay opened size={size}>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(getWrapper()).toHaveClass(expectedClass);
    });

    it("applies opened class when opened", () => {
        render(
            <LightBoxSideOverlay opened>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(getWrapper()).toHaveClass(styles.opened);
    });

    it("calls onOpen after opening transition ends", () => {
        const onOpen = vi.fn();
        const { rerender } = render(
            <LightBoxSideOverlay opened={false} onOpen={onOpen}>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        rerender(
            <LightBoxSideOverlay opened onOpen={onOpen}>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(getContent()).toHaveClass(styles.opening);
        expect(onOpen).not.toHaveBeenCalled();

        fireEvent.transitionEnd(getContent());

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(getContent()).not.toHaveClass(styles.opening);
    });

    it("calls onClose after closing transition ends", () => {
        const onClose = vi.fn();
        const { rerender } = render(
            <LightBoxSideOverlay opened onClose={onClose}>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        rerender(
            <LightBoxSideOverlay opened={false} onClose={onClose}>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(getContent()).toHaveClass(styles.closing);
        expect(onClose).not.toHaveBeenCalled();

        fireEvent.transitionEnd(getContent());

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(getContent()).not.toHaveClass(styles.closing);
    });

    it("hides overflow while loading", () => {
        render(
            <LightBoxSideOverlay opened isLoading>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(getWrapper()).toHaveClass(styles.overflowXHidden, styles.overflowYHidden);
    });

    it("hides vertical overflow when top overlay is opened", () => {
        render(
            <LightBoxSideOverlay opened isTopOverlayOpened>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(getWrapper()).toHaveClass(styles.overflowYHidden);
        expect(getWrapper()).not.toHaveClass(styles.overflowXHidden);
    });

    it("hides overflow when top level side overlay is opened", () => {
        render(
            <LightBoxSideOverlay opened isTopLevelSideOverlayOpened>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(getWrapper()).toHaveClass(styles.overflowXHidden, styles.overflowYHidden);
    });

    it("renders loader while loading", () => {
        render(
            <LightBoxSideOverlay opened isLoading>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(document.querySelector(`.${loaderStyles.lightBoxSideOverlayLoaderWrapper}`)).not.toBeNull();
    });

    it("activates focus trap only in stable opened state", () => {
        const { rerender } = render(
            <LightBoxSideOverlay opened>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        expect(focusTrapMock.mock.calls.at(-1)?.[0].active).toBe(true);

        rerender(
            <LightBoxSideOverlay opened={false}>
                <div>Content</div>
            </LightBoxSideOverlay>,
        );

        // Во время анимации закрытия ловушка фокуса отключена.
        expect(focusTrapMock.mock.calls.at(-1)?.[0].active).toBe(false);
    });
});
