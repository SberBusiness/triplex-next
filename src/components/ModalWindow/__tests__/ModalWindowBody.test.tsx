import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { IModalWindowBodyProps, ModalWindowBody } from "../components/ModalWindowBody";

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

    it("does not expose Island loading props in its public type", () => {
        // @ts-expect-error isLoading исключён из IModalWindowBodyProps через Omit.
        const withIsLoading: IModalWindowBodyProps = { isLoading: true };
        // @ts-expect-error loaderScreenProps исключён из IModalWindowBodyProps через Omit.
        const withLoaderScreenProps: IModalWindowBodyProps = { loaderScreenProps: {} };

        expect([withIsLoading, withLoaderScreenProps]).toHaveLength(2);
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
