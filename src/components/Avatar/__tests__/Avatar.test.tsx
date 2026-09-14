import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "../Avatar";
import { EAvatarSize, TAvatarBorderRadius } from "../enums";

const BORDER_RADIUSES: TAvatarBorderRadius[] = [6, 8, 10, 12, 16];

describe("Avatar component", () => {
    it("should render with default props", () => {
        render(<Avatar size={EAvatarSize.MD} borderRadius={12} data-testid="avatar" />);

        const avatar = screen.getByTestId("avatar");
        expect(avatar).toBeInTheDocument();
    });

    it.each(Object.values(EAvatarSize))("should apply correct size class for %s", (size) => {
        render(<Avatar size={size} borderRadius={12} data-testid="avatar" />);

        expect(screen.getByTestId("avatar")).toHaveClass(size);
    });

    it.each(BORDER_RADIUSES)("should apply correct border radius class for %s", (borderRadius) => {
        render(<Avatar size={EAvatarSize.MD} borderRadius={borderRadius} data-testid="avatar" />);

        expect(screen.getByTestId("avatar")).toHaveClass(`borderRadius${borderRadius}`);
    });

    it("should merge custom className", () => {
        const customClass = "custom-class";

        render(<Avatar size={EAvatarSize.MD} borderRadius={12} className={customClass} data-testid="avatar" />);

        const avatar = screen.getByTestId("avatar");
        expect(avatar).toHaveClass("avatar");
        expect(avatar).toHaveClass("md");
        expect(avatar).toHaveClass(customClass);
    });

    it("should render children", () => {
        render(
            <Avatar size={EAvatarSize.MD} borderRadius={12} data-testid="avatar">
                <span data-testid="content">AA</span>
            </Avatar>,
        );

        expect(screen.getByTestId("avatar")).toContainElement(screen.getByTestId("content"));
    });

    it("should forward ref to div element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<Avatar size={EAvatarSize.MD} borderRadius={12} ref={ref} data-testid="avatar" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("avatar"));
    });

    it("should pass additional props to div element", () => {
        const ariaLabel = "User avatar";

        render(
            <Avatar
                size={EAvatarSize.MD}
                borderRadius={12}
                aria-label={ariaLabel}
                title="Avatar title"
                data-testid="avatar"
            />,
        );

        const avatar = screen.getByTestId("avatar");

        expect(avatar).toHaveAttribute("aria-label", ariaLabel);
        expect(avatar).toHaveAttribute("title", "Avatar title");
    });
});
