import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandAccordion } from "../IslandAccordion";
import { EComponentSize } from "../../../enums/EComponentSize";

const getIslandAccordion = () => screen.getByRole("list");

describe("IslandAccordion", () => {
    it("Should render with default props", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item" id="first-item" num={1}>
                    First content
                </IslandAccordion.Item>
                <IslandAccordion.Item title="Second item" id="custom-id" num={2}>
                    Second content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        const islandAccordion = getIslandAccordion();

        expect(islandAccordion).toBeInTheDocument();
        expect(islandAccordion).toHaveClass("islandAccordion");
        expect(islandAccordion.firstChild).toHaveClass("md");
    });

    it("Should apply size classes", () => {
        render(
            <IslandAccordion size={EComponentSize.SM}>
                <IslandAccordion.Item title="First item" id="first-item" num={1}>
                    First content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        const islandAccordion = getIslandAccordion();

        expect(islandAccordion.firstChild).toHaveClass("sm");
    });
});
