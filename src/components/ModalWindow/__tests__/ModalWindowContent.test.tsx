import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { ModalWindowContent } from "../components/ModalWindowContent";

afterEach(() => {
    cleanup();
});

describe("ModalWindowContent", () => {
    it("renders children inside Page wrapper", () => {
        render(
            <ModalWindowContent>
                <div data-testid="content">Hello</div>
            </ModalWindowContent>,
        );

        expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("does not render LoaderScreen when isLoading is falsy", () => {
        const { container } = render(
            <ModalWindowContent>
                <div>Hello</div>
            </ModalWindowContent>,
        );

        expect(container.querySelector(".modalWindowLoaderScreen")).toBeNull();
        expect(container.querySelector(".modalWindowContent")?.classList.contains("isLoading")).toBe(false);
    });

    it("renders LoaderScreen and applies isLoading class when isLoading is true", () => {
        const { container } = render(
            <ModalWindowContent isLoading loadingTitle="Загрузка...">
                <div>Hello</div>
            </ModalWindowContent>,
        );

        const root = container.querySelector(".modalWindowContent");
        expect(root?.classList.contains("isLoading")).toBe(true);
        expect(container.querySelector(".modalWindowLoaderScreen")).toBeInTheDocument();
    });

    it("merges custom className with the root element", () => {
        const { container } = render(
            <ModalWindowContent className="custom-content">
                <div>Hello</div>
            </ModalWindowContent>,
        );

        const root = container.querySelector(".modalWindowContent");
        expect(root).toHaveClass("custom-content");
    });

    it("forwards rest HTML attributes to the root element", () => {
        const { container } = render(
            <ModalWindowContent data-testid="modal-content" id="modal-content-1" aria-label="Контент">
                <div>Hello</div>
            </ModalWindowContent>,
        );

        const root = container.querySelector(".modalWindowContent");
        expect(root).toHaveAttribute("data-testid", "modal-content");
        expect(root).toHaveAttribute("id", "modal-content-1");
        expect(root).toHaveAttribute("aria-label", "Контент");
    });
});
