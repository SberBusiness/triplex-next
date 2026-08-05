import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CardStatic } from "@sberbusiness/triplex-next/components/Card";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";
import {
    mapCardRoundingSizeToCssClass,
    mapCardThemeToCssClass,
} from "@sberbusiness/triplex-next/components/Card/utils";

describe("CardStatic", () => {
    it("renders container and children", () => {
        render(
            <CardStatic theme={ECardTheme.GENERAL}>
                <div data-testid="child">content</div>
            </CardStatic>,
        );

        const child = screen.getByTestId("child");
        expect(child).toBeInTheDocument();
    });

    it("applies theme class mapping", () => {
        const { rerender } = render(<CardStatic theme={ECardTheme.GENERAL}>card</CardStatic>);
        const root = screen.getByText("card");
        expect(root.className).toContain(mapCardThemeToCssClass[ECardTheme.GENERAL]);

        rerender(<CardStatic theme={ECardTheme.SECONDARY}>card</CardStatic>);
        expect(root.className).toContain(mapCardThemeToCssClass[ECardTheme.SECONDARY]);
    });

    it.each(Object.values(ECardRoundingSize))("applies rounding class for %s", (roundingSize) => {
        render(<CardStatic roundingSize={roundingSize}>card</CardStatic>);

        expect(screen.getByText("card").className).toContain(mapCardRoundingSizeToCssClass[roundingSize]);
    });

    it("applies rounding MD by default", () => {
        render(<CardStatic>card</CardStatic>);

        expect(screen.getByText("card").className).toContain(mapCardRoundingSizeToCssClass[ECardRoundingSize.MD]);
    });

    it("merges className and forwards attributes", () => {
        render(
            <CardStatic theme={ECardTheme.GENERAL} className="extra" id="card-id" title="title-attr" data-testid="card">
                card
            </CardStatic>,
        );
        const root = screen.getByTestId("card");
        expect(root).toHaveClass("extra");
        expect(root).toHaveAttribute("id", "card-id");
        expect(root).toHaveAttribute("title", "title-attr");
    });

    it("renders composition: Media and Content", () => {
        render(
            <CardStatic theme={ECardTheme.GENERAL}>
                <CardStatic.Content>
                    <CardStatic.Content.Header>
                        <div data-testid="header">header</div>
                    </CardStatic.Content.Header>
                    <CardStatic.Content.Body>
                        <div data-testid="body">body</div>
                    </CardStatic.Content.Body>
                    <CardStatic.Content.Footer>
                        <div data-testid="footer">footer</div>
                    </CardStatic.Content.Footer>
                </CardStatic.Content>
            </CardStatic>,
        );
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("body")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});
