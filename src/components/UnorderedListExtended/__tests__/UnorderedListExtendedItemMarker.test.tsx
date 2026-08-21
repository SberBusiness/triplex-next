import React from "react";
import { render, screen } from "@testing-library/react";
import { UnorderedListExtendedItemMarker } from "../UnorderedListExtendedItemMarker";

beforeAll(() => {
    vi.stubEnv("npm_package_version", "1.0.0-test");
});

afterAll(() => {
    vi.unstubAllEnvs();
});

describe("UnorderedListExtendedItemMarker", () => {
    it("renders the default dot when no children are passed", () => {
        render(<UnorderedListExtendedItemMarker data-testid="marker" />);

        const wrapper = screen.getByTestId("marker");

        expect(wrapper.tagName).toBe("SPAN");
        expect(wrapper.children).toHaveLength(1);
        expect(wrapper.firstElementChild).toHaveClass("marker");
    });

    it("renders custom children instead of the default dot", () => {
        render(
            <UnorderedListExtendedItemMarker data-testid="marker">
                <span data-testid="custom">★</span>
            </UnorderedListExtendedItemMarker>,
        );

        const wrapper = screen.getByTestId("marker");

        expect(wrapper.children).toHaveLength(1);
        expect(wrapper.firstElementChild).toBe(screen.getByTestId("custom"));
    });

    it("treats null children as content, not as a missing marker", () => {
        render(<UnorderedListExtendedItemMarker data-testid="marker">{null}</UnorderedListExtendedItemMarker>);

        // Дефолтная точка рисуется только при children === undefined.
        expect(screen.getByTestId("marker")).toBeEmptyDOMElement();
    });

    it("merges custom className into the wrapper", () => {
        render(<UnorderedListExtendedItemMarker data-testid="marker" className="custom-marker" />);

        const wrapper = screen.getByTestId("marker");

        expect(wrapper).toHaveClass("custom-marker");
        expect(wrapper).toHaveClass("markerWrapper");
    });

    it("passes through HTML and data attributes", () => {
        render(<UnorderedListExtendedItemMarker data-testid="marker" aria-hidden="true" id="marker-id" />);

        const wrapper = screen.getByTestId("marker");

        expect(wrapper).toHaveAttribute("id", "marker-id");
        expect(wrapper).toHaveAttribute("aria-hidden", "true");
        expect(wrapper).toHaveAttribute("data-tx", "1.0.0-test");
    });

    it("forwards ref to the wrapper span", () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(<UnorderedListExtendedItemMarker data-testid="marker" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(screen.getByTestId("marker"));
    });
});
