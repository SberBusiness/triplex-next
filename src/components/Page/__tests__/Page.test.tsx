import React from "react";
import { render, screen } from "@testing-library/react";
import { Page } from "../../Page";

describe("Page", () => {
    it("renders root element", () => {
        render(<Page data-testid="page-root" />);

        const root = screen.getByTestId("page-root");
        expect(root).toBeInTheDocument();
    });

    it("forwards ref to root div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Page ref={ref}>content</Page>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.tagName).toBe("DIV");
        expect(ref.current?.textContent).toBe("content");
    });

    it("passes through arbitrary props", () => {
        render(
            <Page aria-label="page" title="title-attr" data-testid="page-root">
                children
            </Page>,
        );

        const root = screen.getByTestId("page-root");
        expect(root).toHaveAttribute("aria-label", "page");
        expect(root).toHaveAttribute("title", "title-attr");
        expect(root).toHaveTextContent("children");
    });
});
