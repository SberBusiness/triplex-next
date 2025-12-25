import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TagColor } from "../TagColor";
import { ETagColorStatus } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";

const getTagColor = () => screen.getByTestId("tag-color");

describe("TagColor", () => {
    it("Should render correctly with default props", () => {
        render(
            <TagColor size={EComponentSize.MD} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toBeInTheDocument();
        expect(tagColor).toHaveClass("tagColor");
        expect(tagColor).toHaveClass("md");
        expect(tagColor).toHaveClass("default");
        expect(screen.getByText("Test tag")).toBeInTheDocument();
    });

    it("Should not render when children is empty", () => {
        const { container } = render(<TagColor size={EComponentSize.MD}>{""}</TagColor>);

        expect(container.firstChild).toBeNull();
    });

    it("Should not render when children is null", () => {
        const { container } = render(<TagColor size={EComponentSize.MD}>{null}</TagColor>);

        expect(container.firstChild).toBeNull();
    });

    it("Should not render when children is undefined", () => {
        const { container } = render(<TagColor size={EComponentSize.MD}>{undefined}</TagColor>);

        expect(container.firstChild).toBeNull();
    });

    it("Should correct apply SM size", () => {
        render(
            <TagColor size={EComponentSize.SM} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveClass("sm");
    });

    it("Should correct apply MD size", () => {
        render(
            <TagColor size={EComponentSize.MD} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveClass("md");
    });

    it("Should correct apply LG size", () => {
        render(
            <TagColor size={EComponentSize.LG} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveClass("lg");
    });

    it("Should correct apply status classes", () => {
        const { rerender } = render(
            <TagColor size={EComponentSize.MD} status={ETagColorStatus.DEFAULT} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveClass("default");

        rerender(
            <TagColor size={EComponentSize.MD} status={ETagColorStatus.SUCCESS} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        expect(tagColor).toHaveClass("success");

        rerender(
            <TagColor size={EComponentSize.MD} status={ETagColorStatus.INFO} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        expect(tagColor).toHaveClass("info");

        rerender(
            <TagColor size={EComponentSize.MD} status={ETagColorStatus.WARNING} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        expect(tagColor).toHaveClass("warning");

        rerender(
            <TagColor size={EComponentSize.MD} status={ETagColorStatus.ERROR} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        expect(tagColor).toHaveClass("error");
    });

    it("Should apply custom className", () => {
        render(
            <TagColor size={EComponentSize.MD} className="custom-class" data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveClass("custom-class");
    });

    it("Should pass additional props to span element", () => {
        render(
            <TagColor size={EComponentSize.MD} data-testid="tag-color" aria-label="Test label" id="test-id">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveAttribute("data-testid", "tag-color");
        expect(tagColor).toHaveAttribute("aria-label", "Test label");
        expect(tagColor).toHaveAttribute("id", "test-id");
    });
});
