import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../../Footer";

describe("Footer", () => {
    it("renders root element", () => {
        render(<Footer data-testid="footer-root" />);

        const root = screen.getByTestId("footer-root");
        expect(root).toBeInTheDocument();
    });

    it("forwards ref to root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Footer ref={ref}>content</Footer>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.tagName).toBe("DIV");
        expect(ref.current?.textContent).toBe("content");
    });

    it("passes through arbitrary props", () => {
        render(
            <Footer aria-label="footer" title="title-attr" data-testid="footer-root">
                children
            </Footer>,
        );

        const root = screen.getByTestId("footer-root");
        expect(root).toHaveAttribute("aria-label", "footer");
        expect(root).toHaveAttribute("title", "title-attr");
        expect(root).toHaveTextContent("children");
    });
});
