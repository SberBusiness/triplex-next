import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tooltip } from "../Tooltip";
import { ETooltipAlign, ETooltipSize } from "../enums";

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

interface IRenderOptions {
    isOpen?: boolean;
    toggle?: (open: boolean) => void;
    onShow?: (node: HTMLDivElement) => void;
    withHeader?: boolean;
    withClose?: boolean;
    withLink?: boolean;
}

const renderMobileTooltip = ({
    isOpen = true,
    toggle,
    onShow,
    withHeader = false,
    withClose = false,
    withLink = false,
}: IRenderOptions = {}) => {
    const targetRef: React.MutableRefObject<HTMLElement | null> = { current: null };

    return render(
        <Tooltip
            size={ETooltipSize.SM}
            toggleType="click"
            isOpen={isOpen}
            toggle={toggle}
            onShow={onShow}
            targetRef={targetRef}
        >
            <Tooltip.Target>
                <button
                    type="button"
                    ref={(el) => {
                        targetRef.current = el;
                    }}
                    aria-label="Tooltip target"
                />
            </Tooltip.Target>
            <Tooltip.Body>Текст подсказки</Tooltip.Body>
            {withLink ? <Tooltip.Link href="https://example.com">Подробнее</Tooltip.Link> : null}
            {withClose ? <Tooltip.XButton aria-label="Закрыть подсказку" /> : null}
            {withHeader ? <Tooltip.MobileHeader>Заголовок подсказки</Tooltip.MobileHeader> : null}
        </Tooltip>,
    );
};

describe("Tooltip (mobile)", () => {
    beforeEach(() => {
        mockMobileScreen();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should render the target and the body in the mobile overlay", () => {
        renderMobileTooltip();

        expect(screen.getByRole("button", { name: "Tooltip target" })).toBeInTheDocument();
        expect(screen.getByText("Текст подсказки")).toBeInTheDocument();
    });

    it("should render the mobile header with the close button", () => {
        renderMobileTooltip({ withHeader: true, withClose: true });

        expect(screen.getByText("Заголовок подсказки")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Закрыть подсказку" })).toBeInTheDocument();
    });

    it("should render the link inside the mobile overlay", () => {
        renderMobileTooltip({ withLink: true });

        expect(screen.getByRole("link", { name: "Подробнее" })).toHaveAttribute("href", "https://example.com");
    });

    it("should request close on the close button click", () => {
        const toggle = vi.fn();
        renderMobileTooltip({ withClose: true, toggle });

        fireEvent.click(screen.getByRole("button", { name: "Закрыть подсказку" }));

        expect(toggle).toHaveBeenCalledWith(false);
    });

    it("should call onShow with the overlay node when opened", () => {
        const onShow = vi.fn();
        renderMobileTooltip({ onShow });

        expect(onShow).toHaveBeenCalledTimes(1);
        expect(onShow.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
    });

    it("should not call onShow while closed", () => {
        const onShow = vi.fn();
        renderMobileTooltip({ isOpen: false, onShow });

        expect(onShow).not.toHaveBeenCalled();
    });

    it("should not leak desktop-only props to the overlay DOM node", () => {
        const targetRef: React.MutableRefObject<HTMLElement | null> = { current: null };
        let overlay: HTMLDivElement | null = null;

        render(
            <Tooltip
                size={ETooltipSize.LG}
                alignTip={ETooltipAlign.START}
                toggleType="click"
                isOpen
                targetRef={targetRef}
                onShow={(node) => {
                    overlay = node;
                }}
            >
                <Tooltip.Target>
                    <button
                        type="button"
                        ref={(el) => {
                            targetRef.current = el;
                        }}
                        aria-label="Tooltip target"
                    />
                </Tooltip.Target>
                <Tooltip.Body>Текст подсказки</Tooltip.Body>
            </Tooltip>,
        );

        expect(overlay).not.toBeNull();
        expect(overlay!.hasAttribute("alignTip")).toBe(false);
        expect(overlay!.hasAttribute("size")).toBe(false);
    });
});
