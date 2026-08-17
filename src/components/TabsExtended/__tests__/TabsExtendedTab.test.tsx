import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TabsExtendedTab, ITabsExtendedItemProvideProps } from "../components/TabsExtendedTab";
import { TabsExtendedTabContext } from "../components/TabsExtendedTabContext";
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

interface IRenderTabOptions {
    context?: Partial<ITabsExtendedContext>;
    isFakeTab?: boolean;
    tabProps?: Partial<React.ComponentProps<typeof TabsExtendedTab>>;
    ref?: React.Ref<HTMLSpanElement>;
}

const renderTab = ({ context = {}, isFakeTab = false, tabProps = {}, ref }: IRenderTabOptions = {}) => {
    const provided: ITabsExtendedItemProvideProps[] = [];

    const result = render(
        <TabsExtendedContext.Provider value={createContextValue(context)}>
            <TabsExtendedTabContext.Provider value={{ isFakeTab }}>
                <TabsExtendedTab id="tab-1" ref={ref} data-testid="tab" {...tabProps}>
                    {(props) => {
                        provided.push(props);

                        return <button type="button">Таб</button>;
                    }}
                </TabsExtendedTab>
            </TabsExtendedTabContext.Provider>
        </TabsExtendedContext.Provider>,
    );

    return { ...result, provided };
};

// role="presentation" убирает элемент из дерева доступности, поэтому семантического запроса к нему нет.
const getTab = () => screen.getByTestId("tab");

describe("TabsExtendedTab", () => {
    it("Should render span with id and data-tab-item-id", () => {
        renderTab();

        const tab = getTab();

        expect(tab.tagName).toBe("SPAN");
        expect(tab).toHaveAttribute("role", "presentation");
        expect(tab).toHaveAttribute("id", "tab-1");
        expect(tab).toHaveAttribute("data-tab-item-id", "tab-1");
        expect(tab).toHaveClass("tabsExtendedTab");
        expect(tab).not.toHaveClass("hidden");
    });

    it("Should hide tab and drop its id when tab is shown in dropdown", () => {
        renderTab({ context: { dropdownItemsIds: ["tab-1"] } });

        const tab = getTab();

        expect(tab).toHaveClass("hidden");
        expect(tab).not.toHaveAttribute("id");
        // Атрибут для замеров остаётся: по нему TabsWrapper находит таб в скрытом контейнере.
        expect(tab).toHaveAttribute("data-tab-item-id", "tab-1");
    });

    it("Should provide selected flag from context", () => {
        const { provided } = renderTab({ context: { selectedId: "tab-1" } });

        expect(provided[provided.length - 1].selected).toBe(true);
    });

    it("Should provide inline position flags from context", () => {
        const { provided } = renderTab({ context: { inlineItemsIds: ["tab-1", "tab-2"] } });
        const last = provided[provided.length - 1];

        expect(last.isFirstInlineTab).toBe(true);
        expect(last.isLastInlineTab).toBe(false);
    });

    it("Should provide isLastInlineTab for the last inline tab", () => {
        const { provided } = renderTab({ context: { inlineItemsIds: ["tab-0", "tab-1"] } });
        const last = provided[provided.length - 1];

        expect(last.isFirstInlineTab).toBe(false);
        expect(last.isLastInlineTab).toBe(true);
    });

    it("Should call onSelectTab with tab id and preserve custom onClick", async () => {
        const user = userEvent.setup();
        const onSelectTab = vi.fn();
        const onClick = vi.fn();

        renderTab({ context: { onSelectTab }, tabProps: { onClick } });

        await user.click(getTab());

        expect(onSelectTab).toHaveBeenCalledTimes(1);
        expect(onSelectTab).toHaveBeenCalledWith("tab-1");
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Should not handle click and not set id for fake tab", async () => {
        const user = userEvent.setup();
        const onSelectTab = vi.fn();

        renderTab({ context: { onSelectTab }, isFakeTab: true });

        const tab = getTab();

        expect(tab).not.toHaveAttribute("id");

        await user.click(tab);

        expect(onSelectTab).not.toHaveBeenCalled();
    });

    it("Should merge custom className into root element", () => {
        renderTab({ tabProps: { className: "custom-class" } });

        expect(getTab()).toHaveClass("tabsExtendedTab", "custom-class");
    });

    it("Should forward ref to root element", () => {
        const ref = React.createRef<HTMLSpanElement>();

        renderTab({ ref });

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(getTab());
    });

    it("Should not forward ref for fake tab", () => {
        const ref = React.createRef<HTMLSpanElement>();

        renderTab({ ref, isFakeTab: true });

        expect(ref.current).toBeNull();
    });
});
