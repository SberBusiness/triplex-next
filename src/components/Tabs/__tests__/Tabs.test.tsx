import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tabs, ITabsProps } from "../Tabs";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETabsExtendedType } from "@sberbusiness/triplex-next/components/TabsExtended";

const getTabs = () => screen.getByTestId("tabs");
const getTab = () => screen.getByRole("button");

/** Доступное имя dropdown-кнопки: по нему она отличается от кнопок табов, когда те остаются в строке. */
const DROPDOWN_BUTTON_LABEL = "Другие вкладки";

const getDropdownButton = () => screen.getByRole("button", { name: DROPDOWN_BUTTON_LABEL });

/** Правая граница скрытого контейнера с дубликатами табов. */
const TABS_FAKE_RIGHT = 304;

/** Правая граница каждого таба внутри скрытого контейнера: tab-3 не помещается и уезжает в dropdown. */
const TAB_RIGHT_BY_ID: Record<string, number> = {
    "tab-1": 100,
    "tab-2": 200,
    "tab-3": 400,
};

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

describe("Tabs", () => {
    const mockTabs = [
        { id: "tab-1", label: "Tab 1" },
        { id: "tab-2", label: "Tab 2" },
        { id: "tab-3", label: "Tab 3" },
    ];

    const defaultProps: ITabsProps = {
        tabs: mockTabs,
        selectedId: "tab-1",
        onSelectTab: vi.fn(),
    };

    it("Should render with default props", () => {
        render(<Tabs {...defaultProps} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(tab1).toHaveClass("md");
    });

    it("Should render with size SM", () => {
        render(<Tabs {...defaultProps} size={EComponentSize.SM} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(tab1).toHaveClass("sm");
    });

    it("Should render with size LG", () => {
        render(<Tabs {...defaultProps} size={EComponentSize.LG} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(tab1).toHaveClass("lg");
    });

    it("Should render with type TYPE_2", () => {
        render(<Tabs {...defaultProps} type={ETabsExtendedType.TYPE_2} data-testid="tabs" />);

        const tabs = getTabs();
        const tab1 = getTab();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type2");
        expect(tab1).toHaveClass("md");
    });

    describe("Dropdown button", () => {
        // Размеры замеряются через getBoundingClientRect, в jsdom они нулевые — без мока в dropdown
        // уезжают все табы и проверить таб, оставшийся в строке, невозможно.
        beforeEach(() => {
            vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
                if (this.classList.contains("tabsFake")) {
                    return createRect(TABS_FAKE_RIGHT);
                }

                const tabId = this.getAttribute("data-tab-item-id");

                if (tabId !== null && this.closest(".tabsFake") !== null) {
                    return createRect(TAB_RIGHT_BY_ID[tabId] ?? 0);
                }

                return createRect(0);
            });
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        const renderTabs = (props: Partial<ITabsProps> = {}) =>
            render(
                <Tabs
                    {...defaultProps}
                    {...props}
                    buttonDropdownAttributes={{
                        "aria-label": DROPDOWN_BUTTON_LABEL,
                        ...props.buttonDropdownAttributes,
                    }}
                    data-testid="tabs"
                />,
            );

        it("Should highlight button of type TYPE_1 when selected tab is hidden in dropdown", () => {
            renderTabs({ selectedId: "tab-3" });

            const dropdownButton = getDropdownButton();

            expect(dropdownButton).toHaveClass("type1");
            expect(dropdownButton).toHaveClass("selected");
        });

        it("Should highlight button of type TYPE_2 when selected tab is hidden in dropdown", () => {
            renderTabs({ selectedId: "tab-3", type: ETabsExtendedType.TYPE_2 });

            const dropdownButton = getDropdownButton();

            expect(dropdownButton).toHaveClass("type2");
            expect(dropdownButton).toHaveClass("selected");
        });

        it("Should not highlight button when selected tab stays inline", () => {
            renderTabs({ selectedId: "tab-1" });

            expect(getDropdownButton()).not.toHaveClass("selected");
        });

        it("Should keep className passed in buttonDropdownAttributes", () => {
            renderTabs({ selectedId: "tab-3", buttonDropdownAttributes: { className: "custom-class" } });

            const dropdownButton = getDropdownButton();

            expect(dropdownButton).toHaveClass("custom-class");
            // Собственные классы кнопки не должны потеряться из-за пользовательского.
            expect(dropdownButton).toHaveClass("tabButtonDropdown");
            expect(dropdownButton).toHaveClass("selected");
        });
    });
});
