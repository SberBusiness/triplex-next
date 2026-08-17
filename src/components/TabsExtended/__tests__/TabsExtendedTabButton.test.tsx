import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TabsExtendedTabButton } from "../components/TabsExtendedTabButton";
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

const getButton = () => screen.getByRole("tab");

describe("TabsExtendedTabButton", () => {
    it("Should render button with role tab and default size MD", () => {
        render(<TabsExtendedTabButton>Таб</TabsExtendedTabButton>);

        const button = getButton();

        expect(button.tagName).toBe("BUTTON");
        expect(button).toHaveAttribute("type", "button");
        expect(button).toHaveClass("tabsExtendedTabButton", "md");
        expect(button).toHaveTextContent("Таб");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("Should apply class for size %s", (size, className) => {
        render(<TabsExtendedTabButton size={size}>Таб</TabsExtendedTabButton>);

        expect(getButton()).toHaveClass(className);
    });

    it("Should reflect selected state in class and aria-selected", () => {
        render(<TabsExtendedTabButton selected>Таб</TabsExtendedTabButton>);

        const button = getButton();

        expect(button).toHaveClass("selected");
        expect(button).toHaveAttribute("aria-selected", "true");
    });

    it("Should not be selected by default", () => {
        render(<TabsExtendedTabButton>Таб</TabsExtendedTabButton>);

        expect(getButton()).not.toHaveClass("selected");
        expect(getButton()).not.toHaveAttribute("aria-selected", "true");
    });

    it.each([
        [ETabsExtendedType.TYPE_1, "type1"],
        [ETabsExtendedType.TYPE_2, "type2"],
    ])("Should take class for type %s from context", (type, className) => {
        render(
            <TabsExtendedContext.Provider value={createContextValue({ type })}>
                <TabsExtendedTabButton>Таб</TabsExtendedTabButton>
            </TabsExtendedContext.Provider>,
        );

        expect(getButton()).toHaveClass(className);
    });

    it("Should render notification icon when showNotificationIcon is set", () => {
        const { container } = render(<TabsExtendedTabButton showNotificationIcon>Таб</TabsExtendedTabButton>);

        expect(container.querySelector(".notificationIcon")).toBeInTheDocument();
    });

    it("Should not render notification icon by default", () => {
        const { container } = render(<TabsExtendedTabButton>Таб</TabsExtendedTabButton>);

        expect(container.querySelector(".notificationIcon")).not.toBeInTheDocument();
    });

    it("Should call onClick handler", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(<TabsExtendedTabButton onClick={onClick}>Таб</TabsExtendedTabButton>);

        await user.click(getButton());

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Should not call onClick when disabled", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(
            <TabsExtendedTabButton disabled onClick={onClick}>
                Таб
            </TabsExtendedTabButton>,
        );

        expect(getButton()).toBeDisabled();

        await user.click(getButton());

        expect(onClick).not.toHaveBeenCalled();
    });

    it("Should merge custom className into root element", () => {
        render(<TabsExtendedTabButton className="custom-class">Таб</TabsExtendedTabButton>);

        expect(getButton()).toHaveClass("tabsExtendedTabButton", "custom-class");
    });

    it("Should forward ref to button element", () => {
        const ref = React.createRef<HTMLButtonElement>();

        render(<TabsExtendedTabButton ref={ref}>Таб</TabsExtendedTabButton>);

        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
        expect(ref.current).toBe(getButton());
    });
});
