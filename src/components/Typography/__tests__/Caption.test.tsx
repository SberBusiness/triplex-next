import React from "react";
import { render, screen } from "@testing-library/react";
import { Caption } from "../Caption";
import { ECaptionSize, EFontWeightCaption, EFontType } from "../enums";

describe("Caption", () => {
    it("renders with default props", () => {
        render(<Caption size={ECaptionSize.C1}>Test Caption</Caption>);

        const caption = screen.getByText("Test Caption");
        expect(caption).toBeDefined();
        expect(caption.tagName).toBe("SPAN");
    });

    it("renders with custom tag", () => {
        render(
            <Caption size={ECaptionSize.C1} tag="div">
                Custom Tag Caption
            </Caption>,
        );

        const caption = screen.getByText("Custom Tag Caption");
        expect(caption.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
        const className = "custom-caption-class";
        render(
            <Caption size={ECaptionSize.C1} className={className}>
                Test Caption
            </Caption>,
        );

        const caption = screen.getByText("Test Caption");
        expect(caption.className).toContain(className);
    });

    it("renders with underline", () => {
        render(
            <Caption size={ECaptionSize.C1} underline>
                Underlined Caption
            </Caption>,
        );

        const caption = screen.getByText("Underlined Caption");
        expect(caption.className).toContain("underline");
    });

    it("renders with strikethrough", () => {
        render(
            <Caption size={ECaptionSize.C1} strikethrough>
                Strikethrough Caption
            </Caption>,
        );

        const caption = screen.getByText("Strikethrough Caption");
        expect(caption.className).toContain("strikethrough");
    });

    it("renders with both underline and strikethrough", () => {
        render(
            <Caption size={ECaptionSize.C1} underline strikethrough>
                Underlined and Strikethrough Caption
            </Caption>,
        );

        const caption = screen.getByText("Underlined and Strikethrough Caption");
        expect(caption.className).toContain("underlineStrikethrough");
    });

    it("passes through additional props", () => {
        render(
            <Caption size={ECaptionSize.C1} data-testid="caption-test" aria-label="Test caption">
                Test Caption
            </Caption>,
        );

        const caption = screen.getByTestId("caption-test");
        expect(caption.getAttribute("aria-label")).toBe("Test caption");
    });

    it("renders children correctly", () => {
        render(
            <Caption size={ECaptionSize.C1}>
                <span>Nested</span> <strong>Content</strong>
            </Caption>,
        );

        expect(screen.getByText("Nested")).toBeDefined();
        expect(screen.getByText("Content")).toBeDefined();
    });

    it("forwards ref correctly for span element", () => {
        const ref = React.createRef<HTMLElement>();
        render(
            <Caption size={ECaptionSize.C1} ref={ref}>
                Ref Test Caption
            </Caption>,
        );

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Ref Test Caption");
        expect(ref.current?.tagName).toBe("SPAN");
    });

    it("forwards ref correctly for div element", () => {
        const ref = React.createRef<HTMLElement>();
        render(
            <Caption size={ECaptionSize.C1} tag="div" ref={ref}>
                Div Ref Test Caption
            </Caption>,
        );

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Div Ref Test Caption");
        expect(ref.current?.tagName).toBe("DIV");
    });

    it("forwards ref correctly for p element", () => {
        const ref = React.createRef<HTMLElement>();
        render(
            <Caption size={ECaptionSize.C1} tag="p" ref={ref}>
                P Ref Test Caption
            </Caption>,
        );

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("P Ref Test Caption");
        expect(ref.current?.tagName).toBe("P");
    });

    it("applies correct CSS classes for different combinations", () => {
        render(
            <Caption
                size={ECaptionSize.D1}
                weight={EFontWeightCaption.SEMIBOLD}
                type={EFontType.BRAND}
                className="custom-class"
            >
                Complex Caption
            </Caption>,
        );

        const caption = screen.getByText("Complex Caption");
        expect(caption.className).toContain("custom-class");
        expect(caption.className).toContain("typography");
        expect(caption.className).toContain("caption");
    });
});
