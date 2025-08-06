import React from "react";
import { render, screen } from "@testing-library/react";
import { Title } from "../Title";
import { ETitleSize, EFontWeightTitle, EFontType } from "../enums";

describe("Title", () => {
    it("renders with default props", () => {
        render(<Title size={ETitleSize.H1}>Test Title</Title>);

        const title = screen.getByRole("heading", { level: 1 });
        expect(title).toBeDefined();
        expect(title.textContent).toBe("Test Title");
    });

    it("renders with custom tag", () => {
        render(<Title size={ETitleSize.H2} tag="div">Custom Tag Title</Title>);

        const title = screen.getByText("Custom Tag Title");
        expect(title.tagName).toBe("DIV");
    });

    it("applies custom className", () => {
        const className = "custom-title-class";
        render(<Title size={ETitleSize.H2} className={className}>Test Title</Title>);

        const title = screen.getByText("Test Title");
        expect(title.className).toContain(className);
    });

    it("renders with underline", () => {
        render(<Title size={ETitleSize.H2} underline>Underlined Title</Title>);

        const title = screen.getByText("Underlined Title");
        expect(title.className).toContain("underline");
    });

    it("renders with strikethrough", () => {
        render(<Title size={ETitleSize.H2} strikethrough>Strikethrough Title</Title>);

        const title = screen.getByText("Strikethrough Title");
        expect(title.className).toContain("strikethrough");
    });

    it("renders with both underline and strikethrough", () => {
        render(
            <Title size={ETitleSize.H2} underline strikethrough>
                Underlined and Strikethrough Title
            </Title>
        );

        const title = screen.getByText("Underlined and Strikethrough Title");
        expect(title.className).toContain("underlineStrikethrough");
    });

    it("passes through additional props", () => {
        render(
            <Title
                size={ETitleSize.H2}
                data-testid="title-test"
                aria-label="Test title"
            >
                Test Title
            </Title>
        );

        const title = screen.getByTestId("title-test");
        expect(title.getAttribute("aria-label")).toBe("Test title");
    });

    it("renders children correctly", () => {
        render(
            <Title size={ETitleSize.H2}>
                <span>Nested</span> <strong>Content</strong>
            </Title>
        );

        expect(screen.getByText("Nested")).toBeDefined();
        expect(screen.getByText("Content")).toBeDefined();
    });

    it("forwards ref correctly for heading element", () => {
        const ref = React.createRef<HTMLHeadingElement>();
        render(<Title size={ETitleSize.H2} ref={ref}>Ref Test Title</Title>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Ref Test Title");
        expect(ref.current?.tagName).toBe("H2");
    });

    it("forwards ref correctly for div element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Title size={ETitleSize.H2} tag="div" ref={ref}>Div Ref Test Title</Title>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Div Ref Test Title");
        expect(ref.current?.tagName).toBe("DIV");
    });

    it("forwards ref correctly for span element", () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(<Title size={ETitleSize.H2} tag="span" ref={ref}>Span Ref Test Title</Title>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Span Ref Test Title");
        expect(ref.current?.tagName).toBe("SPAN");
    });
}); 