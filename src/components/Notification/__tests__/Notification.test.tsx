import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Notification } from "../Notification";
import { SuccessStrokeStsIcon20 } from "@sberbusiness/icons-next";

describe("Notification", () => {
    it("should render with children", () => {
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("should render with role alertdialog", () => {
        const { container } = render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification).toHaveAttribute("role", "alertdialog");
    });

    it("should apply withExtraBottomPadding class when prop is true", () => {
        const { container } = render(
            <Notification withExtraBottomPadding>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification.className).toContain("extraBottomPadding");
    });

    it("should not apply withExtraBottomPadding class when prop is false", () => {
        const { container } = render(
            <Notification withExtraBottomPadding={false}>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification.className).not.toContain("extraBottomPadding");
    });

    it("should apply isShowCloseOnHover class when prop is true", () => {
        const { container } = render(
            <Notification isShowCloseOnHover>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification.className).toContain("showCloseOnHover");
    });

    it("should not apply isShowCloseOnHover class when prop is false", () => {
        const { container } = render(
            <Notification isShowCloseOnHover={false}>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification.className).not.toContain("showCloseOnHover");
    });

    it("should call onClick handler when clicked", () => {
        const handleClick = vi.fn();
        const { container } = render(
            <Notification onClick={handleClick}>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        fireEvent.click(notification);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should render Notification.Icon with children", () => {
        const { container } = render(
            <Notification>
                <Notification.Icon>
                    <SuccessStrokeStsIcon20 paletteIndex={0} />
                </Notification.Icon>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const iconContainer = container.querySelector(".notificationIcon");
        expect(iconContainer).toBeInTheDocument();
        expect(iconContainer?.querySelector("svg")).toBeInTheDocument();
    });

    it("should render Notification.Body with Content", () => {
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("should render Notification.Body with Header", () => {
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Header>Test Header</Notification.Body.Header>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        expect(screen.getByText("Test Header")).toBeInTheDocument();
    });

    it("should render Notification.Body with List", () => {
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                    <Notification.Body.List values={["Item 1", "Item 2", "Item 3"]} />
                </Notification.Body>
            </Notification>,
        );

        expect(screen.getByText("Item 1")).toBeInTheDocument();
        expect(screen.getByText("Item 2")).toBeInTheDocument();
        expect(screen.getByText("Item 3")).toBeInTheDocument();
    });

    it("should render Notification.Body with Footer", () => {
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                    <Notification.Body.Footer>Footer content</Notification.Body.Footer>
                </Notification.Body>
            </Notification>,
        );

        expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("should render Notification.Close and call onClick", () => {
        const handleClose = vi.fn();
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                </Notification.Body>
                <Notification.Close onClick={handleClose} />
            </Notification>,
        );

        const closeButton = screen.getByRole("button");
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);
        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("should render Notification.Time with time prop", () => {
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                </Notification.Body>
                <Notification.Time time="22:45" />
            </Notification>,
        );

        expect(screen.getByText("22:45")).toBeInTheDocument();
    });

    it("should render Notification.Time with numeric time", () => {
        render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test content</Notification.Body.Content>
                </Notification.Body>
                <Notification.Time time={12345} />
            </Notification>,
        );

        expect(screen.getByText("12345")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        const { container } = render(
            <Notification className="custom-class">
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification.className).toContain("custom-class");
    });

    it("should pass through HTML attributes", () => {
        const { container } = render(
            <Notification data-testid="notification" aria-label="Test notification">
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification).toHaveAttribute("data-testid", "notification");
        expect(notification).toHaveAttribute("aria-label", "Test notification");
    });

    it("should render with all subcomponents", () => {
        const handleClose = vi.fn();
        render(
            <Notification withExtraBottomPadding isShowCloseOnHover onClick={vi.fn()}>
                <Notification.Icon>
                    <SuccessStrokeStsIcon20 paletteIndex={0} />
                </Notification.Icon>
                <Notification.Body>
                    <Notification.Body.Header>Header Text</Notification.Body.Header>
                    <Notification.Body.Content>Content Text</Notification.Body.Content>
                    <Notification.Body.List values={["List Item 1"]} />
                    <Notification.Body.Footer>Footer Text</Notification.Body.Footer>
                </Notification.Body>
                <Notification.Close onClick={handleClose} />
                <Notification.Time time="12:00" />
            </Notification>,
        );

        expect(screen.getByText("Header Text")).toBeInTheDocument();
        expect(screen.getByText("Content Text")).toBeInTheDocument();
        expect(screen.getByText("List Item 1")).toBeInTheDocument();
        expect(screen.getByText("Footer Text")).toBeInTheDocument();
        expect(screen.getByText("12:00")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render with multiple children in array", () => {
        render(
            <Notification>
                {[
                    <Notification.Body key="body">
                        <Notification.Body.Content>Content 1</Notification.Body.Content>
                    </Notification.Body>,
                    <Notification.Body key="body2">
                        <Notification.Body.Content>Content 2</Notification.Body.Content>
                    </Notification.Body>,
                ]}
            </Notification>,
        );

        expect(screen.getByText("Content 1")).toBeInTheDocument();
        expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("should have data-tx attribute with version", () => {
        const { container } = render(
            <Notification>
                <Notification.Body>
                    <Notification.Body.Content>Test</Notification.Body.Content>
                </Notification.Body>
            </Notification>,
        );

        const notification = container.firstElementChild as HTMLElement;
        expect(notification).toHaveAttribute("data-tx");
    });
});
