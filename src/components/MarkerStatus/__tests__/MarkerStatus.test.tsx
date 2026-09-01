import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { MarkerStatus } from "../MarkerStatus";
import { EMarkerStatus } from "../../Marker/enums";
import { EComponentSize } from "../../../enums/EComponentSize";

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

const getMarkerStatus = () => screen.getByTestId("marker-status");
const getDescription = () => screen.getByText("Test description");
const getMarker = () => document.querySelector(".marker");

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

    it("Should render children in Text of size B4 for MD and B3 for LG", () => {
        const { rerender } = render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const title = screen.getByText("Test Status");
        expect(title).toHaveClass("text");
        expect(title).toHaveClass("b4");

        rerender(
            <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        expect(screen.getByText("Test Status")).toHaveClass("b3");
    });

    it("Should render description as secondary Caption C1 for MD size", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} description="Test description" data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const description = getDescription();

        expect(description).toHaveClass("caption");
        expect(description).toHaveClass("c1");
        expect(description).toHaveClass("secondary");
    });

    it("Should render description as secondary Text B4 for LG size", () => {
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

        const description = getDescription();

        expect(description).toHaveClass("text");
        expect(description).toHaveClass("b4");
        expect(description).toHaveClass("secondary");
    });

    it("Should not render description when it is not provided", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const contentContainer = getMarkerStatus().querySelector(".contentContainer");

        expect(contentContainer?.children).toHaveLength(1);
    });

    it("Should render description node", () => {
        render(
            <MarkerStatus
                status={EMarkerStatus.SUCCESS}
                description={<span data-testid="description-node">Node</span>}
                data-testid="marker-status"
            >
                Test Status
            </MarkerStatus>,
        );

        expect(screen.getByTestId("description-node")).toBeInTheDocument();
    });

    it("Should pass status and size to the Marker", () => {
        const { rerender } = render(
            <MarkerStatus status={EMarkerStatus.ERROR} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        expect(getMarker()).toHaveClass("error");
        expect(getMarker()).toHaveClass("md");

        rerender(
            <MarkerStatus status={EMarkerStatus.WAITING} size={EComponentSize.LG} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        expect(getMarker()).toHaveClass("waiting");
        expect(getMarker()).toHaveClass("lg");
    });

    it("Should merge custom className with base classes", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} className="custom-class" data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();

        expect(markerStatus).toHaveClass("custom-class");
        expect(markerStatus).toHaveClass("markerStatus");
        expect(markerStatus).toHaveClass("md");
    });

    it("Should spread rest props on the root element", () => {
        render(
            <MarkerStatus
                status={EMarkerStatus.SUCCESS}
                id="marker-status-id"
                role="status"
                aria-label="Status"
                data-testid="marker-status"
            >
                Test Status
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();

        expect(markerStatus).toHaveAttribute("id", "marker-status-id");
        expect(markerStatus).toHaveAttribute("role", "status");
        expect(markerStatus).toHaveAttribute("aria-label", "Status");
    });

    it("Should set data-tx attribute and not let rest props override it", () => {
        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} data-tx="overridden" data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        const markerStatus = getMarkerStatus();

        expect(markerStatus).not.toHaveAttribute("data-tx", "overridden");
        expect(markerStatus).toHaveAttribute("data-tx", process.env.npm_package_version);
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <MarkerStatus status={EMarkerStatus.SUCCESS} ref={ref} data-testid="marker-status">
                Test Status
            </MarkerStatus>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getMarkerStatus());
    });

    it("Should have displayName", () => {
        expect(MarkerStatus.displayName).toBe("MarkerStatus");
    });
});
