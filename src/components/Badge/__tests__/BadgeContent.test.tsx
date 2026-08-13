import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BadgeContent } from "../components/BadgeContent";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

describe("BadgeContent", () => {
    it("should render children inside a span with the base class", () => {
        const { container } = render(<BadgeContent size={EComponentSize.MD}>Content</BadgeContent>);
        const content = container.firstChild;

        expect(content?.nodeName).toBe("SPAN");
        expect(content).toHaveClass("badgeContent");
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should apply correct size class from the map", () => {
        const { container: sm } = render(<BadgeContent size={EComponentSize.SM}>SM</BadgeContent>);
        const { container: md } = render(<BadgeContent size={EComponentSize.MD}>MD</BadgeContent>);
        const { container: lg } = render(<BadgeContent size={EComponentSize.LG}>LG</BadgeContent>);

        expect(sm.firstChild).toHaveClass("sm");
        expect(md.firstChild).toHaveClass("md");
        expect(lg.firstChild).toHaveClass("lg");
    });

    it("should keep both paddings by default", () => {
        const { container } = render(<BadgeContent size={EComponentSize.MD}>Content</BadgeContent>);
        const content = container.firstChild;

        expect(content).not.toHaveClass("noPaddingLeft");
        expect(content).not.toHaveClass("noPaddingRight");
    });

    it("should drop the left padding when noPaddingLeft is set", () => {
        const { container } = render(
            <BadgeContent size={EComponentSize.MD} noPaddingLeft>
                Content
            </BadgeContent>,
        );
        const content = container.firstChild;

        expect(content).toHaveClass("noPaddingLeft");
        expect(content).not.toHaveClass("noPaddingRight");
    });

    it("should drop the right padding when noPaddingRight is set", () => {
        const { container } = render(
            <BadgeContent size={EComponentSize.MD} noPaddingRight>
                Content
            </BadgeContent>,
        );
        const content = container.firstChild;

        expect(content).not.toHaveClass("noPaddingLeft");
        expect(content).toHaveClass("noPaddingRight");
    });

    it("should drop both paddings when noPaddingLeft and noPaddingRight are set", () => {
        const { container } = render(
            <BadgeContent size={EComponentSize.MD} noPaddingLeft noPaddingRight>
                Content
            </BadgeContent>,
        );
        const content = container.firstChild;

        expect(content).toHaveClass("noPaddingLeft");
        expect(content).toHaveClass("noPaddingRight");
    });

    it("should not add padding modifiers for explicitly false flags", () => {
        const { container } = render(
            <BadgeContent size={EComponentSize.MD} noPaddingLeft={false} noPaddingRight={false}>
                Content
            </BadgeContent>,
        );
        const content = container.firstChild;

        expect(content).not.toHaveClass("noPaddingLeft");
        expect(content).not.toHaveClass("noPaddingRight");
    });

    it("should merge custom className with the base classes", () => {
        const { container } = render(
            <BadgeContent size={EComponentSize.LG} className="custom-class">
                Content
            </BadgeContent>,
        );
        const content = container.firstChild;

        expect(content).toHaveClass("custom-class");
        expect(content).toHaveClass("badgeContent");
        expect(content).toHaveClass("lg");
    });

    it("should spread rest props to the root element", () => {
        render(
            <BadgeContent size={EComponentSize.MD} data-testid="badge-content" id="content-id">
                Content
            </BadgeContent>,
        );
        const content = screen.getByTestId("badge-content");

        expect(content).toHaveAttribute("id", "content-id");
    });
});
