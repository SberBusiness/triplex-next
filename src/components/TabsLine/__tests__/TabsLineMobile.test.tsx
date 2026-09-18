import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ITabsLineItemProps } from "../components/TabsLineItem";
import { TabsLineMobile } from "../components/TabsLineMobile";

describe("TabsLineMobile", () => {
    const tabs: ITabsLineItemProps[] = [
        { id: "tab-1", label: "Tab 1" },
        { id: "tab-2", label: "Tab 2" },
        { id: "tab-3", label: "Tab 3" },
    ];

    const renderMobile = (props: Partial<React.ComponentProps<typeof TabsLineMobile>> = {}) =>
        render(<TabsLineMobile tabs={tabs} selectedId="tab-1" onChangeTab={vi.fn()} {...props} />);

    it("Should render every tab without a dropdown", () => {
        renderMobile();

        expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual(["Tab 1", "Tab 2", "Tab 3"]);
        expect(screen.queryByRole("tab", { name: /Tab 1/ })).not.toHaveAttribute("aria-haspopup");
    });

    it("Should render nothing when there are no tabs", () => {
        const { container } = renderMobile({ tabs: [] });

        expect(container).toBeEmptyDOMElement();
    });

    it("Should mark the selected tab", () => {
        renderMobile({ selectedId: "tab-2" });

        expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "true");
    });

    it("Should call onChangeTab with the id of the clicked tab", async () => {
        const onChangeTab = vi.fn();
        const user = userEvent.setup();

        renderMobile({ onChangeTab });
        await user.click(screen.getByRole("tab", { name: "Tab 3" }));

        expect(onChangeTab).toHaveBeenCalledTimes(1);
        expect(onChangeTab).toHaveBeenCalledWith("tab-3");
    });

    it("Should call the onClick of the tab itself as well", async () => {
        const onClick = vi.fn();
        const onChangeTab = vi.fn();
        const user = userEvent.setup();

        renderMobile({ onChangeTab, tabs: [{ id: "tab-1", label: "Tab 1", onClick }] });
        await user.click(screen.getByRole("tab", { name: "Tab 1" }));

        expect(onChangeTab).toHaveBeenCalledWith("tab-1");
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
    });

    it("Should merge the custom className into the root element and forward ref", () => {
        const ref = React.createRef<HTMLDivElement>();

        const { container } = renderMobile({ className: "custom-class", ref });

        expect(container.firstChild).toHaveClass("custom-class");
        expect(container.firstChild).toHaveClass("tabsLineMobileWrapper");
        expect(ref.current).toBe(container.firstChild);
    });

    it("Should ignore the size prop instead of leaking it into the DOM", () => {
        const { container } = renderMobile({ size: EComponentSize.LG });

        expect(container.firstChild).not.toHaveAttribute("size");
        expect(screen.getAllByRole("tab")[0]).toHaveClass("md");
    });

    it("Should have correct displayName", () => {
        expect(TabsLineMobile.displayName).toBe("TabsLineMobile");
    });
});
