import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Confirm, IConfirmProps } from "../Confirm";

afterEach(() => {
    cleanup();
});

describe("Confirm", () => {
    it("renders children inside a modal dialog", () => {
        render(<Confirm>Confirm content</Confirm>);

        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(dialog).toHaveTextContent("Confirm content");
    });

    it("does not expose Island loading props in its public type", () => {
        // @ts-expect-error isLoading исключён из IConfirmProps через Omit.
        const withIsLoading: IConfirmProps = { isLoading: true };
        // @ts-expect-error loaderScreenProps исключён из IConfirmProps через Omit.
        const withLoaderScreenProps: IConfirmProps = { loaderScreenProps: {} };

        expect([withIsLoading, withLoaderScreenProps]).toHaveLength(2);
    });
});
