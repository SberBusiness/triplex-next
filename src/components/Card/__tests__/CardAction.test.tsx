import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CardAction } from "@sberbusiness/triplex-next/components/Card";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";

const getCard = () => screen.getByRole("button");

describe("CardAction", () => {
    it("renders with role button and children", () => {
        render(
            <CardAction theme={ECardTheme.GENERAL}>
                <div data-testid="child">content</div>
            </CardAction>,
        );

        const card = getCard();
        expect(card).toBeInTheDocument();
        expect(screen.getByTestId("child")).toBeInTheDocument();
        expect(card).toHaveAttribute("tabindex", "0");
    });

    it("applies theme and rounding class mappings via props", () => {
        const { rerender } = render(
            <CardAction theme={ECardTheme.GENERAL} roundingSize={ECardRoundingSize.MD}>
                card
            </CardAction>,
        );
        const root = getCard();
        expect(root.className).toMatch(/card/);

        rerender(
            <CardAction theme={ECardTheme.SECONDARY} roundingSize={ECardRoundingSize.SM}>
                card
            </CardAction>,
        );
        expect(root.className).toContain("roundingSM");
    });

    it("uncontrolled: toggles on click and space/enter, calls onToggle", () => {
        const onToggle = vi.fn();
        render(
            <CardAction theme={ECardTheme.GENERAL} onToggle={onToggle}>
                card
            </CardAction>,
        );

        const card = getCard();
        fireEvent.click(card);
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenLastCalledWith(true);

        fireEvent.keyDown(card, { key: " ", keyCode: 32 });
        expect(onToggle).toHaveBeenCalledTimes(2);
        expect(onToggle).toHaveBeenLastCalledWith(false);

        fireEvent.keyDown(card, { key: "Enter", keyCode: 13 });
        expect(onToggle).toHaveBeenCalledTimes(3);
        expect(onToggle).toHaveBeenLastCalledWith(true);
    });

    it("controlled: uses selected prop and calls toggle with next value", () => {
        const toggle = vi.fn();
        render(
            <CardAction theme={ECardTheme.GENERAL} selected={false} toggle={toggle}>
                card
            </CardAction>,
        );

        const card = getCard();
        fireEvent.click(card);
        expect(toggle).toHaveBeenCalledTimes(1);
        expect(toggle).toHaveBeenLastCalledWith(true);

        fireEvent.keyDown(card, { key: " ", keyCode: 32 });
        expect(toggle).toHaveBeenCalledTimes(2);
        expect(toggle).toHaveBeenLastCalledWith(true);

        fireEvent.keyDown(card, { key: "Enter", keyCode: 13 });
        expect(toggle).toHaveBeenCalledTimes(3);
        expect(toggle).toHaveBeenLastCalledWith(true);
    });

    it("controlled: triggers onToggle when selected prop changes", () => {
        const onToggle = vi.fn();
        const { rerender } = render(
            <CardAction theme={ECardTheme.GENERAL} selected={false} onToggle={onToggle}>
                card
            </CardAction>,
        );

        rerender(
            <CardAction theme={ECardTheme.GENERAL} selected={true} onToggle={onToggle}>
                card
            </CardAction>,
        );
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("forwards mouse/keyboard/focus/blur handlers", () => {
        const onClick = vi.fn();
        const onMouseDown = vi.fn();
        const onKeyDown = vi.fn();
        const onFocus = vi.fn();
        const onBlur = vi.fn();
        render(
            <CardAction
                theme={ECardTheme.GENERAL}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                card
            </CardAction>,
        );
        const card = getCard();
        fireEvent.mouseDown(card);
        fireEvent.focus(card);
        fireEvent.keyDown(card, { key: "x", keyCode: 88 });
        fireEvent.click(card);
        fireEvent.blur(card);
        expect(onMouseDown).toHaveBeenCalledTimes(1);
        expect(onFocus).toHaveBeenCalledTimes(1);
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onBlur).toHaveBeenCalledTimes(1);
    });
});
