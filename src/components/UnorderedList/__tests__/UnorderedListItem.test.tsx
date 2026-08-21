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
        // Маркер по умолчанию — пустой узел внутри обёртки, его рисует UnorderedListExtended.Item.Marker.
        expect(markerWrapper?.tagName).toBe("SPAN");
        expect(markerWrapper?.children).toHaveLength(1);
        expect(markerWrapper?.firstElementChild).toBeEmptyDOMElement();
    });

    it("renders custom marker instead of default one", () => {
        render(<UnorderedListItem marker={<span data-testid="custom-marker">✓</span>}>Item text</UnorderedListItem>);

        const markerWrapper = screen.getByRole("listitem").firstElementChild;

        // Переданный маркер занимает место маркера по умолчанию, а не добавляется к нему.
        expect(markerWrapper?.children).toHaveLength(1);
        expect(markerWrapper?.firstElementChild).toBe(screen.getByTestId("custom-marker"));
    });

    it("renders without content", () => {
        render(<UnorderedListItem />);

        const item = screen.getByRole("listitem");

        expect(item.children).toHaveLength(1);
        expect(item.firstElementChild?.tagName).toBe("SPAN");
    });

    it("merges custom className into the li element", () => {
        render(<UnorderedListItem className="custom-item">Item text</UnorderedListItem>);

        const item = screen.getByRole("listitem");

        // Пользовательский класс добавляется к собственным классам элемента, а не заменяет их.
        expect(item).toHaveClass("custom-item");
        expect(item).toHaveClass("b3");
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
        expect(ref.current).toBe(screen.getByRole("listitem"));
    });
});
