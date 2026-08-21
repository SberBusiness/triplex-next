import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedListExtendedItem } from "../UnorderedListExtendedItem";
import { EFontType, EFontWeightText, ELineType, ETextSize } from "../../Typography";

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("UnorderedListExtendedItem", () => {
    it("renders li element with content", () => {
        render(<UnorderedListExtendedItem>Item text</UnorderedListExtendedItem>);

        const item = screen.getByRole("listitem");

        expect(item.tagName).toBe("LI");
        expect(item).toHaveTextContent("Item text");
    });

    it("renders without a marker — marker is opt-in in the extended API", () => {
        render(<UnorderedListExtendedItem>Item text</UnorderedListExtendedItem>);

        // В отличие от UnorderedList, обёртка маркера сама не добавляется.
        expect(screen.getByRole("listitem").children).toHaveLength(0);
    });

    it("applies the default B3 size", () => {
        render(<UnorderedListExtendedItem>Item text</UnorderedListExtendedItem>);

        expect(screen.getByRole("listitem")).toHaveClass("b3");
    });

    it.each([
        [ETextSize.B1, "b1"],
        [ETextSize.B2, "b2"],
        [ETextSize.B3, "b3"],
        [ETextSize.B4, "b4"],
    ])("applies size %s as class %s", (size, className) => {
        render(<UnorderedListExtendedItem size={size}>Item text</UnorderedListExtendedItem>);

        expect(screen.getByRole("listitem")).toHaveClass(className);
    });

    it("applies typography props", () => {
        render(
            <UnorderedListExtendedItem
                type={EFontType.SECONDARY}
                weight={EFontWeightText.SEMIBOLD}
                line={ELineType.COMPACT}
            >
                Item text
            </UnorderedListExtendedItem>,
        );

        const item = screen.getByRole("listitem");

        expect(item).toHaveClass("secondary");
        expect(item).toHaveClass("semibold");
        expect(item).toHaveClass("compact");
    });

    it("merges custom className into the li element", () => {
        render(<UnorderedListExtendedItem className="custom-item">Item text</UnorderedListExtendedItem>);

        const item = screen.getByRole("listitem");

        // Пользовательский класс добавляется к собственным классам элемента, а не заменяет их.
        expect(item).toHaveClass("custom-item");
        expect(item).toHaveClass("b3");
    });

    it("passes through HTML and data attributes", () => {
        render(
            <UnorderedListExtendedItem id="item-id" aria-label="Item" data-testid="item">
                Item text
            </UnorderedListExtendedItem>,
        );

        const item = screen.getByTestId("item");

        expect(item).toHaveAttribute("id", "item-id");
        expect(item).toHaveAttribute("aria-label", "Item");
        expect(item).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("forwards ref to li element", () => {
        const ref = React.createRef<HTMLLIElement>();
        render(<UnorderedListExtendedItem ref={ref}>Item text</UnorderedListExtendedItem>);

        expect(ref.current).toBeInstanceOf(HTMLLIElement);
        expect(ref.current).toBe(screen.getByRole("listitem"));
    });

    it("exposes Marker as a static property", () => {
        expect(UnorderedListExtendedItem.Marker).toBeDefined();
    });
});
