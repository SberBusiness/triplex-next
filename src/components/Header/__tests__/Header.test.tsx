import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../../Header";

describe("Header", () => {
    it("renders root element", () => {
        render(<Header data-testid="header-root" />);

        const root = screen.getByTestId("header-root");
        expect(root).toBeInTheDocument();
    });

    it("forwards ref to root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Header ref={ref}>content</Header>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.tagName).toBe("DIV");
        expect(ref.current?.textContent).toBe("content");
    });

    it("passes through arbitrary props", () => {
        render(
            <Header aria-label="header" title="title-attr" data-testid="header-root">
                children
            </Header>,
        );

        const root = screen.getByTestId("header-root");
        expect(root).toHaveAttribute("aria-label", "header");
        expect(root).toHaveAttribute("title", "title-attr");
        expect(root).toHaveTextContent("children");
    });
});
