import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IslandAccordion } from "../IslandAccordion";
import { EComponentSize } from "../../../enums/EComponentSize";

const getIslandAccordion = () => screen.getByRole("list");

describe("IslandAccordion", () => {
    it("Should render with default props", () => {
        render(
            <IslandAccordion>
                <IslandAccordion.Item title="First item">First content</IslandAccordion.Item>
                <IslandAccordion.Item title="Second item" id="custom-id">
                    Second content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        const islandAccordion = getIslandAccordion();

        expect(islandAccordion).toBeInTheDocument();
        expect(islandAccordion).toHaveClass("islandAccordion");
        expect(islandAccordion).toHaveClass("md");
    });

    it("Should apply size classes", () => {
        render(
            <IslandAccordion size={EComponentSize.SM}>
                <IslandAccordion.Item title="First item">First content</IslandAccordion.Item>
            </IslandAccordion>,
        );

        const islandAccordion = getIslandAccordion();

        expect(islandAccordion).toHaveClass("sm");
    });

    it("Should compose onToggle handlers from child item and accordion props", () => {
        const parentOnToggle = vi.fn();
        const childOnToggle = vi.fn();

        render(
            <IslandAccordion
                onToggle={(...args) => {
                    parentOnToggle(...args);
                }}
            >
                <IslandAccordion.Item
                    id="item-id"
                    title="Toggle item"
                    onToggle={(...args) => {
                        childOnToggle(...args);
                    }}
                >
                    Content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        fireEvent.click(screen.getByRole("button"));

        expect(childOnToggle).toHaveBeenCalledWith(true, "item-id");
        expect(parentOnToggle).toHaveBeenCalledWith(true, "item-id");
    });

    it("Should compose onRemove handlers from child item and accordion props", () => {
        const parentOnRemove = vi.fn();
        const childOnRemove = vi.fn();

        render(
            <IslandAccordion
                onRemove={(...args) => {
                    parentOnRemove(...args);
                }}
            >
                <IslandAccordion.Item
                    id="removable"
                    title="Removable item"
                    onRemove={(...args) => {
                        childOnRemove(...args);
                    }}
                >
                    Content
                </IslandAccordion.Item>
            </IslandAccordion>,
        );

        fireEvent.click(screen.getByTitle("Удалить"));

        expect(childOnRemove).toHaveBeenCalledWith("removable");
        expect(parentOnRemove).toHaveBeenCalledWith("removable");
    });
});
