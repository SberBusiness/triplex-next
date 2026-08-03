import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TooltipDesktopTip } from "../components/desktop/components/TooltipDesktopTip";
import { ETooltipDirection } from "../enums";

describe("TooltipDesktopTip", () => {
    it.each([
        [ETooltipDirection.UP, "up"],
        [ETooltipDirection.DOWN, "down"],
        [ETooltipDirection.LEFT, "left"],
        [ETooltipDirection.RIGHT, "right"],
    ])("should apply the modifier class for direction %s", (direction, expectedClassName) => {
        const { container } = render(<TooltipDesktopTip direction={direction} />);

        expect(container.firstElementChild).toHaveClass(expectedClassName);
    });

    it("should forward ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<TooltipDesktopTip direction={ETooltipDirection.UP} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
