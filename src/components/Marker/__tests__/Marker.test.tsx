import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marker } from "../Marker";
import { EMarkerStatus } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";

describe("Marker", () => {
    it("should render as an empty span element", () => {
        const { container } = render(<Marker status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} />);
        const marker = container.firstChild;

        expect(marker).toBeInTheDocument();
        expect(marker?.nodeName).toBe("SPAN");
        expect(marker?.childNodes).toHaveLength(0);
    });

    it("should apply base classes of Marker and Badge.Dot", () => {
        const { container } = render(<Marker status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} />);

        expect(container.firstChild).toHaveClass("marker");
        expect(container.firstChild).toHaveClass("badgeDot");
    });

    it.each([
        [EMarkerStatus.SUCCESS, "success"],
        [EMarkerStatus.ERROR, "error"],
        [EMarkerStatus.WARNING, "warning"],
        [EMarkerStatus.WAITING, "waiting"],
    ])("should apply status class for %s", (status, className) => {
        const { container } = render(<Marker status={status} size={EComponentSize.MD} />);

        expect(container.firstChild).toHaveClass(className);
    });

    it("should pass size through to Badge.Dot", () => {
        const { container: sm } = render(<Marker status={EMarkerStatus.SUCCESS} size={EComponentSize.SM} />);
        const { container: md } = render(<Marker status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} />);
        const { container: lg } = render(<Marker status={EMarkerStatus.SUCCESS} size={EComponentSize.LG} />);

        expect(sm.firstChild).toHaveClass("sm");
        expect(md.firstChild).toHaveClass("md");
        expect(lg.firstChild).toHaveClass("lg");
    });

    it("should merge custom className with the base classes", () => {
        const { container } = render(
            <Marker status={EMarkerStatus.ERROR} size={EComponentSize.MD} className="custom-class" />,
        );
        const marker = container.firstChild;

        expect(marker).toHaveClass("custom-class");
        expect(marker).toHaveClass("marker");
        expect(marker).toHaveClass("error");
    });

    it("should forward ref to the root span element", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<Marker status={EMarkerStatus.SUCCESS} size={EComponentSize.MD} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toHaveClass("marker");
    });

    it("should spread rest props to the root element", () => {
        render(
            <Marker
                status={EMarkerStatus.WAITING}
                size={EComponentSize.MD}
                data-testid="marker"
                id="marker-id"
                role="img"
                aria-label="В обработке"
            />,
        );
        const marker = screen.getByTestId("marker");

        expect(marker).toHaveAttribute("id", "marker-id");
        expect(marker).toHaveAttribute("role", "img");
        expect(marker).toHaveAttribute("aria-label", "В обработке");
    });

    it("should have displayName", () => {
        expect(Marker.displayName).toBe("Marker");
    });
});
