import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Badge } from "../Badge";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

describe("Badge", () => {
    it("should render correctly with children", () => {
        render(<Badge size={EComponentSize.MD}>Test</Badge>);

        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should render as a span element", () => {
        render(<Badge size={EComponentSize.MD}>Badge Text</Badge>);

        const badge = screen.getByText("Badge Text").closest("span");
        expect(badge?.tagName).toBe("SPAN");
    });

    it("should apply correct size class from the map", () => {
        const { container: sm } = render(<Badge size={EComponentSize.SM}>SM</Badge>);
        const { container: md } = render(<Badge size={EComponentSize.MD}>MD</Badge>);
        const { container: lg } = render(<Badge size={EComponentSize.LG}>LG</Badge>);

        expect(sm.firstChild).toHaveClass("sm");
        expect(md.firstChild).toHaveClass("md");
        expect(lg.firstChild).toHaveClass("lg");
    });

    it("should merge and apply custom className", () => {
        const { container } = render(
            <Badge size={EComponentSize.MD} className="custom-class">
                Test
            </Badge>,
        );
        const badge = container.firstChild;

        expect(badge).toHaveClass("custom-class");
        expect(badge).toHaveClass("badge");
    });

    it("should forward ref correctly to the HTML element", () => {
        const ref = createRef<HTMLSpanElement>();
        render(
            <Badge size={EComponentSize.MD} ref={ref}>
                Ref Target
            </Badge>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("should accept and apply inline styles for positioning", () => {
        const customStyle = { top: "10px", position: "absolute" as const };
        const { container } = render(
            <Badge size={EComponentSize.SM} style={customStyle}>
                Styled
            </Badge>,
        );
        const badge = container.firstChild;

        expect(badge).toHaveStyle({ top: "10px", position: "absolute" });
    });

    it("should render nested elements properly", () => {
        render(
            <Badge size={EComponentSize.MD}>
                <span>99+</span>
            </Badge>,
        );

        expect(screen.getByText("99+")).toBeInTheDocument();
    });

    it("should render with prefix and content", () => {
        render(
            <Badge size={EComponentSize.MD} prefix={<span>Prefix Icon</span>}>
                <span>Badge text</span>
            </Badge>,
        );

        expect(screen.getByText("Prefix Icon")).toBeInTheDocument();
        expect(screen.getByText("Badge text")).toBeInTheDocument();
    });

    it("should render with postfix and content", () => {
        render(
            <Badge size={EComponentSize.MD} postfix={<span>Postfix Icon</span>}>
                <span>Badge text</span>
            </Badge>,
        );

        expect(screen.getByText("Postfix Icon")).toBeInTheDocument();
        expect(screen.getByText("Badge text")).toBeInTheDocument();
    });

    it("should render only prefix without content", () => {
        render(<Badge size={EComponentSize.MD} prefix={<span>Prefix Only</span>} />);

        expect(screen.getByText("Prefix Only")).toBeInTheDocument();
    });

    it("should render only postfix without content", () => {
        render(<Badge size={EComponentSize.MD} postfix={<span>Postfix Only</span>} />);

        expect(screen.getByText("Postfix Only")).toBeInTheDocument();
    });

    it("should render Badge.Dot correctly", () => {
        render(<Badge.Dot size={EComponentSize.MD} data-testid="badge-dot" />);

        expect(screen.getByTestId("badge-dot")).toBeInTheDocument();
    });

    it("should spread rest props to the root element", () => {
        render(
            <Badge size={EComponentSize.MD} data-testid="badge" id="badge-id" aria-label="Новинка">
                Test
            </Badge>,
        );
        const badge = screen.getByTestId("badge");

        expect(badge).toHaveAttribute("id", "badge-id");
        expect(badge).toHaveAttribute("aria-label", "Новинка");
    });

    it("should call onClick passed through rest props with the root element as a target", async () => {
        const user = userEvent.setup();
        // currentTarget обнуляется React после выхода из обработчика, поэтому фиксируем его внутри.
        let currentTarget: EventTarget | null = null;
        const onClick = vi.fn((event: React.MouseEvent<HTMLSpanElement>) => {
            currentTarget = event.currentTarget;
        });
        render(
            <Badge size={EComponentSize.MD} data-testid="badge" onClick={onClick}>
                Test
            </Badge>,
        );

        await user.click(screen.getByTestId("badge"));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(currentTarget).toBe(screen.getByTestId("badge"));
    });

    it("should not render the content wrapper without children", () => {
        const { container } = render(<Badge size={EComponentSize.MD} prefix={<span>Prefix</span>} />);

        expect(container.querySelector(".badgeContent")).not.toBeInTheDocument();
    });

    it("should pass its size down to the content wrapper", () => {
        const { container } = render(<Badge size={EComponentSize.LG}>Test</Badge>);

        expect(container.querySelector(".badgeContent")).toHaveClass("lg");
    });

    it("should keep both content paddings when there is no prefix and no postfix", () => {
        const { container } = render(<Badge size={EComponentSize.MD}>Test</Badge>);
        const content = container.querySelector(".badgeContent");

        expect(content).not.toHaveClass("noPaddingLeft");
        expect(content).not.toHaveClass("noPaddingRight");
    });

    it("should drop the left content padding when prefix is passed", () => {
        const { container } = render(
            <Badge size={EComponentSize.MD} prefix={<span>Prefix</span>}>
                Test
            </Badge>,
        );
        const content = container.querySelector(".badgeContent");

        expect(content).toHaveClass("noPaddingLeft");
        expect(content).not.toHaveClass("noPaddingRight");
    });

    it("should drop the right content padding when postfix is passed", () => {
        const { container } = render(
            <Badge size={EComponentSize.MD} postfix={<span>Postfix</span>}>
                Test
            </Badge>,
        );
        const content = container.querySelector(".badgeContent");

        expect(content).not.toHaveClass("noPaddingLeft");
        expect(content).toHaveClass("noPaddingRight");
    });

    it("should drop both content paddings when prefix and postfix are passed", () => {
        const { container } = render(
            <Badge size={EComponentSize.MD} prefix={<span>Prefix</span>} postfix={<span>Postfix</span>}>
                Test
            </Badge>,
        );
        const content = container.querySelector(".badgeContent");

        expect(content).toHaveClass("noPaddingLeft");
        expect(content).toHaveClass("noPaddingRight");
    });

    it("should render prefix, content and postfix in that order inside their wrappers", () => {
        const { container } = render(
            <Badge size={EComponentSize.MD} prefix={<span>Prefix</span>} postfix={<span>Postfix</span>}>
                Content
            </Badge>,
        );
        const badge = container.firstChild;

        expect(badge?.childNodes).toHaveLength(3);
        expect(badge?.childNodes[0]).toHaveClass("badgePrefix");
        expect(badge?.childNodes[1]).toHaveClass("badgeContent");
        expect(badge?.childNodes[2]).toHaveClass("badgePostfix");
        expect(screen.getByText("Prefix").parentElement).toHaveClass("badgePrefix");
        expect(screen.getByText("Postfix").parentElement).toHaveClass("badgePostfix");
    });
});
