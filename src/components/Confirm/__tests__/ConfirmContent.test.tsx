import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConfirmContent } from "../components/ConfirmContent";
import { ConfirmContentSubTitle } from "../components/ConfirmContentSubTitle";
import { ConfirmContentTitle } from "../components/ConfirmContentTitle";
import { ETitleSize } from "../../Typography/enums";

describe("ConfirmContent", () => {
    it("renders children in a div with the base class", () => {
        render(<ConfirmContent data-testid="content">Содержимое</ConfirmContent>);

        const root = screen.getByTestId("content");

        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("confirmContent");
        expect(root).toHaveTextContent("Содержимое");
    });

    it("merges className with the base class", () => {
        render(
            <ConfirmContent className="custom" data-testid="content">
                Содержимое
            </ConfirmContent>,
        );

        const root = screen.getByTestId("content");

        expect(root).toHaveClass("custom");
        expect(root).toHaveClass("confirmContent");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <ConfirmContent ref={ref} data-testid="content">
                Содержимое
            </ConfirmContent>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("content"));
    });

    it("exposes composition statics", () => {
        expect(ConfirmContent.Title).toBe(ConfirmContentTitle);
        expect(ConfirmContent.SubTitle).toBe(ConfirmContentSubTitle);
        expect(ConfirmContent.displayName).toBe("ConfirmContent");
    });
});

describe("ConfirmContentTitle", () => {
    it("renders h3 heading by default", () => {
        render(<ConfirmContentTitle>Внимание</ConfirmContentTitle>);

        const title = screen.getByRole("heading", { name: "Внимание" });

        expect(title.tagName).toBe("H3");
        expect(title).toHaveClass("confirmContentTitle");
    });

    it("supports another size and tag", () => {
        render(
            <ConfirmContentTitle size={ETitleSize.H1} tag="h2">
                Внимание
            </ConfirmContentTitle>,
        );

        expect(screen.getByRole("heading", { name: "Внимание" }).tagName).toBe("H2");
    });

    it("merges className with the base class", () => {
        render(<ConfirmContentTitle className="custom">Внимание</ConfirmContentTitle>);

        const title = screen.getByRole("heading", { name: "Внимание" });

        expect(title).toHaveClass("custom");
        expect(title).toHaveClass("confirmContentTitle");
    });

    it("forwards ref to the heading element", () => {
        const ref = React.createRef<HTMLHeadingElement>();

        render(<ConfirmContentTitle ref={ref}>Внимание</ConfirmContentTitle>);

        expect(ref.current).toBe(screen.getByRole("heading", { name: "Внимание" }));
    });
});

describe("ConfirmContentSubTitle", () => {
    it("renders text in a div", () => {
        render(<ConfirmContentSubTitle data-testid="subtitle">Данные будут утеряны</ConfirmContentSubTitle>);

        const subTitle = screen.getByTestId("subtitle");

        expect(subTitle.tagName).toBe("DIV");
        expect(subTitle).toHaveTextContent("Данные будут утеряны");
    });

    it("forwards ref and className", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <ConfirmContentSubTitle ref={ref} className="custom" data-testid="subtitle">
                Данные будут утеряны
            </ConfirmContentSubTitle>,
        );

        const subTitle = screen.getByTestId("subtitle");

        expect(ref.current).toBe(subTitle);
        expect(subTitle).toHaveClass("custom");
    });
});
