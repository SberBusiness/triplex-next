import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListActionItem } from "../components/ListActionItem";
import { List } from "../List";
import { userEvent } from "storybook/internal/test";

describe("ListActionItem", () => {
    it("renders children", () => {
        render(
            <List>
                <ListActionItem>Content</ListActionItem>
            </List>,
        );
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders a listitem with the content inside", () => {
        render(
            <List>
                <ListActionItem>Content</ListActionItem>
            </List>,
        );
        expect(screen.getByRole("listitem")).toHaveTextContent("Content");
    });

    it("forwards ref to the content div element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <List>
                <ListActionItem ref={ref}>Content</ListActionItem>
            </List>,
        );
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards own props to the root list item", () => {
        render(
            <List>
                <ListActionItem className="li-class" data-testid="li">
                    Content
                </ListActionItem>
            </List>,
        );
        const listItem = screen.getByTestId("li");
        expect(listItem.tagName).toBe("LI");
        expect(listItem).toHaveClass("li-class");
    });

    it("merges listActionItemProps.className on the content element", () => {
        render(
            <List>
                <ListActionItem listActionItemProps={{ className: "custom" }}>Content</ListActionItem>
            </List>,
        );
        expect(screen.getByRole("button", { name: "Content" })).toHaveClass("custom");
    });

    it("is focusable by Tab and has button role by default", () => {
        render(
            <List>
                <ListActionItem>Content</ListActionItem>
            </List>,
        );
        const action = screen.getByRole("button", { name: "Content" });
        expect(action).toHaveAttribute("tabindex", "0");
    });

    it("respects explicitly passed tabIndex and role via listActionItemProps", () => {
        render(
            <List>
                <ListActionItem listActionItemProps={{ tabIndex: -1, role: "link" }}>Content</ListActionItem>
            </List>,
        );
        const action = screen.getByRole("link", { name: "Content" });
        expect(action).toHaveAttribute("tabindex", "-1");
        expect(action).toHaveAttribute("role", "link");
    });

    it("calls onClick from listActionItemProps when clicked", async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(
            <List>
                <ListActionItem listActionItemProps={{ onClick }}>Content</ListActionItem>
            </List>,
        );
        await user.click(screen.getByRole("button", { name: "Content" }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when Enter or Space is pressed", async () => {
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(
            <List>
                <ListActionItem listActionItemProps={{ onClick }}>Content</ListActionItem>
            </List>,
        );
        const action = screen.getByRole("button", { name: "Content" });
        action.focus();
        await user.keyboard("{Enter}");
        expect(onClick).toHaveBeenCalledTimes(1);
        await user.keyboard("{ }");
        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("calls onKeyDown from listActionItemProps before internal Enter/Space handling", async () => {
        const onKeyDown = vi.fn();
        const onClick = vi.fn();
        const user = userEvent.setup();
        render(
            <List>
                <ListActionItem listActionItemProps={{ onKeyDown, onClick }}>Content</ListActionItem>
            </List>,
        );
        const action = screen.getByRole("button", { name: "Content" });
        action.focus();
        await user.keyboard("{Enter}");
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
