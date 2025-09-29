import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CardStatic } from "@sberbusiness/triplex-next/components/Card";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";

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

    it("applies rounding class mapping and accepts theme prop (no class assertion)", () => {
        const { rerender } = render(
            <CardStatic theme={ECardTheme.GENERAL} roundingSize={ECardRoundingSize.MD}>
                card
            </CardStatic>,
        );
        const root = screen.getByText("card");
        const classBefore = root.className;

        rerender(
            <CardStatic theme={ECardTheme.SECONDARY} roundingSize={ECardRoundingSize.SM}>
                card
            </CardStatic>,
        );
        const classAfter = root.className;
        expect(classAfter).not.toEqual(classBefore);
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
