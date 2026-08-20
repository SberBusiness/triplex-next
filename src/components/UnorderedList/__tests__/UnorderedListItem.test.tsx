import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedListItem } from "../UnorderedListItem";
import { EFontType, ETextSize } from "../../Typography";

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("UnorderedListItem", () => {
    it("renders li element with default marker before content", () => {
        render(<UnorderedListItem>Item text</UnorderedListItem>);

        const item = screen.getByRole("listitem");
        const markerWrapper = item.firstElementChild;

        expect(item.tagName).toBe("LI");
        expect(item).toHaveTextContent("Item text");
        expect(markerWrapper).toHaveClass("markerWrapper");
        expect(markerWrapper?.firstElementChild).toHaveClass("marker");
    });

    it("renders custom marker instead of default one", () => {
        render(<UnorderedListItem marker={<span data-testid="custom-marker">✓</span>}>Item text</UnorderedListItem>);

        const markerWrapper = screen.getByRole("listitem").firstElementChild;

        expect(markerWrapper).toContainElement(screen.getByTestId("custom-marker"));
        expect(markerWrapper?.querySelector(".marker")).toBeNull();
    });

    it("renders without content", () => {
        render(<UnorderedListItem />);

        const item = screen.getByRole("listitem");

        expect(item.children).toHaveLength(1);
        expect(item.firstElementChild).toHaveClass("markerWrapper");
    });

    it("merges custom className into the li element", () => {
        render(<UnorderedListItem className="custom-item">Item text</UnorderedListItem>);

        const item = screen.getByRole("listitem");

        expect(item).toHaveClass("unorderedListExtendedItem");
        expect(item).toHaveClass("custom-item");
    });

    it("applies the default B3 size", () => {
        render(<UnorderedListItem>Item text</UnorderedListItem>);

        expect(screen.getByRole("listitem")).toHaveClass("b3");
    });

    it("applies typography props", () => {
        render(
            <UnorderedListItem size={ETextSize.B1} type={EFontType.SECONDARY}>
                Item text
            </UnorderedListItem>,
        );

        const item = screen.getByRole("listitem");

        expect(item).toHaveClass("b1");
        expect(item).toHaveClass("secondary");
    });

    it("passes through HTML and data attributes", () => {
        render(
            <UnorderedListItem id="item-id" aria-label="Item" data-testid="item">
                Item text
            </UnorderedListItem>,
        );

        const item = screen.getByTestId("item");

        expect(item).toHaveAttribute("id", "item-id");
        expect(item).toHaveAttribute("aria-label", "Item");
        expect(item).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("forwards ref to li element", () => {
        const ref = React.createRef<HTMLLIElement>();
        render(<UnorderedListItem ref={ref}>Item text</UnorderedListItem>);

        expect(ref.current).toBeInstanceOf(HTMLLIElement);
        expect(ref.current).toHaveClass("unorderedListExtendedItem");
    });
});
