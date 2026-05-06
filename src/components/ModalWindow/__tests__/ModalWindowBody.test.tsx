import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { ModalWindowBody } from "../components/ModalWindowBody";

afterEach(() => {
    cleanup();
});

describe("ModalWindowBody", () => {
    it("renders children", () => {
        render(
            <ModalWindowBody>
                <div data-testid="body-child">Body content</div>
            </ModalWindowBody>,
        );

        expect(screen.getByTestId("body-child")).toBeInTheDocument();
    });

    it("merges custom className with the default modalWindowBody class", () => {
        const { container } = render(
            <ModalWindowBody className="custom-body">
                <span>X</span>
            </ModalWindowBody>,
        );

        const root = container.querySelector(".modalWindowBody");
        expect(root).toHaveClass("custom-body");
    });
});
