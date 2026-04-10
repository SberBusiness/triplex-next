import React from "react";
import { render, screen } from "@testing-library/react";
import { CodeText } from "../CodeText";
import { EFontType } from "../enums";

describe("CodeText", () => {
    it("renders with default props", () => {
        render(<CodeText>Test CodeText</CodeText>);

        const codeText = screen.getByText("Test CodeText");
        expect(codeText).toBeDefined();
        expect(codeText.tagName).toBe("SPAN");
    });

    it("renders with custom tag", () => {
        render(<CodeText tag="code">Custom Tag CodeText</CodeText>);

        const codeText = screen.getByText("Custom Tag CodeText");
        expect(codeText.tagName).toBe("CODE");
    });

    it("applies custom className", () => {
        const className = "custom-codetext-class";
        render(<CodeText className={className}>Test CodeText</CodeText>);

        const codeText = screen.getByText("Test CodeText");
        expect(codeText.className).toContain(className);
    });

    it("renders with underline", () => {
        render(<CodeText underline>Underlined CodeText</CodeText>);

        const codeText = screen.getByText("Underlined CodeText");
        expect(codeText.className).toContain("underline");
    });

    it("renders with strikethrough", () => {
        render(<CodeText strikethrough>Strikethrough CodeText</CodeText>);

        const codeText = screen.getByText("Strikethrough CodeText");
        expect(codeText.className).toContain("strikethrough");
    });

    it("renders with both underline and strikethrough", () => {
        render(
            <CodeText underline strikethrough>
                Underlined and Strikethrough CodeText
            </CodeText>,
        );

        const codeText = screen.getByText("Underlined and Strikethrough CodeText");
        expect(codeText.className).toContain("underlineStrikethrough");
    });

    it("applies correct CSS classes", () => {
        render(
            <CodeText type={EFontType.BRAND} className="custom-class">
                Complex CodeText
            </CodeText>,
        );

        const codeText = screen.getByText("Complex CodeText");
        expect(codeText.className).toContain("custom-class");
        expect(codeText.className).toContain("typography");
        expect(codeText.className).toContain("codeText");
    });

    it("passes through additional props", () => {
        render(
            <CodeText data-testid="codetext-test" aria-label="Test codetext">
                Test CodeText
            </CodeText>,
        );

        const codeText = screen.getByTestId("codetext-test");
        expect(codeText.getAttribute("aria-label")).toBe("Test codetext");
    });

    it("renders children correctly", () => {
        render(
            <CodeText>
                <span>Nested</span> <strong>Content</strong>
            </CodeText>,
        );

        expect(screen.getByText("Nested")).toBeDefined();
        expect(screen.getByText("Content")).toBeDefined();
    });

    it("forwards ref correctly for span element", () => {
        const ref = React.createRef<HTMLElement>();
        render(<CodeText ref={ref}>Ref Test CodeText</CodeText>);

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Ref Test CodeText");
        expect(ref.current?.tagName).toBe("SPAN");
    });

    it("forwards ref correctly for code element", () => {
        const ref = React.createRef<HTMLElement>();
        render(
            <CodeText tag="code" ref={ref}>
                Code Ref Test
            </CodeText>,
        );

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Code Ref Test");
        expect(ref.current?.tagName).toBe("CODE");
    });

    it("forwards ref correctly for div element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <CodeText tag="div" ref={ref}>
                Div Ref Test
            </CodeText>,
        );

        expect(ref.current).toBeDefined();
        expect(ref.current?.textContent).toBe("Div Ref Test");
        expect(ref.current?.tagName).toBe("DIV");
    });
});
