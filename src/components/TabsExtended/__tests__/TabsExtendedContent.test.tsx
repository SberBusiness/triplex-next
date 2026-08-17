import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TabsExtendedContent } from "../components/TabsExtendedContent";
import { TabsExtendedTabsWrapper } from "../components/TabsExtendedTabsWrapper";
import { TabsExtendedTab } from "../components/TabsExtendedTab";
import { TabsExtendedTabButton } from "../components/TabsExtendedTabButton";
import { TabsExtendedDropdownWrapper } from "../components/TabsExtendedDropdownWrapper";

const getContent = () => screen.getByTestId("content");

describe("TabsExtendedContent", () => {
    it("Should render children with default size MD", () => {
        render(<TabsExtendedContent data-testid="content">Содержимое</TabsExtendedContent>);

        expect(getContent()).toHaveClass("tabsExtendedContent", "md");
        expect(getContent()).toHaveTextContent("Содержимое");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should apply class for size %s", (size, className) => {
        render(
            <TabsExtendedContent size={size} data-testid="content">
                Содержимое
            </TabsExtendedContent>,
        );

        expect(getContent()).toHaveClass(className);
    });

    it("Should merge custom className into root element", () => {
        render(
            <TabsExtendedContent className="custom-class" data-testid="content">
                Содержимое
            </TabsExtendedContent>,
        );

        expect(getContent()).toHaveClass("tabsExtendedContent", "custom-class");
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <TabsExtendedContent ref={ref} data-testid="content">
                Содержимое
            </TabsExtendedContent>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getContent());
    });

    it("Should expose subcomponents as static members", () => {
        expect(TabsExtendedContent.TabsWrapper).toBe(TabsExtendedTabsWrapper);
        expect(TabsExtendedContent.Tab).toBe(TabsExtendedTab);
        expect(TabsExtendedContent.TabButton).toBe(TabsExtendedTabButton);
        expect(TabsExtendedContent.DropdownWrapper).toBe(TabsExtendedDropdownWrapper);
    });
});
