import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Spoiler } from "../Spoiler";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const getSpoiler = () => screen.getByTestId("spoiler");
const getToggleButton = () => screen.getByRole("button");

describe("Spoiler", () => {
    it("Should render with default props", () => {
        render(
            <Spoiler labelExpand="Развернуть" data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const spoiler = getSpoiler();
        const button = getToggleButton();

        expect(spoiler).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Развернуть");
        expect(spoiler).toHaveClass("spoiler");
        expect(spoiler).toHaveClass("md");
    });

    it("Should apply size classes correctly", () => {
        const { rerender } = render(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.SM} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        let spoiler = getSpoiler();
        expect(spoiler).toHaveClass("sm");

        rerender(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.MD} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        spoiler = getSpoiler();
        expect(spoiler).toHaveClass("md");

        rerender(
            <Spoiler labelExpand="Развернуть" size={EComponentSize.LG} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        spoiler = getSpoiler();
        expect(spoiler).toHaveClass("lg");
    });

    it("Should apply opened class when expanded", () => {
        render(
            <Spoiler labelExpand="Развернуть" expanded={true} toggle={vi.fn()} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const spoiler = getSpoiler();
        expect(spoiler).toHaveClass("opened");
    });

    it("Should show labelCollapse when expanded", () => {
        render(
            <Spoiler
                labelExpand="Развернуть"
                labelCollapse="Свернуть"
                expanded={true}
                toggle={vi.fn()}
                data-testid="spoiler"
            >
                Content
            </Spoiler>,
        );
        const button = getToggleButton();
        expect(button).toHaveTextContent("Свернуть");
    });

    it("Should call onToggle callback", () => {
        const onToggle = vi.fn();
        render(
            <Spoiler labelExpand="Развернуть" onToggle={onToggle} data-testid="spoiler">
                Content
            </Spoiler>,
        );
        const button = getToggleButton();

        fireEvent.click(button);
        expect(onToggle).toHaveBeenCalledTimes(1);
        expect(onToggle).toHaveBeenCalledWith(true);
    });
});
