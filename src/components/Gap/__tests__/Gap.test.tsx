import React from "react";
import { render, screen } from "@testing-library/react";
import { Gap, TGapSize } from "@sberbusiness/triplex-next/components";

describe("Gap", () => {
    it("applying a class correctly", () => {
        const className = "test";
        render(<Gap size={4} className={className} />);

        const element = screen.getByRole("presentation");
        expect(element).toHaveClass(className);
    });

    it.each<TGapSize>([4, 8, 12, 16, 24, 32, 64, 128])("applies CSS class for size=%i", (size) => {
        render(<Gap size={size} />);

        const element = screen.getByRole("presentation");
        expect(element).toHaveClass(`size${size}`);
    });

    it("forwards ref to the root div element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<Gap size={16} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveAttribute("role", "presentation");
    });

    it("renders with role=presentation", () => {
        render(<Gap size={16} />);

        expect(screen.getByRole("presentation")).toBeInTheDocument();
    });

    it("passes additional HTML attributes", () => {
        render(<Gap size={4} aria-hidden="true" data-analytics="test" />);

        const element = screen.getByRole("presentation", { hidden: true });
        expect(element).toHaveAttribute("aria-hidden", "true");
        expect(element).toHaveAttribute("data-analytics", "test");
    });

    it("forwards custom style prop to the root element", () => {
        render(<Gap size={16} style={{ background: "rgb(0, 0, 0)" }} />);

        const element = screen.getByRole("presentation");
        expect(element).toHaveStyle({ background: "rgb(0, 0, 0)" });
    });
});
