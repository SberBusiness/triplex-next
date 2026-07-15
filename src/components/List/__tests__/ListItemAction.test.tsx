import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListItemAction } from "../components/ListItemAction";
import { ListItem } from "../components/ListItem";
import { ListItemContent } from "../components/ListItemContent";
import { userEvent } from "storybook/internal/test";

describe("ListItemAction", () => {
    it("renders children", () => {
        render(<ListItemAction>Content</ListItemAction>);
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("forwards ref to the div element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ListItemAction ref={ref}>Content</ListItemAction>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("merges custom className", () => {
        render(
            <ListItemAction className="custom" data-testid="action">
                Content
            </ListItemAction>,
        );
        expect(screen.getByTestId("action")).toHaveClass("custom");
    });

    it("is focusable by Tab and has button role by default", () => {
        render(<ListItemAction data-testid="action">Content</ListItemAction>);
        const action = screen.getByTestId("action");
        expect(action).toHaveAttribute("tabindex", "0");
        expect(action).toHaveAttribute("role", "button");
    });

    it("respects explicitly passed tabIndex and role", () => {
        render(
            <ListItemAction tabIndex={-1} role="link" data-testid="action">
                Content
            </ListItemAction>,
        );
        const action = screen.getByTestId("action");
        expect(action).toHaveAttribute("tabindex", "-1");
        expect(action).toHaveAttribute("role", "link");
    });

    it("calls onClick when clicked", async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(<ListItemAction onClick={onClick}>Content</ListItemAction>);
        await user.click(screen.getByRole("button", { name: "Content" }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when Enter or Space is pressed", async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(<ListItemAction onClick={onClick}>Content</ListItemAction>);
        const action = screen.getByRole("button", { name: "Content" });
        action.focus();
        await user.keyboard("{Enter}");
        expect(onClick).toHaveBeenCalledTimes(1);
        await user.keyboard("{ }");
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("propagates action state to ListItemContent through context", () => {
        render(
            <ListItem>
                <ListItemAction>
                    <ListItemContent data-testid="content">Content</ListItemContent>
                </ListItemAction>
            </ListItem>,
        );
        expect(screen.getByTestId("content")).toHaveClass("action");
    });

    it("does not set action class on ListItemContent without ListItemAction", () => {
        render(
            <ListItem>
                <ListItemContent data-testid="content">Content</ListItemContent>
            </ListItem>,
        );
        expect(screen.getByTestId("content")).not.toHaveClass("action");
    });
});
