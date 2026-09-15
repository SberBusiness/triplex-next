import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConfirmControls } from "../components/ConfirmControls";

describe("ConfirmControls", () => {
    it("renders children in a div with the base class", () => {
        render(
            <ConfirmControls data-testid="controls">
                <button type="button">Отмена</button>
            </ConfirmControls>,
        );

        const root = screen.getByTestId("controls");

        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("confirmControls");
        expect(root).toContainElement(screen.getByRole("button", { name: "Отмена" }));
    });

    it("merges className and forwards ref", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <ConfirmControls ref={ref} className="custom" data-testid="controls">
                Кнопки
            </ConfirmControls>,
        );

        const root = screen.getByTestId("controls");

        expect(ref.current).toBe(root);
        expect(root).toHaveClass("custom");
        expect(root).toHaveClass("confirmControls");
    });
});
