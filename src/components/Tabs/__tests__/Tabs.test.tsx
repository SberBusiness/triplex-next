import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Tabs, ITabsProps } from "../Tabs";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETabsExtendedType } from "@sberbusiness/triplex-next/components/TabsExtended";

const getTabs = () => screen.getByTestId("tabs");

/**
 * Единственный элемент с ролью button — это триггер dropdown:
 * кнопки табов рендерятся с role="tab".
 */
const getDropdownTrigger = () => screen.getByRole("button");

/** Кнопки табов из отображаемого контейнера: скрытый контейнер замеров рендерит их дубликаты. */
const getInlineTabButtons = () => within(getTabs().querySelector(".tabsReal") as HTMLElement).getAllByRole("tab");

/** Контейнер таба (span) из отображаемого контейнера. */
const getInlineTabContainer = (id: string) =>
    getTabs().querySelector(`.tabsReal [data-tab-item-id="${id}"]`) as HTMLElement;

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

/**
 * Размеры замеряются через getBoundingClientRect, в jsdom они нулевые — без мока в dropdown
 * уезжают все табы, и ни «первый», ни «последний» таб в строке не определяются.
 */
const mockTabsLayout = () => {
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
};

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
        const dropdownButton = getDropdownTrigger();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(dropdownButton).toHaveClass("md");
    });

    it("Should render with size SM", () => {
        render(<Tabs {...defaultProps} size={EComponentSize.SM} data-testid="tabs" />);

        const tabs = getTabs();
        const dropdownButton = getDropdownTrigger();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(dropdownButton).toHaveClass("sm");
    });

    it("Should render with size LG", () => {
        render(<Tabs {...defaultProps} size={EComponentSize.LG} data-testid="tabs" />);

        const tabs = getTabs();
        const dropdownButton = getDropdownTrigger();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type1");
        expect(dropdownButton).toHaveClass("lg");
    });

    it("Should render with type TYPE_2", () => {
        render(<Tabs {...defaultProps} type={ETabsExtendedType.TYPE_2} data-testid="tabs" />);

        const tabs = getTabs();
        const dropdownButton = getDropdownTrigger();

        expect(tabs).toBeInTheDocument();
        expect(tabs).toHaveClass("type2");
        expect(dropdownButton).toHaveClass("md");
    });

    it("Should render a tab button per item and apply size to it", () => {
        render(<Tabs {...defaultProps} size={EComponentSize.LG} data-testid="tabs" />);

        const tabButtons = getInlineTabButtons();

        expect(tabButtons).toHaveLength(mockTabs.length);
        expect(tabButtons[0]).toHaveTextContent("Tab 1");
        tabButtons.forEach((tabButton) => expect(tabButton).toHaveClass("lg"));
    });

    it("Should pass className to the root element", () => {
        render(<Tabs {...defaultProps} className="custom-class" data-testid="tabs" />);

        expect(getTabs()).toHaveClass("custom-class");
        // Собственные классы корневого элемента не должны потеряться из-за пользовательского.
        expect(getTabs()).toHaveClass("tabsExtended");
    });

    it("Should pass unknown html attributes of a tab to its container", () => {
        render(
            <Tabs {...defaultProps} tabs={[{ id: "tab-1", label: "Tab 1", title: "Подсказка" }]} data-testid="tabs" />,
        );

        expect(getInlineTabContainer("tab-1")).toHaveAttribute("title", "Подсказка");
    });

    it("Should not leak label and showNotificationIcon to the tab container element", () => {
        // React ругается в консоль на неизвестный DOM-атрибут, поэтому проверяем и атрибуты, и отсутствие предупреждений.
        const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

        render(
            <Tabs
                {...defaultProps}
                tabs={[{ id: "tab-1", label: "Tab 1", showNotificationIcon: true }]}
                data-testid="tabs"
            />,
        );

        const tabContainer = getInlineTabContainer("tab-1");

        expect(tabContainer).not.toHaveAttribute("label");
        expect(tabContainer).not.toHaveAttribute("shownotificationicon");
        expect(consoleError).not.toHaveBeenCalled();

        consoleError.mockRestore();
    });

    it("Should render notification icon on the tab button", () => {
        render(
            <Tabs
                {...defaultProps}
                tabs={[
                    { id: "tab-1", label: "Tab 1" },
                    { id: "tab-2", label: "Tab 2", showNotificationIcon: true },
                ]}
                data-testid="tabs"
            />,
        );

        const tabButtons = getInlineTabButtons();

        expect(tabButtons[0].querySelector(".notificationIcon")).toBeNull();
        expect(tabButtons[1].querySelector(".notificationIcon")).not.toBeNull();
    });

    it("Should not throw on an empty tabs array", () => {
        expect(() => render(<Tabs {...defaultProps} tabs={[]} selectedId="" data-testid="tabs" />)).not.toThrow();
    });

    describe("Selection", () => {
        it("Should call onSelectTab with id of the clicked tab", () => {
            const onSelectTab = vi.fn();

            render(<Tabs {...defaultProps} onSelectTab={onSelectTab} data-testid="tabs" />);

            fireEvent.click(getInlineTabButtons()[1]);

            expect(onSelectTab).toHaveBeenCalledWith("tab-2");
        });

        it("Should not call onSelectTab when the selected tab is clicked", () => {
            const onSelectTab = vi.fn();

            render(<Tabs {...defaultProps} onSelectTab={onSelectTab} data-testid="tabs" />);

            fireEvent.click(getInlineTabButtons()[0]);

            expect(onSelectTab).not.toHaveBeenCalled();
        });

        it("Should mark the selected tab with aria-selected", () => {
            render(<Tabs {...defaultProps} selectedId="tab-2" data-testid="tabs" />);

            const tabButtons = getInlineTabButtons();

            expect(tabButtons[0]).toHaveAttribute("aria-selected", "false");
            expect(tabButtons[1]).toHaveAttribute("aria-selected", "true");
        });
    });

    describe("Keyboard navigation", () => {
        beforeEach(mockTabsLayout);

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it("Should put tabIndex 0 only on the selected tab", () => {
            render(<Tabs {...defaultProps} selectedId="tab-2" data-testid="tabs" />);

            const tabButtons = getInlineTabButtons();

            expect(tabButtons[0]).toHaveAttribute("tabindex", "-1");
            expect(tabButtons[1]).toHaveAttribute("tabindex", "0");
        });

        it("Should move focus to the next tab on ArrowRight", async () => {
            const user = userEvent.setup();

            render(<Tabs {...defaultProps} data-testid="tabs" />);

            const tabButtons = getInlineTabButtons();

            await user.click(tabButtons[0]);
            await user.keyboard("{ArrowRight}");

            expect(tabButtons[1]).toHaveFocus();
            expect(tabButtons[1]).toHaveAttribute("tabindex", "0");
            expect(tabButtons[0]).toHaveAttribute("tabindex", "-1");
        });

        it("Should move focus to the previous tab on ArrowLeft", async () => {
            const user = userEvent.setup();

            render(<Tabs {...defaultProps} selectedId="tab-2" data-testid="tabs" />);

            const tabButtons = getInlineTabButtons();

            await user.click(tabButtons[1]);
            await user.keyboard("{ArrowLeft}");

            expect(tabButtons[0]).toHaveFocus();
            expect(tabButtons[0]).toHaveAttribute("tabindex", "0");
        });

        it("Should keep focus on the first inline tab on ArrowLeft", async () => {
            const user = userEvent.setup();

            render(<Tabs {...defaultProps} data-testid="tabs" />);

            const tabButtons = getInlineTabButtons();

            await user.click(tabButtons[0]);
            await user.keyboard("{ArrowLeft}");

            expect(tabButtons[0]).toHaveFocus();
        });

        it("Should keep focus on the last inline tab on ArrowRight", async () => {
            const user = userEvent.setup();

            render(<Tabs {...defaultProps} selectedId="tab-2" data-testid="tabs" />);

            const tabButtons = getInlineTabButtons();

            // tab-3 не поместился в строку, поэтому последний таб в строке — tab-2.
            await user.click(tabButtons[1]);
            await user.keyboard("{ArrowRight}");

            expect(tabButtons[1]).toHaveFocus();
        });

        it("Should prevent default on arrow keys to avoid page scroll", () => {
            render(<Tabs {...defaultProps} data-testid="tabs" />);

            const tabButton = getInlineTabButtons()[0];

            // fireEvent возвращает false, если обработчик вызвал preventDefault.
            expect(fireEvent.keyDown(tabButton, { key: "ArrowLeft" })).toBe(false);
            expect(fireEvent.keyDown(tabButton, { key: "ArrowRight" })).toBe(false);
        });

        it("Should not prevent default on other keys", () => {
            render(<Tabs {...defaultProps} data-testid="tabs" />);

            expect(fireEvent.keyDown(getInlineTabButtons()[0], { key: "ArrowDown" })).toBe(true);
        });
    });

    describe("Dropdown button", () => {
        beforeEach(mockTabsLayout);

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

        /** Раскрытый список dropdown-кнопки: связан с ней через aria-controls. */
        const getOpenedDropdown = () => {
            const dropdown = document.getElementById(getDropdownButton().getAttribute("aria-controls") ?? "");

            expect(dropdown).not.toBeNull();

            return dropdown as HTMLElement;
        };

        it("Should show only tabs hidden in dropdown as options", () => {
            renderTabs();

            fireEvent.click(getDropdownButton());

            const dropdown = within(getOpenedDropdown());

            expect(dropdown.getByText("Tab 3")).toBeInTheDocument();
            // Табы, оставшиеся в строке, в список не попадают.
            expect(dropdown.queryByText("Tab 1")).toBeNull();
            expect(dropdown.queryByText("Tab 2")).toBeNull();
        });

        it("Should call onSelectTab with id of the option selected in dropdown", () => {
            const onSelectTab = vi.fn();

            renderTabs({ onSelectTab });

            fireEvent.click(getDropdownButton());
            fireEvent.click(within(getOpenedDropdown()).getByText("Tab 3"));

            expect(onSelectTab).toHaveBeenCalledWith("tab-3");
        });
    });
});
