import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Island } from "../Island";
import { EIslandType } from "../enums";

describe("Island", () => {
    test("applies default classes for type, borderRadius and paddingSize", () => {
        const { container } = render(<Island />);
        const root = container.firstElementChild as HTMLElement | null;
        expect(root).toBeTruthy();
        expect(root?.classList.contains("island")).toBe(true);
        expect(root?.classList.contains("type1")).toBe(true);
        expect(root?.classList.contains("borderRadius16")).toBe(true);
        expect(root?.classList.contains("padding16")).toBe(true);
    });

    test("applies classes based on props", () => {
        const { container } = render(<Island type={EIslandType.TYPE_2} borderRadius={16} paddingSize={16} />);
        const root = container.firstElementChild as HTMLElement | null;
        expect(root?.classList.contains("type2")).toBe(true);
        expect(root?.classList.contains("borderRadius16")).toBe(true);
        expect(root?.classList.contains("padding16")).toBe(true);
    });

    test("forwards ref to root div", () => {
        const ref = createRef<HTMLDivElement>();
        const { container } = render(<Island ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        const root = container.firstElementChild as HTMLDivElement | null;
        expect(ref.current).toBe(root);
    });

    test("supports native HTML attributes and events", () => {
        const handleClick = vi.fn();
        render(<Island role="region" aria-label="island" tabIndex={0} onClick={handleClick} />);
        const region = screen.getByRole("region", { name: "island" });
        expect(region).toBeInTheDocument();
        fireEvent.click(region);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
