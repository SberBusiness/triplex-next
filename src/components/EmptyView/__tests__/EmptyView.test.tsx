import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EmptyView } from "../EmptyView";
import { EEmptyViewSize } from "../enums";

describe("EmptyView", () => {
    it("Should render with size SM", () => {
        render(<EmptyView size={EEmptyViewSize.SM} data-testid="empty-view" />);
        const element = screen.getByTestId("empty-view");

        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("emptyView");
        expect(element).toHaveClass("sm");
    });

    it("Should render with size MD", () => {
        render(<EmptyView size={EEmptyViewSize.MD} data-testid="empty-view" />);
        const element = screen.getByTestId("empty-view");

        expect(element).toHaveClass("md");
    });

    it("Should render icon", () => {
        render(<EmptyView size={EEmptyViewSize.SM} icon={<span data-testid="icon">Icon</span>} />);

        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("Should render title", () => {
        render(<EmptyView size={EEmptyViewSize.SM} title="Test title" />);

        expect(screen.getByText("Test title")).toBeInTheDocument();
    });

    it("Should render description", () => {
        render(<EmptyView size={EEmptyViewSize.SM} description="Test description" />);

        expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("Should render caption", () => {
        render(<EmptyView size={EEmptyViewSize.SM} caption="Test caption" />);

        expect(screen.getByText("Test caption")).toBeInTheDocument();
    });

    it("Should render buttons", () => {
        render(<EmptyView size={EEmptyViewSize.SM} buttons={<button data-testid="action-button">Action</button>} />);

        expect(screen.getByTestId("action-button")).toBeInTheDocument();
    });

    it("Should apply hasTitle class when title is provided", () => {
        render(<EmptyView size={EEmptyViewSize.SM} title="Title" data-testid="empty-view" />);
        const element = screen.getByTestId("empty-view");

        expect(element).toHaveClass("hasTitle");
    });

    it("Should not apply hasTitle class when title is not provided", () => {
        render(<EmptyView size={EEmptyViewSize.SM} description="Desc" data-testid="empty-view" />);
        const element = screen.getByTestId("empty-view");

        expect(element).not.toHaveClass("hasTitle");
    });

    it("Should apply custom className", () => {
        render(<EmptyView size={EEmptyViewSize.SM} className="custom-class" data-testid="empty-view" />);
        const element = screen.getByTestId("empty-view");

        expect(element).toHaveClass("emptyView");
        expect(element).toHaveClass("custom-class");
    });

    it("Should pass additional HTML attributes", () => {
        render(<EmptyView size={EEmptyViewSize.SM} data-testid="empty-view" aria-label="Empty state" />);
        const element = screen.getByTestId("empty-view");

        expect(element).toHaveAttribute("aria-label", "Empty state");
    });

    it("Should forward ref", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<EmptyView size={EEmptyViewSize.SM} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("Should have correct displayName", () => {
        expect(EmptyView.displayName).toBe("EmptyView");
    });
});
