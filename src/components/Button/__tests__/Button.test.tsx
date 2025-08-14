import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "triplex-next";
import { EButtonTheme, EButtonSize } from "../enums";

const getButton = () => screen.getByTestId("button");

describe("Button", () => {
    it("Should render with default props", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} data-testid="button">
                Click me
            </Button>,
        );
        const button = getButton();
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("button");
        expect(button).toHaveClass("general");
        expect(button).toHaveClass("md");
    });

    it("Should apply size classes", () => {
        const { rerender } = render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.SM} data-testid="button">
                Small
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("sm");

        rerender(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.LG} data-testid="button">
                Large
            </Button>,
        );
        expect(button).toHaveClass("lg");
    });

    it("Should apply theme classes", () => {
        const { rerender } = render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} data-testid="button">
                General
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("general");

        rerender(
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} data-testid="button">
                Secondary
            </Button>,
        );
        expect(button).toHaveClass("secondary");

        rerender(
            <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD} data-testid="button">
                Danger
            </Button>,
        );
        expect(button).toHaveClass("danger");

        rerender(
            <Button theme={EButtonTheme.LINK} size={EButtonSize.MD} data-testid="button">
                Link
            </Button>,
        );
        expect(button).toHaveClass("link");
    });

    it("Should merge custom className and passes through attributes", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} className="custom-class" data-testid="button">
                Button text
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("custom-class");
    });

    it("Should apply block and loading classes and sets tabIndex when loading", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} block loading data-testid="button">
                Loading
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("block");
        expect(button).toHaveClass("loading");
        expect(button).toHaveAttribute("tabindex", "-1");
        expect(button.querySelector("span[class*='loadingDots']")).toBeInTheDocument();
    });

    it("Should apply disabled attribute and class", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} disabled data-testid="button">
                Disabled
            </Button>,
        );
        const button = getButton();
        expect(button).toBeDisabled();
        expect(button).toHaveClass("disabled");
    });

    it("Should render icon instead of children and apply icon class", () => {
        render(
            <Button
                theme={EButtonTheme.GENERAL}
                size={EButtonSize.MD}
                icon={<span data-testid="icon" />}
                data-testid="button"
            >
                Button text
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("icon");
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("Should add expanded and active classes when aria-expanded is true", () => {
        render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} aria-expanded data-testid="button">
                Expandable
            </Button>,
        );
        const button = getButton();
        expect(button).toHaveClass("expanded");
        expect(button).toHaveClass("active");
    });

    it("Should render loading dots with correct theme and size", () => {
        render(
            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.LG} loading data-testid="button">
                Loading
            </Button>,
        );
        const button = getButton();
        const loadingDots = button.querySelector("span[class*='loadingDots']");
        expect(loadingDots).toBeInTheDocument();
        expect(loadingDots).toHaveClass("lg");
        expect(loadingDots).toHaveClass("secondary");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} ref={ref} data-testid="button">
                Ref test
            </Button>,
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
});
