import React from "react";
import { render, screen } from "@testing-library/react";
import { Text } from "../Text";
import { ETextSize, EFontWeightText, EFontType, ELineType } from "../enums";

describe("Text", () => {
    it("renders with default props", () => {
        render(<Text size={ETextSize.B2}>Test Text</Text>);

        const text = screen.getByText("Test Text");
        expect(text).toBeDefined();
        expect(text.tagName).toBe("SPAN");
    });

    it("renders with custom tag", () => {
        render(<Text size={ETextSize.B2} tag="p">Custom Tag Text</Text>);

        const text = screen.getByText("Custom Tag Text");
        expect(text.tagName).toBe("P");
    });

    it("applies custom className", () => {
        const className = "custom-text-class";
        render(<Text size={ETextSize.B2} className={className}>Test Text</Text>);

        const text = screen.getByText("Test Text");
        expect(text.className).toContain(className);
    });

    it("renders with underline", () => {
        render(<Text size={ETextSize.B2} underline>Underlined Text</Text>);

        const text = screen.getByText("Underlined Text");
        expect(text.className).toContain("underline");
    });

    it("renders with strikethrough", () => {
        render(<Text size={ETextSize.B2} strikethrough>Strikethrough Text</Text>);

        const text = screen.getByText("Strikethrough Text");
        expect(text.className).toContain("strikethrough");
    });

    it("renders with both underline and strikethrough", () => {
        render(
            <Text size={ETextSize.B2} underline strikethrough>
                Underlined and Strikethrough Text
            </Text>
        );

        const text = screen.getByText("Underlined and Strikethrough Text");
        expect(text.className).toContain("underlineStrikethrough");
    });

    it("passes through additional props", () => {
        render(
            <Text
                size={ETextSize.B2}
                data-testid="text-test"
                aria-label="Test text"
            >
                Test Text
            </Text>
        );

        const text = screen.getByTestId("text-test");
        expect(text.getAttribute("aria-label")).toBe("Test text");
    });

    it("renders children correctly", () => {
        render(
            <Text size={ETextSize.B2}>
                <span>Nested</span> <strong>Content</strong>
            </Text>
        );

        expect(screen.getByText("Nested")).toBeDefined();
        expect(screen.getByText("Content")).toBeDefined();
    });

    it("forwards ref correctly for span element", () => {
        const ref = React.createRef<HTMLElement>();
        render(<Text size={ETextSize.B2} ref={ref}>Ref Test Text</Text>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Ref Test Text");
        expect(ref.current?.tagName).toBe("SPAN");
    });

    it("forwards ref correctly for div element", () => {
        const ref = React.createRef<HTMLElement>();
        render(<Text size={ETextSize.B2} tag="div" ref={ref}>Div Ref Test Text</Text>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Div Ref Test Text");
        expect(ref.current?.tagName).toBe("DIV");
    });

    it("forwards ref correctly for p element", () => {
        const ref = React.createRef<HTMLElement>();
        render(<Text size={ETextSize.B2} tag="p" ref={ref}>P Ref Test Text</Text>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("P Ref Test Text");
        expect(ref.current?.tagName).toBe("P");
    });

    it("applies correct CSS classes for different combinations", () => {
        render(
            <Text
                size={ETextSize.B3}
                weight={EFontWeightText.SEMIBOLD}
                type={EFontType.BRAND}
                line={ELineType.COMPACT}
                className="custom-class"
            >
                Complex Text
            </Text>
        );

        const text = screen.getByText("Complex Text");
        expect(text.className).toContain("custom-class");
        expect(text.className).toContain("typography");
        expect(text.className).toContain("text");
    });
}); 