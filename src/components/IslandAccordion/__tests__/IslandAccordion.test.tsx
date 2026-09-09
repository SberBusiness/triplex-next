import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandAccordion } from "../IslandAccordion";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EIslandType } from "../../Island";

const getIslandAccordion = () => screen.getByRole("list");

describe("IslandAccordion", () => {
    it("Should render with default props", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item" id="first-item" num={1}>
                    First content
                </IslandAccordion.Item>
                <IslandAccordion.Item title="Second item" id="custom-id" num={2}>
                    Second content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        const islandAccordion = getIslandAccordion();

        expect(islandAccordion).toBeInTheDocument();
        expect(islandAccordion).toHaveClass("islandAccordion");
        expect(islandAccordion.firstChild).toHaveClass("md");
    });

    it("Should apply size classes", () => {
        render(
            <IslandAccordion size={EComponentSize.SM}>
                <IslandAccordion.Item title="First item" id="first-item" num={1}>
                    First content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        const islandAccordion = getIslandAccordion();

        expect(islandAccordion.firstChild).toHaveClass("sm");
    });

    it("Should keep base Island classes on item content and footer", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item" id="first-item" num={1} opened>
                    <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                    <IslandAccordion.Item.Footer>Footer</IslandAccordion.Item.Footer>
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(screen.getByText("Content")).toHaveClass("islandBody", "body");
        expect(screen.getByText("Footer")).toHaveClass("islandFooter", "footer");
    });

    it("Should render root ul element", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item" id="first-item">
                    First content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(getIslandAccordion().tagName).toBe("UL");
    });

    it("Should forward ref to root ul element", () => {
        const ref = React.createRef<HTMLUListElement>();

        render(
            <IslandAccordion ref={ref}>
                <IslandAccordion.Item title="First item" id="first-item">
                    First content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it("Should apply custom className to root ul", () => {
        render(<IslandAccordion className="custom-class" />);

        expect(getIslandAccordion()).toHaveClass("custom-class");
    });

    it("Should spread rest props to root ul", () => {
        render(<IslandAccordion aria-label="Accordion" data-test="island-accordion" />);

        const islandAccordion = getIslandAccordion();

        expect(islandAccordion).toHaveAttribute("aria-label", "Accordion");
        expect(islandAccordion).toHaveAttribute("data-test", "island-accordion");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should pass size %s to items through context", (size, expectedClassName) => {
        render(
            <IslandAccordion size={size}>
                <IslandAccordion.Item title="First item" id="first-item">
                    First content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(screen.getByRole("listitem")).toHaveClass(expectedClassName);
    });

    it.each([
        [EIslandType.TYPE_1, "type1"],
        [EIslandType.TYPE_2, "type2"],
        [EIslandType.TYPE_3, "type3"],
    ])("Should pass type %s to items through context", (type, expectedClassName) => {
        render(
            <IslandAccordion type={type}>
                <IslandAccordion.Item title="First item" id="first-item">
                    First content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(screen.getByRole("listitem")).toHaveClass(expectedClassName);
    });

    it("Should have displayName", () => {
        expect(IslandAccordion.displayName).toBe("IslandAccordion");
    });
});

describe("IslandAccordionContent", () => {
    it("Should render children inside Island body", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item" id="first-item">
                    <IslandAccordion.Item.Content>Content</IslandAccordion.Item.Content>
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(screen.getByRole("region", { hidden: true })).toContainElement(screen.getByText("Content"));
    });

    it("Should have displayName", () => {
        expect(IslandAccordion.Item.Content.displayName).toBe("IslandAccordionContent");
    });
});

describe("IslandAccordionFooter", () => {
    it("Should apply custom className to footer", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item" id="first-item">
                    <IslandAccordion.Item.Footer className="custom-class">Footer</IslandAccordion.Item.Footer>
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(screen.getByText("Footer")).toHaveClass("custom-class");
    });

    it("Should spread rest props", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item" id="first-item">
                    <IslandAccordion.Item.Footer data-test="island-accordion-footer">
                        Footer
                    </IslandAccordion.Item.Footer>
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        expect(screen.getByText("Footer")).toHaveAttribute("data-test", "island-accordion-footer");
    });

    it("Should have displayName", () => {
        expect(IslandAccordion.Item.Footer.displayName).toBe("IslandAccordionFooter");
    });
});
