import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TooltipContext, ITooltipContext } from "../TootlipContext";
import { TooltipTarget } from "../components/common/TooltipTarget";
import { TTooltipToggleType } from "../types";

interface IRenderOptions {
    toggleType?: TTooltipToggleType;
    tooltipOpen?: boolean;
    targetHovered?: boolean;
    onClick?: React.MouseEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
}

const renderTarget = ({
    toggleType = "click",
    tooltipOpen = false,
    targetHovered = false,
    onClick,
    onKeyDown,
}: IRenderOptions = {}) => {
    const setTooltipOpen = vi.fn();
    const targetHoveredRef = { current: targetHovered };
    const contextValue: ITooltipContext = {
        elements: { body: null, link: null, closeButton: null, mobileHeader: null, target: null },
        setTooltipOpen,
        targetHoveredRef,
        toggleType,
        tooltipOpen,
    };

    render(
        <TooltipContext.Provider value={contextValue}>
            <TooltipTarget>
                <button type="button" onClick={onClick} onKeyDown={onKeyDown}>
                    Target
                </button>
            </TooltipTarget>
        </TooltipContext.Provider>,
    );

    return { setTooltipOpen, target: screen.getByRole("button", { name: "Target" }) };
};

describe("TooltipTarget", () => {
    it("should render the child element as is", () => {
        const { target } = renderTarget();

        expect(target).toBeInTheDocument();
    });

    it("should open the tooltip on click when toggleType is click", () => {
        const { setTooltipOpen, target } = renderTarget({ toggleType: "click" });

        fireEvent.click(target);

        expect(setTooltipOpen).toHaveBeenCalledWith(true);
    });

    it("should close the opened tooltip on click when toggleType is click", () => {
        const { setTooltipOpen, target } = renderTarget({ toggleType: "click", tooltipOpen: true });

        fireEvent.click(target);

        expect(setTooltipOpen).toHaveBeenCalledWith(false);
    });

    it("should open the tooltip on click when toggleType is hover and the target was not hovered", () => {
        const { setTooltipOpen, target } = renderTarget({ toggleType: "hover", targetHovered: false });

        fireEvent.click(target);

        expect(setTooltipOpen).toHaveBeenCalledWith(true);
    });

    it("should ignore click when toggleType is hover and the tooltip is already opened by hover", () => {
        const { setTooltipOpen, target } = renderTarget({
            toggleType: "hover",
            tooltipOpen: true,
            targetHovered: true,
        });

        fireEvent.click(target);

        expect(setTooltipOpen).not.toHaveBeenCalled();
    });

    it("should close the opened tooltip on Tab", () => {
        const { setTooltipOpen, target } = renderTarget({ tooltipOpen: true });

        fireEvent.keyDown(target, { key: "Tab", code: "Tab" });

        expect(setTooltipOpen).toHaveBeenCalledWith(false);
    });

    it("should not call setTooltipOpen on Tab when the tooltip is closed", () => {
        const { setTooltipOpen, target } = renderTarget({ tooltipOpen: false });

        fireEvent.keyDown(target, { key: "Tab", code: "Tab" });

        expect(setTooltipOpen).not.toHaveBeenCalled();
    });

    it("should ignore other keys", () => {
        const { setTooltipOpen, target } = renderTarget({ tooltipOpen: true });

        fireEvent.keyDown(target, { key: "Enter", code: "Enter" });

        expect(setTooltipOpen).not.toHaveBeenCalled();
    });

    it("should keep own handlers of the child element", () => {
        const onClick = vi.fn();
        const onKeyDown = vi.fn();
        const { target } = renderTarget({ onClick, onKeyDown });

        fireEvent.click(target);
        fireEvent.keyDown(target, { key: "Tab", code: "Tab" });

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onKeyDown).toHaveBeenCalledTimes(1);
    });
});
