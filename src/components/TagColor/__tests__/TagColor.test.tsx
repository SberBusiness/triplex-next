import React, { createRef } from "react";
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
        // Статус не передан — применяется ETagColorStatus.DEFAULT.
        expect(tagColor).toHaveClass("default");
        expect(screen.getByText("Test tag")).toBeInTheDocument();
    });

    it("Should wrap children into the content element", () => {
        render(
            <TagColor size={EComponentSize.MD} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        // Обрезка длинного текста многоточием живёт на внутреннем элементе, а не на корневом.
        const content = getTagColor().firstElementChild;
        expect(content).toHaveClass("content");
        expect(content).toHaveTextContent("Test tag");
    });

    it.each([
        ["empty string", ""],
        ["null", null],
        ["undefined", undefined],
    ])("Should render empty component when children is %s", (_name, children) => {
        render(
            <TagColor size={EComponentSize.MD} data-testid="tag-color">
                {children}
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toBeInTheDocument();
        expect(tagColor).toHaveClass("tagColor");
        expect(tagColor).toHaveTextContent("");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should apply size class for %s", (size, className) => {
        render(
            <TagColor size={size} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        expect(getTagColor()).toHaveClass(className);
    });

    it.each([
        [ETagColorStatus.DEFAULT, "default"],
        [ETagColorStatus.SUCCESS, "success"],
        [ETagColorStatus.INFO, "info"],
        [ETagColorStatus.WARNING, "warning"],
        [ETagColorStatus.ERROR, "error"],
    ])("Should apply status class for %s", (status, className) => {
        render(
            <TagColor size={EComponentSize.MD} status={status} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        expect(getTagColor()).toHaveClass(className);
    });

    it("Should replace the status class when status changes", () => {
        const { rerender } = render(
            <TagColor size={EComponentSize.MD} status={ETagColorStatus.SUCCESS} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        expect(getTagColor()).toHaveClass("success");

        rerender(
            <TagColor size={EComponentSize.MD} status={ETagColorStatus.ERROR} data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveClass("error");
        expect(tagColor).not.toHaveClass("success");
    });

    it("Should apply custom className", () => {
        render(
            <TagColor size={EComponentSize.MD} className="custom-class" data-testid="tag-color">
                Test tag
            </TagColor>,
        );

        const tagColor = getTagColor();
        expect(tagColor).toHaveClass("custom-class");
        expect(tagColor).toHaveClass("tagColor");
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

    it("Should forward ref to the root span element", () => {
        const ref = createRef<HTMLSpanElement>();
        render(
            <TagColor size={EComponentSize.MD} ref={ref}>
                Test tag
            </TagColor>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toHaveClass("tagColor");
    });

    it("Should have displayName", () => {
        expect(TagColor.displayName).toBe("TagColor");
    });
});
