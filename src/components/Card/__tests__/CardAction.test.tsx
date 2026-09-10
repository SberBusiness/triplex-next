import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CardAction } from "@sberbusiness/triplex-next/components/Card";
import {
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
} from "@sberbusiness/triplex-next/components/Card/enums";
import {
    mapCardRoundingSizeToCssClass,
    mapCardThemeToCssClass,
} from "@sberbusiness/triplex-next/components/Card/utils";

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

    it("applies theme class mapping", () => {
        const { rerender } = render(<CardAction theme={ECardTheme.GENERAL}>card</CardAction>);
        const root = getCard();
        expect(root.className).toContain(mapCardThemeToCssClass[ECardTheme.GENERAL]);

        rerender(<CardAction theme={ECardTheme.SECONDARY}>card</CardAction>);
        expect(root.className).toContain(mapCardThemeToCssClass[ECardTheme.SECONDARY]);
    });

    it.each(Object.values(ECardRoundingSize))("applies rounding class for %s", (roundingSize) => {
        render(<CardAction roundingSize={roundingSize}>card</CardAction>);

        expect(getCard().className).toContain(mapCardRoundingSizeToCssClass[roundingSize]);
    });

    it("applies rounding MD by default", () => {
        render(<CardAction>card</CardAction>);

        expect(getCard().className).toContain(mapCardRoundingSizeToCssClass[ECardRoundingSize.MD]);
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

    it("merges className and spreads rest attributes to the root element", () => {
        render(
            <CardAction className="customClassName" aria-label="Card label" data-test="card">
                card
            </CardAction>,
        );

        const card = getCard();
        expect(card).toHaveClass("card", "action", "customClassName");
        expect(card).toHaveAttribute("aria-label", "Card label");
        expect(card).toHaveAttribute("data-test", "card");
    });

    it("allows overriding role and tabIndex through rest attributes", () => {
        render(
            <CardAction role="checkbox" tabIndex={-1}>
                card
            </CardAction>,
        );

        const card = screen.getByRole("checkbox");
        expect(card).toHaveAttribute("tabindex", "-1");
    });

    it("renders compound subcomponents", () => {
        render(
            <CardAction>
                <CardAction.Media data-testid="media" />
                <CardAction.Content paddingSize={ECardContentPaddingSize.SM} data-testid="content">
                    <CardAction.Content.Header>header</CardAction.Content.Header>
                    <CardAction.Content.Body>body</CardAction.Content.Body>
                    <CardAction.Content.Footer>footer</CardAction.Content.Footer>
                </CardAction.Content>
            </CardAction>,
        );

        expect(screen.getByTestId("media")).toHaveClass("cardMedia");
        expect(screen.getByTestId("content")).toHaveClass("cardContent", "paddingSM");
        expect(screen.getByText("header")).toHaveClass("cardContentHeader");
        expect(screen.getByText("body")).toHaveClass("cardContentBody");
        expect(screen.getByText("footer")).toHaveClass("cardContentFooter");
    });

    it("applies the default padding size and merges className on compound subcomponents", () => {
        render(
            <CardAction>
                <CardAction.Media className="customMediaClassName" data-testid="media" />
                <CardAction.Content className="customContentClassName" data-testid="content">
                    content
                </CardAction.Content>
            </CardAction>,
        );

        expect(screen.getByTestId("media")).toHaveClass("cardMedia", "customMediaClassName");
        expect(screen.getByTestId("content")).toHaveClass("cardContent", "paddingMD", "customContentClassName");
    });

    it("uncontrolled: toggles selected class and does not call toggle", () => {
        const toggle = vi.fn();
        render(<CardAction toggle={toggle}>card</CardAction>);

        const card = getCard();
        expect(card).not.toHaveClass("selected");

        fireEvent.click(card);
        expect(card).toHaveClass("selected");

        fireEvent.click(card);
        expect(card).not.toHaveClass("selected");
        expect(toggle).not.toHaveBeenCalled();
    });

    it("treats an explicit selected={undefined} as uncontrolled", () => {
        const toggle = vi.fn();
        const onToggle = vi.fn();
        render(
            <CardAction selected={undefined} toggle={toggle} onToggle={onToggle}>
                card
            </CardAction>,
        );

        const card = getCard();
        fireEvent.click(card);

        expect(card).toHaveClass("selected");
        expect(toggle).not.toHaveBeenCalled();
        expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("controlled: selected class follows the selected prop and does not change on click", () => {
        const onToggle = vi.fn();
        const toggle = vi.fn();
        const { rerender } = render(
            <CardAction selected={false} toggle={toggle} onToggle={onToggle}>
                card
            </CardAction>,
        );

        const card = getCard();
        expect(card).not.toHaveClass("selected");

        fireEvent.click(card);
        expect(card).not.toHaveClass("selected");
        expect(toggle).toHaveBeenLastCalledWith(true);
        expect(onToggle).not.toHaveBeenCalled();

        rerender(
            <CardAction selected={true} toggle={toggle} onToggle={onToggle}>
                card
            </CardAction>,
        );
        expect(card).toHaveClass("selected");

        // toggle получает значение, обратное текущему selected, а не всегда true.
        fireEvent.click(card);
        expect(toggle).toHaveBeenLastCalledWith(false);
    });

    it("marks focus as keyboard when it is not preceded by mouse down", () => {
        render(<CardAction>card</CardAction>);

        const card = getCard();
        fireEvent.focus(card);
        expect(card).toHaveClass("focusVisible");

        fireEvent.blur(card);
        expect(card).not.toHaveClass("focusVisible");
    });

    it("does not mark focus as keyboard when it follows mouse down", () => {
        render(<CardAction>card</CardAction>);

        const card = getCard();
        fireEvent.mouseDown(card);
        fireEvent.focus(card);

        expect(card).not.toHaveClass("focusVisible");
    });

    it("prevents default on Space and keeps it on Enter", () => {
        render(<CardAction>card</CardAction>);

        const card = getCard();
        expect(fireEvent.keyDown(card, { key: " ", keyCode: 32 })).toBe(false);
        expect(fireEvent.keyDown(card, { key: "Enter", keyCode: 13 })).toBe(true);
    });

    it("does not toggle on keys other than Space and Enter", () => {
        const onToggle = vi.fn();
        render(<CardAction onToggle={onToggle}>card</CardAction>);

        const card = getCard();
        fireEvent.keyDown(card, { key: "a", keyCode: 65 });

        expect(onToggle).not.toHaveBeenCalled();
        expect(card).not.toHaveClass("selected");
    });

    it("exposes displayName and compound components", () => {
        expect(CardAction.displayName).toBe("CardAction");
        expect(CardAction.Content.displayName).toBe("CardContent");
        expect(CardAction.Media.displayName).toBe("CardMedia");
    });

    // Инвариант публичного API: ref даёт экземпляр класса, а не DOM-элемент.
    // Перевод на функциональный компонент с forwardRef сменил бы ref-target — это breaking change.
    it("exposes the class instance through ref", () => {
        const ref = React.createRef<CardAction>();
        render(<CardAction ref={ref}>card</CardAction>);

        expect(ref.current).toBeInstanceOf(CardAction);
    });
});
