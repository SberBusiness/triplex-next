import React from "react";
import { render, screen } from "@testing-library/react";
import { Page } from "../../Page";
import { BodyPage } from "../components/BodyPage";
import { HeaderPage } from "../components/HeaderPage";
import { FooterPage } from "../components/FooterPage";

describe("Page", () => {
    it("renders root element", () => {
        render(<Page data-testid="page-root" />);

        const root = screen.getByTestId("page-root");
        expect(root).toBeInTheDocument();
    });

    it("merges custom className into root element", () => {
        render(<Page className="custom-class" data-testid="page-root" />);

        const root = screen.getByTestId("page-root");
        expect(root).toHaveClass("page", "global-page", "custom-class");
    });

    it("exposes Header, Body and Footer as static sub-components", () => {
        expect(Page.Header).toBe(HeaderPage);
        expect(Page.Body).toBe(BodyPage);
        expect(Page.Footer).toBe(FooterPage);
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
