import React from "react";
import { render, screen } from "@testing-library/react";
import { MarkerStatus } from "@sberbusiness/triplex-next/components/MarkerStatus/MarkerStatus";
import { EMarkerSize, EMarkerStatus } from "@sberbusiness/triplex-next/components/Marker/enums";

const getMarkerStatusText = () => screen.getByText("Status text");
const getMarkerStatusDescription = () => screen.queryByText("Description");
const getMarkerStatus = () => getMarkerStatusText().closest("div");
const getMarker = () => getMarkerStatus()?.querySelector(".marker");

describe("MarkerStatus", () => {
    it("Should render with default props", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} description="Description">
                Status text
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();
        expect(markerStatus).toBeInTheDocument();
        expect(markerStatus).toHaveClass("markerStatus");
        expect(markerStatus).toHaveClass("md");

        const marker = getMarker();
        expect(marker).toBeInTheDocument();
        expect(marker).toHaveClass("md");

        const description = getMarkerStatusDescription();
        expect(description).toBeInTheDocument();
    });

    it("Should apply size classes", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} size={EMarkerSize.LG}>
                Status text
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();
        expect(markerStatus).toBeInTheDocument();
        expect(markerStatus).toHaveClass("lg");

        const marker = getMarker();
        expect(marker).toBeInTheDocument();
        expect(marker).toHaveClass("lg");

        const description = getMarkerStatusDescription();
        expect(description).not.toBeInTheDocument();
    });

    it("Should apply status classes", () => {
        render(<MarkerStatus status={EMarkerStatus.WARNING}>Status text</MarkerStatus>);

        const markerStatus = getMarkerStatus();
        expect(markerStatus).toBeInTheDocument();
        expect(markerStatus).toHaveClass("warning");

        const marker = getMarker();
        expect(marker).toBeInTheDocument();
        expect(marker).toHaveClass("warning");
    });
});
