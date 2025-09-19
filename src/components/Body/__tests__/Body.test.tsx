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

        // inner wrapper exists and contains the child
        const child = screen.getByTestId("child");
        expect(child).toBeInTheDocument();
        expect(root).toContainElement(child);
    });

    it("forwards ref to root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Body ref={ref}>content</Body>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.tagName).toBe("DIV");
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
