import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
    TabsExtendedDropdownWrapper,
    ITabsExtendedDropdownWrapperProvideProps,
} from "../components/TabsExtendedDropdownWrapper";
import { TabsExtendedContext, ITabsExtendedContext } from "../TabsExtendedContext";
import { ETabsExtendedType } from "../enums";

const createContextValue = (overrides: Partial<ITabsExtendedContext> = {}): ITabsExtendedContext => ({
    dropdownItemsIds: [],
    dropdownRef: { current: null },
    inlineItemsIds: [],
    onSelectTab: () => {},
    selectedId: "",
    setDropdownItemsIds: () => {},
    setInlineItemsIds: () => {},
    type: ETabsExtendedType.TYPE_1,
    ...overrides,
});

const getWrapper = () => screen.getByTestId("dropdown-wrapper");

describe("TabsExtendedDropdownWrapper", () => {
    it("Should be hidden while all tabs fit into the row", () => {
        render(
            <TabsExtendedContext.Provider value={createContextValue()}>
                <TabsExtendedDropdownWrapper data-testid="dropdown-wrapper">
                    {() => <button type="button">Ещё</button>}
                </TabsExtendedDropdownWrapper>
            </TabsExtendedContext.Provider>,
        );

        expect(getWrapper()).toHaveAttribute("hidden");
        expect(getWrapper()).toHaveClass("tabsExtendedDropdown");
    });

    it("Should be visible when there are tabs in dropdown", () => {
        render(
            <TabsExtendedContext.Provider value={createContextValue({ dropdownItemsIds: ["tab-3"] })}>
                <TabsExtendedDropdownWrapper data-testid="dropdown-wrapper">
                    {() => <button type="button">Ещё</button>}
                </TabsExtendedDropdownWrapper>
            </TabsExtendedContext.Provider>,
        );

        expect(getWrapper()).not.toHaveAttribute("hidden");
    });

    it("Should pass dropdown ids and onSelectTab into render prop", () => {
        const onSelectTab = vi.fn();
        const provided: ITabsExtendedDropdownWrapperProvideProps[] = [];

        render(
            <TabsExtendedContext.Provider
                value={createContextValue({ dropdownItemsIds: ["tab-2", "tab-3"], onSelectTab })}
            >
                <TabsExtendedDropdownWrapper data-testid="dropdown-wrapper">
                    {(props) => {
                        provided.push(props);

                        return null;
                    }}
                </TabsExtendedDropdownWrapper>
            </TabsExtendedContext.Provider>,
        );

        const last = provided[provided.length - 1];

        expect(last.dropdownItemsIds).toEqual(["tab-2", "tab-3"]);

        last.onSelectTab("tab-3");

        expect(onSelectTab).toHaveBeenCalledWith("tab-3");
    });

    it("Should merge custom className into root element", () => {
        render(
            <TabsExtendedContext.Provider value={createContextValue()}>
                <TabsExtendedDropdownWrapper className="custom-class" data-testid="dropdown-wrapper">
                    {() => null}
                </TabsExtendedDropdownWrapper>
            </TabsExtendedContext.Provider>,
        );

        expect(getWrapper()).toHaveClass("tabsExtendedDropdown", "custom-class");
    });

    it("Should set both context ref and forwarded ref to the same element", () => {
        const ref = React.createRef<HTMLDivElement>();
        const contextValue = createContextValue();

        render(
            <TabsExtendedContext.Provider value={contextValue}>
                <TabsExtendedDropdownWrapper ref={ref} data-testid="dropdown-wrapper">
                    {() => null}
                </TabsExtendedDropdownWrapper>
            </TabsExtendedContext.Provider>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getWrapper());
        expect(contextValue.dropdownRef.current).toBe(getWrapper());
    });
});
