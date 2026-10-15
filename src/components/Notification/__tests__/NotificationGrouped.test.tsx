import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Notification } from "../Notification";
import { NotificationGrouped } from "../NotificationGrouped";

describe("NotificationGrouped", () => {
    it("renders a nested notification", () => {
        render(
            <NotificationGrouped>
                <Notification>
                    <Notification.Body>
                        <Notification.Body.Content>Grouped content</Notification.Body.Content>
                    </Notification.Body>
                </Notification>
            </NotificationGrouped>,
        );

        expect(screen.getByRole("alertdialog")).toHaveTextContent("Grouped content");
    });

    it.each(["Grouped text", 42])("renders ReactNode content: %s", (children) => {
        render(<NotificationGrouped>{children}</NotificationGrouped>);

        expect(screen.getByText(String(children))).toBeInTheDocument();
    });

    it("renders two decorative layers after children", () => {
        const { container } = render(
            <NotificationGrouped>
                <span>Grouped content</span>
            </NotificationGrouped>,
        );

        const [content, footer] = Array.from((container.firstElementChild as HTMLElement).children);
        const [first, second] = Array.from(footer.children);

        expect(content).toHaveTextContent("Grouped content");
        expect(first).toHaveClass("notificationGroupedFooterItem", "first");
        expect(second).toHaveClass("notificationGroupedFooterItem", "second");
    });

    it("renders decorative layers without children", () => {
        const { container } = render(<NotificationGrouped>{null}</NotificationGrouped>);

        expect(container.querySelectorAll(".notificationGroupedFooterItem")).toHaveLength(2);
    });

    it("forwards ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        const { container } = render(
            <NotificationGrouped ref={ref}>
                <Notification>
                    <Notification.Body>
                        <Notification.Body.Content>Grouped content</Notification.Body.Content>
                    </Notification.Body>
                </Notification>
            </NotificationGrouped>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(container.firstElementChild);
        expect(ref.current).toContainElement(screen.getByRole("alertdialog"));
    });
});
