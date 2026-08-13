import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BadgePrefix } from "../components/BadgePrefix";
import { BadgePostfix } from "../components/BadgePostfix";

describe.each([
    ["BadgePrefix", BadgePrefix, "badgePrefix"],
    ["BadgePostfix", BadgePostfix, "badgePostfix"],
])("%s", (_name, Affix, baseClassName) => {
    it("should render children inside a span with the base class", () => {
        const { container } = render(<Affix>Affix</Affix>);
        const affix = container.firstChild;

        expect(affix?.nodeName).toBe("SPAN");
        expect(affix).toHaveClass(baseClassName);
        expect(screen.getByText("Affix")).toBeInTheDocument();
    });

    it("should merge custom className with the base class", () => {
        const { container } = render(<Affix className="custom-class">Affix</Affix>);
        const affix = container.firstChild;

        expect(affix).toHaveClass("custom-class");
        expect(affix).toHaveClass(baseClassName);
    });

    it("should spread rest props to the root element", () => {
        render(
            <Affix data-testid="affix" id="affix-id">
                Affix
            </Affix>,
        );
        const affix = screen.getByText("Affix");

        expect(affix).toHaveAttribute("data-testid", "affix");
        expect(affix).toHaveAttribute("id", "affix-id");
    });
});
