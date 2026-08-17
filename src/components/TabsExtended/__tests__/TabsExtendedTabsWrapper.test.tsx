import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { TabsExtended } from "../TabsExtended";

/** Правая граница скрытого контейнера с дубликатами табов. */
const TABS_FAKE_RIGHT = 304;

/** Правая граница постороннего узла: за границей контейнера, чтобы он попал в ветку overflow. */
const STRAY_NODE_RIGHT = 400;

/** Правая граница каждого таба внутри скрытого контейнера. */
const TAB_RIGHT_BY_ID: Record<string, number> = {
    "tab-1": 100,
    "tab-2": 200,
    "tab-3": 400,
};

const TABS = [
    { id: "tab-1", label: "Таб 1" },
    { id: "tab-2", label: "Таб 2" },
    { id: "tab-3", label: "Таб 3" },
];

const createRect = (right: number): DOMRect =>
    ({
        width: right,
        height: 0,
        top: 0,
        left: 0,
        right,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
    }) as DOMRect;

interface IRenderOptions {
    tabs?: Array<{ id: string; label: string }>;
    wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    wrapperRef?: React.Ref<HTMLDivElement>;
    /** Дополнительный дочерний узел контейнера табов, помимо самих табов. */
    extraChild?: React.ReactNode;
    /** Вызывается на каждый рендер render-prop'а Dropdown с полученными id. */
    onRenderDropdown?: (dropdownItemsIds: string[]) => void;
}

const renderTabs = ({
    tabs = TABS,
    wrapperProps = {},
    wrapperRef,
    extraChild,
    onRenderDropdown,
}: IRenderOptions = {}) =>
    render(
        <TabsExtended selectedId="tab-1" onSelectTab={() => {}}>
            <TabsExtended.Content>
                <TabsExtended.Content.TabsWrapper ref={wrapperRef} {...wrapperProps}>
                    {tabs.map(({ id, label }) => (
                        <TabsExtended.Content.Tab key={id} id={id} data-testid={`real-${id}`} data-custom="marker">
                            {({ selected }) => (
                                <TabsExtended.Content.TabButton selected={selected}>
                                    {label}
                                </TabsExtended.Content.TabButton>
                            )}
                        </TabsExtended.Content.Tab>
                    ))}
                    {extraChild}
                </TabsExtended.Content.TabsWrapper>
                <TabsExtended.Content.DropdownWrapper data-testid="dropdown">
                    {({ dropdownItemsIds }) => {
                        onRenderDropdown?.(dropdownItemsIds);

                        return <button type="button">{dropdownItemsIds.join(",")}</button>;
                    }}
                </TabsExtended.Content.DropdownWrapper>
            </TabsExtended.Content>
        </TabsExtended>,
    );

const queryTabsFake = (container: HTMLElement) => container.querySelector<HTMLElement>(".tabsFake");
const queryTabsReal = (container: HTMLElement) => container.querySelector<HTMLElement>(".tabsReal");

describe("TabsExtendedTabsWrapper", () => {
    beforeEach(() => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
            if (this.classList.contains("tabsFake")) {
                return createRect(TABS_FAKE_RIGHT);
            }

            const tabId = this.getAttribute("data-tab-item-id");

            if (tabId !== null && this.closest(".tabsFake") !== null) {
                return createRect(TAB_RIGHT_BY_ID[tabId] ?? 0);
            }

            // Посторонний узел без атрибута таба: в скрытом контейнере он выходит за правую границу.
            if (this.tagName === "BUTTON" && this.parentElement?.classList.contains("tabsFake")) {
                return createRect(STRAY_NODE_RIGHT);
            }

            return createRect(0);
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("Should render hidden measuring container next to the visible one", () => {
        const { container } = renderTabs();

        const tabsFake = queryTabsFake(container);
        const tabsReal = queryTabsReal(container);

        expect(tabsFake).toBeInTheDocument();
        expect(tabsReal).toBeInTheDocument();
        // Скрытый контейнер обязан идти в разметке раньше отображаемого.
        expect(tabsFake?.compareDocumentPosition(tabsReal!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it("Should duplicate tabs into measuring container without data-attributes of consumer", () => {
        const { container } = renderTabs();

        const fakeTabs = queryTabsFake(container)!.querySelectorAll("[data-tab-item-id]");

        expect(fakeTabs).toHaveLength(TABS.length);
        fakeTabs.forEach((tab) => {
            expect(tab).not.toHaveAttribute("data-custom");
            expect(tab).not.toHaveAttribute("data-testid");
            expect(tab).not.toHaveAttribute("id");
        });

        expect(queryTabsReal(container)!.querySelectorAll("[data-custom]")).toHaveLength(TABS.length);
    });

    it("Should move tabs that do not fit into dropdown", () => {
        const { container, getByTestId } = renderTabs();

        const tabsReal = queryTabsReal(container)!;

        expect(getByTestId("real-tab-1")).not.toHaveClass("hidden");
        expect(getByTestId("real-tab-2")).not.toHaveClass("hidden");
        expect(getByTestId("real-tab-3")).toHaveClass("hidden");
        // У скрытого таба id снимается, чтобы в DOM не было двух элементов с одинаковым id.
        expect(getByTestId("real-tab-3")).not.toHaveAttribute("id");
        expect(tabsReal.querySelectorAll("[data-tab-item-id]")).toHaveLength(TABS.length);

        const dropdown = getByTestId("dropdown");

        expect(dropdown).not.toHaveAttribute("hidden");
        expect(dropdown).toHaveTextContent("tab-3");
    });

    it("Should keep all tabs inline when they fit", () => {
        const { getByTestId } = renderTabs({ tabs: TABS.slice(0, 2) });

        expect(getByTestId("real-tab-1")).not.toHaveClass("hidden");
        expect(getByTestId("real-tab-2")).not.toHaveClass("hidden");
        expect(getByTestId("dropdown")).toHaveAttribute("hidden");
    });

    it("Should ignore child without tab attribute when measuring", () => {
        const onRenderDropdown = vi.fn();
        const { getByTestId } = renderTabs({
            tabs: TABS.slice(0, 2),
            // Кнопка положена в контейнер напрямую, без Tab, поэтому не получает data-tab-item-id.
            extraChild: <TabsExtended.Content.TabButton selected={false}>Лишний узел</TabsExtended.Content.TabButton>,
            onRenderDropdown,
        });

        // Табы помещаются, а посторонний узел не должен ни открыть Dropdown, ни попасть в него как null.
        expect(getByTestId("dropdown")).toHaveAttribute("hidden");
        expect(onRenderDropdown).toHaveBeenCalled();
        onRenderDropdown.mock.calls.forEach(([dropdownItemsIds]) => {
            expect(dropdownItemsIds).not.toContain(null);
        });
    });

    it("Should show visible container after measuring container is mounted", () => {
        const { container } = renderTabs();

        expect(queryTabsReal(container)).not.toHaveClass("hidden");
    });

    it("Should merge custom className into visible container", () => {
        const { container } = renderTabs({ wrapperProps: { className: "custom-class" } });

        expect(queryTabsReal(container)).toHaveClass("tabsReal", "custom-class");
    });

    it("Should forward ref to visible container", () => {
        const ref = React.createRef<HTMLDivElement>();
        const { container } = renderTabs({ wrapperRef: ref });

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(queryTabsReal(container));
    });
});
