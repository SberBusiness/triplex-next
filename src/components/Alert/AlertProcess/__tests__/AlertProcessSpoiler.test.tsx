import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AlertProcessSpoiler } from "../components/AlertProcessSpoiler";

vi.mock("@sberbusiness/icons-next", () => ({
    CaretdownStrokeSrvIcon16: () => <div data-testid="caret-icon">CaretIcon</div>,
}));

const getContent = () => screen.getByTestId("spoiler");
const getToggleButton = () => screen.getByRole("button");

describe("AlertProcessSpoiler", () => {
    it("Should render children", () => {
        render(<AlertProcessSpoiler data-testid="spoiler">Spoiler content</AlertProcessSpoiler>);

        expect(getContent()).toBeInTheDocument();
        expect(screen.getByText("Spoiler content")).toBeInTheDocument();
    });

    it("Should render toggle button with caret icon", () => {
        render(<AlertProcessSpoiler data-testid="spoiler">Spoiler content</AlertProcessSpoiler>);

        expect(getToggleButton()).toBeInTheDocument();
        expect(screen.getByTestId("caret-icon")).toBeInTheDocument();
    });

    it("Should render content collapsed when open is not set", () => {
        render(<AlertProcessSpoiler data-testid="spoiler">Spoiler content</AlertProcessSpoiler>);

        const content = getContent();
        expect(content).toHaveClass("expandableContent");
        expect(content).not.toHaveClass("expanded");
    });

    it("Should render content and toggle button as siblings, without a wrapper", () => {
        const { container } = render(<AlertProcessSpoiler data-testid="spoiler">Spoiler content</AlertProcessSpoiler>);

        expect(container.children).toHaveLength(2);
        expect(container.children[0]).toBe(getContent());
        expect(container.children[1]).toContainElement(getToggleButton());
    });

    it("Should report the collapsed state through aria-expanded", () => {
        render(<AlertProcessSpoiler data-testid="spoiler">Spoiler content</AlertProcessSpoiler>);

        expect(getToggleButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("Should report the expanded state through aria-expanded", () => {
        render(
            <AlertProcessSpoiler open data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        expect(getToggleButton()).toHaveAttribute("aria-expanded", "true");
    });

    it("Should mark content and toggle button as expanded when open is true", () => {
        render(
            <AlertProcessSpoiler open data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        expect(getContent()).toHaveClass("expanded");
        expect(getToggleButton().closest("div")).toHaveClass("expanded");
    });

    it("Should drop the expanded classes when open becomes false", () => {
        const { rerender } = render(
            <AlertProcessSpoiler open data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        expect(getContent()).toHaveClass("expanded");

        rerender(
            <AlertProcessSpoiler open={false} data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        expect(getContent()).not.toHaveClass("expanded");
    });

    it("Should call onOpen with true when a closed spoiler is toggled", () => {
        const onOpen = vi.fn();
        render(
            <AlertProcessSpoiler onOpen={onOpen} data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        fireEvent.click(getToggleButton());

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onOpen).toHaveBeenCalledWith(true);
    });

    it("Should call onOpen with false when an opened spoiler is toggled", () => {
        const onOpen = vi.fn();
        render(
            <AlertProcessSpoiler open onOpen={onOpen} data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        fireEvent.click(getToggleButton());

        expect(onOpen).toHaveBeenCalledWith(false);
    });

    it("Should not change its own state on toggle — open stays controlled by the consumer", () => {
        render(
            <AlertProcessSpoiler open={false} data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        fireEvent.click(getToggleButton());

        expect(getContent()).not.toHaveClass("expanded");
    });

    it("Should toggle without onOpen passed", () => {
        render(<AlertProcessSpoiler data-testid="spoiler">Spoiler content</AlertProcessSpoiler>);

        expect(() => fireEvent.click(getToggleButton())).not.toThrow();
    });

    it("Should merge custom className into the content element", () => {
        render(
            <AlertProcessSpoiler className="custom-class" data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        const content = getContent();
        expect(content).toHaveClass("custom-class");
        expect(content).toHaveClass("expandableContent");
    });

    it("Should pass through additional props to the content element", () => {
        render(
            <AlertProcessSpoiler id="spoiler-id" aria-label="Spoiler label" data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        const content = getContent();
        expect(content).toHaveAttribute("id", "spoiler-id");
        expect(content).toHaveAttribute("aria-label", "Spoiler label");
    });

    it("Should forward ref to the content element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <AlertProcessSpoiler ref={ref} data-testid="spoiler">
                Spoiler content
            </AlertProcessSpoiler>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getContent());
    });
});
