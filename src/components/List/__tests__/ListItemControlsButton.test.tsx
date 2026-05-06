import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListItemControlsButton } from "../components/ListItemControlsButton";

describe("ListItemControlsButton", () => {
    it('renders a button with type="button" by default', () => {
        render(<ListItemControlsButton>Download</ListItemControlsButton>);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "button");
    });

    it("applies withText when only children are provided", () => {
        render(<ListItemControlsButton>Download</ListItemControlsButton>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass("withText");
        expect(button).not.toHaveClass("withIcon");
    });

    it("applies withIcon when only icon is provided", () => {
        render(<ListItemControlsButton icon={<svg data-testid="icon" />} />);
        const button = screen.getByRole("button");
        expect(button).toHaveClass("withIcon");
        expect(button).not.toHaveClass("withText");
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("applies both withIcon and withText when both are provided", () => {
        render(<ListItemControlsButton icon={<svg data-testid="icon" />}>Download</ListItemControlsButton>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass("withIcon");
        expect(button).toHaveClass("withText");
    });

    it("renders the label text inside Text component", () => {
        render(<ListItemControlsButton>Download</ListItemControlsButton>);
        expect(screen.getByText("Download")).toBeInTheDocument();
    });

    it("is disabled when disabled prop is set", () => {
        render(<ListItemControlsButton disabled>Download</ListItemControlsButton>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not call onClick when disabled", () => {
        const onClick = vi.fn();
        render(
            <ListItemControlsButton disabled onClick={onClick}>
                Download
            </ListItemControlsButton>,
        );
        fireEvent.click(screen.getByRole("button"));
        expect(onClick).not.toHaveBeenCalled();
    });

    it("calls onClick on click", () => {
        const onClick = vi.fn();
        render(<ListItemControlsButton onClick={onClick}>Download</ListItemControlsButton>);
        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("forwards ref to the button element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<ListItemControlsButton ref={ref}>Download</ListItemControlsButton>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("merges custom className on the button", () => {
        render(<ListItemControlsButton className="custom">Download</ListItemControlsButton>);
        expect(screen.getByRole("button")).toHaveClass("custom");
    });

    it("propagates aria-expanded to IconWrapper as active state", () => {
        const { container } = render(
            <ListItemControlsButton aria-expanded={true} icon={<svg data-testid="icon" />}>
                Action
            </ListItemControlsButton>,
        );
        const iconWrapper = container.querySelector(".hoverable");
        expect(iconWrapper).toHaveClass("active");
    });

    it("does not mark IconWrapper as active when aria-expanded is false/absent", () => {
        const { container } = render(
            <ListItemControlsButton icon={<svg data-testid="icon" />}>Action</ListItemControlsButton>,
        );
        const iconWrapper = container.querySelector(".hoverable");
        expect(iconWrapper).not.toHaveClass("active");
    });
});
