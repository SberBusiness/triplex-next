import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../Button";
import { EButtonTheme } from "../enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const getButton = () => screen.getByRole("button");
/** Лоадер рендерится всегда и скрывается классом hidden на обёртке — role="status" доступен и вне loading. */
const getLoader = () => screen.getByRole("status");

describe("Button", () => {
    it("renders without errors with required props", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                Click me
            </Button>,
        );
        const button = getButton();
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("button");
        expect(button).toHaveClass("general");
        expect(button).toHaveClass("md");
        expect(button).toHaveTextContent("Click me");
    });

    it("renders native button with type='button' by default and allows overriding via rest", () => {
        const { rerender } = render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                Submit
            </Button>,
        );
        expect(getButton()).toHaveAttribute("type", "button");

        rerender(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} type="submit">
                Submit
            </Button>,
        );
        expect(getButton()).toHaveAttribute("type", "submit");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies correct class for size %s", (size, expectedClass) => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={size}>
                Sized
            </Button>,
        );
        expect(getButton()).toHaveClass(expectedClass);
    });

    it("applies md size class by default when size is not provided", () => {
        render(<Button theme={EButtonTheme.GENERAL}>Default size</Button>);
        expect(getButton()).toHaveClass("md");
    });

    it.each([
        [EButtonTheme.GENERAL, "general"],
        [EButtonTheme.SECONDARY, "secondary"],
        [EButtonTheme.SECONDARY_LIGHT, "secondaryLight"],
        [EButtonTheme.DANGER, "danger"],
        [EButtonTheme.LINK, "link"],
    ])("applies correct class for theme %s", (theme, expectedClass) => {
        render(
            <Button theme={theme} size={EComponentSize.MD}>
                Themed
            </Button>,
        );
        expect(getButton()).toHaveClass(expectedClass);
    });

    it("merges custom className into root element", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} className="custom-class">
                Button text
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("custom-class");
        expect(button).toHaveClass("button");
    });

    it("applies block class in block mode", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} block>
                Block
            </Button>,
        );
        expect(getButton()).toHaveClass("block");
    });

    it("applies loading class and removes button from tab order while loading", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} loading>
                Loading
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("loading");
        expect(button).toHaveAttribute("tabindex", "-1");
        expect(getLoader()).toBeInTheDocument();
    });

    it("does not set tabindex when not loading", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                Idle
            </Button>,
        );
        expect(getButton()).not.toHaveAttribute("tabindex");
    });

    it.each<[Exclude<EButtonTheme, EButtonTheme.LINK>, string]>([
        [EButtonTheme.GENERAL, "neutral"],
        [EButtonTheme.SECONDARY, "brand"],
        [EButtonTheme.SECONDARY_LIGHT, "brand"],
        [EButtonTheme.DANGER, "neutral"],
    ])("renders loader with correct theme class for button theme %s", (theme, expectedLoaderClass) => {
        render(
            <Button theme={theme} size={EComponentSize.LG} loading>
                Loading
            </Button>,
        );
        const loader = getLoader();
        expect(loader).toHaveClass(expectedLoaderClass);
        expect(loader).toHaveClass("lg");
    });

    it("calls onClick with click event", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={onClick}>
                Clickable
            </Button>,
        );
        await user.click(getButton());
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    it("is disabled and does not call onClick when disabled prop is set", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} disabled onClick={onClick}>
                Disabled
            </Button>,
        );
        const button = getButton();
        expect(button).toBeDisabled();
        await user.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it("renders icon alongside children and applies icon class only when icon is provided without children", () => {
        const { rerender } = render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} icon={<span data-testid="icon-only" />} />,
        );
        const button = getButton();
        expect(button).toHaveClass("icon");
        expect(screen.getByTestId("icon-only")).toBeInTheDocument();

        rerender(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} icon={<span data-testid="icon-with-text" />}>
                Button text
            </Button>,
        );
        expect(button).not.toHaveClass("icon");
        expect(screen.getByTestId("icon-with-text")).toBeInTheDocument();
        expect(button).toHaveTextContent("Button text");
    });

    it("adds expanded class and keeps aria-expanded attribute when aria-expanded is true", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} aria-expanded>
                Expandable
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("expanded");
        expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("does not add expanded class when aria-expanded is false", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} aria-expanded={false}>
                Collapsed
            </Button>,
        );
        const button = getButton();
        expect(button).not.toHaveClass("expanded");
        expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("adds expanded class when aria-expanded is string 'true'", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} aria-expanded="true">
                Expandable
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("expanded");
        expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("does not add expanded class when aria-expanded is string 'false'", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} aria-expanded="false">
                Collapsed
            </Button>,
        );
        const button = getButton();
        expect(button).not.toHaveClass("expanded");
        expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("forwards ref to root button element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} ref={ref}>
                Ref test
            </Button>,
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(getButton());
    });
});
