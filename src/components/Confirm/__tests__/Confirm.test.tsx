import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Confirm } from "../Confirm";
import { ConfirmClose } from "../components/ConfirmClose";
import { ConfirmContent } from "../components/ConfirmContent";
import { ConfirmControls } from "../components/ConfirmControls";
import { EConfirmParentComponent } from "../enums";

/** Соответствие значения EConfirmParentComponent имени класса максимальной ширины. */
const PARENT_COMPONENT_CLASS_NAMES: Record<EConfirmParentComponent, string> = {
    [EConfirmParentComponent.LIGHTBOX]: "isInLightBox",
    [EConfirmParentComponent.SIDE_OVERLAY_SM]: "isInSideOverlaySM",
    [EConfirmParentComponent.SIDE_OVERLAY_MD]: "isInSideOverlayMD",
    [EConfirmParentComponent.SIDE_OVERLAY_LG]: "isInSideOverlayLG",
};

describe("Confirm", () => {
    it("renders children inside the dialog", () => {
        render(
            <Confirm>
                <div data-testid="child">Содержимое</div>
            </Confirm>,
        );

        expect(screen.getByTestId("child")).toBeInTheDocument();
        expect(screen.getByRole("dialog")).toContainElement(screen.getByTestId("child"));
    });

    it("marks the root element as a modal dialog", () => {
        render(<Confirm>Содержимое</Confirm>);

        expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });

    it("applies the lightBox width class by default", () => {
        render(<Confirm>Содержимое</Confirm>);

        const root = screen.getByRole("dialog");

        expect(root).toHaveClass("confirm");
        expect(root).toHaveClass(PARENT_COMPONENT_CLASS_NAMES[EConfirmParentComponent.LIGHTBOX]);
    });

    it.each(Object.values(EConfirmParentComponent))(
        "applies the width class for parentComponent %s",
        (parentComponent) => {
            render(<Confirm parentComponent={parentComponent}>Содержимое</Confirm>);

            expect(screen.getByRole("dialog")).toHaveClass(PARENT_COMPONENT_CLASS_NAMES[parentComponent]);
        },
    );

    it("merges className with the base classes", () => {
        render(<Confirm className="custom">Содержимое</Confirm>);

        const root = screen.getByRole("dialog");

        expect(root).toHaveClass("custom");
        expect(root).toHaveClass("confirm");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<Confirm ref={ref}>Содержимое</Confirm>);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByRole("dialog"));
    });

    it("forwards html attributes to the root element", () => {
        render(
            <Confirm id="confirm-id" data-testid="confirm" aria-labelledby="title-id">
                Содержимое
            </Confirm>,
        );

        const root = screen.getByTestId("confirm");

        expect(root).toHaveAttribute("id", "confirm-id");
        expect(root).toHaveAttribute("aria-labelledby", "title-id");
    });

    it("lets the consumer override the dialog role", () => {
        render(
            <Confirm role="alertdialog" data-testid="confirm">
                Содержимое
            </Confirm>,
        );

        expect(screen.getByTestId("confirm")).toHaveAttribute("role", "alertdialog");
    });

    it("exposes composition statics", () => {
        expect(Confirm.Close).toBe(ConfirmClose);
        expect(Confirm.Content).toBe(ConfirmContent);
        expect(Confirm.Controls).toBe(ConfirmControls);
        expect(Confirm.displayName).toBe("Confirm");
    });
});
