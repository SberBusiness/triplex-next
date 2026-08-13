import React from "react";
import { render, screen } from "@testing-library/react";
import { Body } from "../../Body";

describe("Body", () => {
    it("renders root element and inner wrapper", () => {
        render(
            <Body data-testid="body-root">
                <div data-testid="child">content</div>
            </Body>,
        );

        const root = screen.getByTestId("body-root");
        expect(root).toBeInTheDocument();
        expect(root).toHaveClass("body");

        // inner wrapper exists and contains the child
        const child = screen.getByTestId("child");
        expect(child).toBeInTheDocument();
        expect(root).toContainElement(child);
    });

    it("wraps children into inner element, not into the root", () => {
        render(
            <Body data-testid="body-root">
                <div data-testid="child">content</div>
            </Body>,
        );

        const root = screen.getByTestId("body-root");
        const inner = root.firstElementChild;

        expect(root.children).toHaveLength(1);
        expect(inner).toHaveClass("bodyInner");
        expect(inner).toContainElement(screen.getByTestId("child"));
    });

    it("renders without children", () => {
        render(<Body data-testid="body-root" />);

        const root = screen.getByTestId("body-root");

        expect(root.children).toHaveLength(1);
        expect(root.firstElementChild).toBeEmptyDOMElement();
    });

    it("merges custom className into the root element only", () => {
        render(<Body className="custom" data-testid="body-root" />);

        const root = screen.getByTestId("body-root");

        expect(root).toHaveClass("body");
        expect(root).toHaveClass("custom");
        expect(root.firstElementChild).not.toHaveClass("custom");
    });

    it("forwards ref to root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Body ref={ref}>content</Body>);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("body");
        expect(ref.current?.textContent).toContain("content");
    });

    it("passes through arbitrary props and attaches data-tx attribute", () => {
        render(<Body aria-label="body" title="t" data-testid="body-root" />);

        const root = screen.getByTestId("body-root");
        expect(root).toHaveAttribute("aria-label", "body");
        expect(root).toHaveAttribute("title", "t");
        expect(root.getAttribute("data-tx")).toBeDefined();
    });
});
