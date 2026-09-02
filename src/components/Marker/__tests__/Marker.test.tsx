import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Marker } from "../Marker";
import { EMarkerStatus } from "../enums";
import { EComponentSize } from "../../../enums/EComponentSize";

describe("Marker", () => {
    it.each([
        [EMarkerStatus.SUCCESS, "success"],
        [EMarkerStatus.ERROR, "error"],
        [EMarkerStatus.WARNING, "warning"],
        [EMarkerStatus.WAITING, "waiting"],
    ])("should apply status class for %s", (status, className) => {
        const { container } = render(<Marker status={status} size={EComponentSize.MD} />);

        expect(container.firstChild).toHaveClass(className);
    });

    // Разметку и полную матрицу размеров покрывает BadgeDot.test.tsx — здесь только то,
    // что Marker не съедает size по дороге в Badge.Dot и не подменяет его разметку.
    it("should pass size through to Badge.Dot", () => {
        const { container } = render(<Marker status={EMarkerStatus.SUCCESS} size={EComponentSize.SM} />);

        expect(container.firstChild).toHaveClass("badgeDot");
        expect(container.firstChild).toHaveClass("sm");
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
