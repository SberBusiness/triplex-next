import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MarkerStatus } from "../MarkerStatus";
import { EMarkerStatus } from "../../Marker/enums";
import { EComponentSize } from "../../../enums/EComponentSize";

const getMarkerStatus = () => screen.getByTestId("marker-status");
const getDescription = () => screen.getByText("Test description");

describe("MarkerStatus", () => {
    it("Should render correctly with default props", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();
        expect(markerStatus).toBeInTheDocument();
        expect(markerStatus).toHaveClass("markerStatus");
        expect(markerStatus).toHaveClass("success");
        expect(markerStatus).toHaveClass("md");
    });

    it("Should render description when provided", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} description="Test description" data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const description = getDescription();

        expect(description).toBeInTheDocument();
        expect(description).toHaveClass("caption");
    });

    it("Should correct apply LG size", () => {
        render(
            <MarkerStatus
                status={EMarkerStatus.SUCCESS}
                description="Test description"
                size={EComponentSize.LG}
                data-testid="marker-status"
            >
                Test Status
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();
        const description = getDescription();

        expect(markerStatus).toHaveClass("lg");
        expect(description).toHaveClass("text");
    });

    it("Should correct apply status classes", () => {
        const { rerender } = render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();
        expect(markerStatus).toHaveClass("success");

        rerender(
            <MarkerStatus status={EMarkerStatus.ERROR} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        expect(markerStatus).toHaveClass("error");

        rerender(
            <MarkerStatus status={EMarkerStatus.WARNING} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        expect(markerStatus).toHaveClass("warning");

        rerender(
            <MarkerStatus status={EMarkerStatus.WAITING} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        expect(markerStatus).toHaveClass("waiting");
    });
});
