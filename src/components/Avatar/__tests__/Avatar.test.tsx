import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // или jest
import { Avatar } from "../Avatar";
import { EAvatarSize, TAvatarBorderRadius } from "../enums";

describe("Avatar component", () => {
    it("should render with default props", () => {
        render(<Avatar size={EAvatarSize.MD} data-testid="avatar" />);

        const avatar = screen.getByTestId("avatar");
        expect(avatar).toBeInTheDocument();
    });

    it("should apply correct size classes", () => {
        const sizes = [
            { size: EAvatarSize.XXS, expectedClass: "xxs" },
            { size: EAvatarSize.XS, expectedClass: "xs" },
            { size: EAvatarSize.SM, expectedClass: "sm" },
            { size: EAvatarSize.MD, expectedClass: "md" },
            { size: EAvatarSize.LG, expectedClass: "lg" },
            { size: EAvatarSize.XL, expectedClass: "xl" },
            { size: EAvatarSize.XXL, expectedClass: "xxl" },
        ];

        sizes.forEach(({ size, expectedClass }) => {
            const { unmount } = render(<Avatar size={size} data-testid={`avatar-${size}`} />);

            const avatar = screen.getByTestId(`avatar-${size}`);
            expect(avatar).toHaveClass(expectedClass);
            unmount();
        });
    });

    it("should apply correct border radius classes", () => {
        const borderRadiuses = [
            { borderRadius: 10, expectedClass: "borderRadius10" },
            { borderRadius: 12, expectedClass: "borderRadius12" },
            { borderRadius: 14, expectedClass: "borderRadius14" },
        ];

        borderRadiuses.forEach(({ borderRadius, expectedClass }) => {
            const { unmount } = render(
                <Avatar
                    size={EAvatarSize.MD}
                    borderRadius={borderRadius as TAvatarBorderRadius}
                    data-testid={`avatar-${borderRadius}`}
                />,
            );

            const avatar = screen.getByTestId(`avatar-${borderRadius}`);
            expect(avatar).toHaveClass(expectedClass);
            unmount();
        });
    });

    it("should merge custom className", () => {
        const customClass = "custom-class";

        render(<Avatar size={EAvatarSize.MD} className={customClass} data-testid="avatar" />);

        const avatar = screen.getByTestId("avatar");
        expect(avatar).toHaveClass("avatar");
        expect(avatar).toHaveClass("md");
        expect(avatar).toHaveClass(customClass);
    });

    it("should forward ref to div element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<Avatar size={EAvatarSize.MD} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("avatar");
    });

    it("should pass additional props to div element", () => {
        const ariaLabel = "User avatar";

        render(<Avatar size={EAvatarSize.MD} aria-label={ariaLabel} title="Avatar title" data-testid="avatar" />);

        const avatar = screen.getByTestId("avatar");

        expect(avatar).toHaveAttribute("aria-label", ariaLabel);
        expect(avatar).toHaveAttribute("title", "Avatar title");
    });
});
