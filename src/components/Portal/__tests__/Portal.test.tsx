import React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Portal } from "../Portal";

describe("Portal", () => {
    let portalContainer: HTMLDivElement;

    beforeEach(() => {
        portalContainer = document.createElement("div");
        document.body.appendChild(portalContainer);
    });

    afterEach(() => {
        portalContainer.remove();
    });

    it("renders children into the given container, not into the render parent", () => {
        const { container: renderRoot } = render(
            <Portal container={portalContainer}>
                <span>Portal content</span>
            </Portal>,
        );

        expect(screen.getByText("Portal content")).toBeInTheDocument();
        expect(portalContainer).toContainElement(screen.getByText("Portal content"));
        expect(renderRoot).toBeEmptyDOMElement();
    });

    it("renders children into a DocumentFragment container", () => {
        const fragment = document.createDocumentFragment();

        render(
            <Portal container={fragment}>
                <span>Fragment content</span>
            </Portal>,
        );

        expect(fragment.querySelector("span")).toHaveTextContent("Fragment content");
    });

    it("updates children in the container on rerender", () => {
        const { rerender } = render(<Portal container={portalContainer}>First</Portal>);

        rerender(<Portal container={portalContainer}>Second</Portal>);

        expect(portalContainer).toHaveTextContent("Second");
        expect(portalContainer).not.toHaveTextContent("First");
    });

    it("moves children when container changes on rerender", () => {
        const nextContainer = document.createElement("div");
        document.body.appendChild(nextContainer);

        const { rerender } = render(<Portal container={portalContainer}>Content</Portal>);
        rerender(<Portal container={nextContainer}>Content</Portal>);

        expect(portalContainer).toBeEmptyDOMElement();
        expect(nextContainer).toHaveTextContent("Content");

        nextContainer.remove();
    });

    it("removes children from the container on unmount", () => {
        const { unmount } = render(<Portal container={portalContainer}>Content</Portal>);

        unmount();

        expect(portalContainer).toBeEmptyDOMElement();
    });
});
