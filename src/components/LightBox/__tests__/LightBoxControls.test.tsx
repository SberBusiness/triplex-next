import { describe, expect, it, vi } from "vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { LightBoxControls } from "../LightBoxControls/LightBoxControls";

vi.mock("@sberbusiness/icons-next", () => ({
    CrossStrokeSrvIcon32: () => <span data-testid="icon-close-desktop" />,
    CrossStrokeSrvIcon20: () => <span data-testid="icon-close-mobile" />,
    CaretleftStrokeSrvIcon32: () => <span data-testid="icon-prev-desktop" />,
    CaretleftStrokeSrvIcon20: () => <span data-testid="icon-prev-mobile" />,
    CaretrightStrokeSrvIcon32: () => <span data-testid="icon-next-desktop" />,
    CaretrightStrokeSrvIcon20: () => <span data-testid="icon-next-mobile" />,
}));

vi.mock("../../Triggers/TriggerClickOnKeyDownEvent", () => ({
    TriggerClickOnKeyDownEvent: ({ children }: { children: React.ReactElement }) => children,
}));

describe("LightBoxControls", () => {
    it("renders controls container with data attribute", () => {
        render(
            <LightBoxControls>
                <div>child</div>
            </LightBoxControls>,
        );

        const controls = document.querySelector('[data-lightbox-component="controls"]');
        expect(controls).not.toBeNull();
    });

    it("invokes handlers for close, prev and next buttons", () => {
        const handleClose = vi.fn();
        const handlePrev = vi.fn();
        const handleNext = vi.fn();

        render(
            <LightBoxControls>
                <LightBoxControls.Close onClick={handleClose} />
                <LightBoxControls.Prev title="Назад" onClick={handlePrev} clickByArrowLeft />
                <LightBoxControls.Next title="Вперёд" onClick={handleNext} clickByArrowRight />
            </LightBoxControls>,
        );

        fireEvent.click(screen.getAllByTitle("Закрыть")[0]);
        fireEvent.click(screen.getAllByTitle("Назад")[0]);
        fireEvent.click(screen.getAllByTitle("Вперёд")[0]);

        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(handlePrev).toHaveBeenCalledTimes(1);
        expect(handleNext).toHaveBeenCalledTimes(1);
    });
});
