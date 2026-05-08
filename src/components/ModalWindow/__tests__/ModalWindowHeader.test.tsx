import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { ModalWindowHeader } from "../components/ModalWindowHeader";

afterEach(() => {
    cleanup();
});

describe("ModalWindowHeader", () => {
    it("renders children", () => {
        render(
            <ModalWindowHeader>
                <div data-testid="header-child">Header content</div>
            </ModalWindowHeader>,
        );

        expect(screen.getByTestId("header-child")).toBeInTheDocument();
    });

    it("merges custom className with the default modalWindowHeader class", () => {
        const { container } = render(
            <ModalWindowHeader className="custom-header">
                <span>X</span>
            </ModalWindowHeader>,
        );

        const root = container.querySelector(".modalWindowHeader");
        expect(root).toHaveClass("custom-header");
    });

    it("exposes Title static subcomponent", () => {
        expect(ModalWindowHeader.Title).toBeDefined();
    });
});
