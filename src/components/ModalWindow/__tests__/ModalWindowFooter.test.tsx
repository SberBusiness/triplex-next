import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { ModalWindowFooter } from "../components/ModalWindowFooter";

afterEach(() => {
    cleanup();
});

describe("ModalWindowFooter", () => {
    it("renders children", () => {
        render(
            <ModalWindowFooter>
                <div data-testid="footer-child">Footer content</div>
            </ModalWindowFooter>,
        );

        expect(screen.getByTestId("footer-child")).toBeInTheDocument();
    });

    it("exposes Description static subcomponent", () => {
        expect(ModalWindowFooter.Description).toBeDefined();
    });
});
