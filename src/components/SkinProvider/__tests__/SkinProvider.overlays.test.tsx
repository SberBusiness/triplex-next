import React, { createRef, useRef, useState } from "react";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SkinProvider, TSkin } from "../index";
import {
    Dropdown,
    DropdownList,
    DropdownMobile,
    DropdownMobileBody,
    DropdownMobileList,
    DropdownMobileListItem,
} from "../../Dropdown";
import { Tabs } from "../../Tabs";
import { TabsLine } from "../../TabsLine";
import { ModalWindow, ModalWindowContent, ModalWindowBody, ModalWindowClose } from "../../ModalWindow";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("SkinProvider — navigation and portals", () => {
    it("skins a real dropdown portal and preserves refs, selection and active keyboard navigation across opt-out", () => {
        const dropdownRef = createRef<HTMLDivElement>();
        const onSelect = vi.fn();
        const Example = ({ skin }: { skin: TSkin }) => {
            const targetRef = useRef<HTMLButtonElement>(null);
            return (
                <SkinProvider skin={skin}>
                    <button ref={targetRef}>Open</button>
                    <Dropdown ref={dropdownRef} targetRef={targetRef} opened setOpened={() => {}}>
                        <DropdownList dropdownOpened>
                            <DropdownList.Item id="first" selected onSelect={() => onSelect("first")}>
                                First
                            </DropdownList.Item>
                            <DropdownList.Item id="second" onSelect={() => onSelect("second")}>
                                Second
                            </DropdownList.Item>
                        </DropdownList>
                    </Dropdown>
                </SkinProvider>
            );
        };
        const { container, rerender } = render(<Example skin="wordart" />);
        const dropdown = dropdownRef.current;
        expect(dropdown).toHaveClass("wordArtDropdown");
        expect(container).not.toContainElement(dropdown);
        expect(document.body).toContainElement(dropdown);
        expect(screen.getByRole("option", { name: "First" })).toHaveAttribute("aria-selected", "true");
        fireEvent.keyDown(document, { key: "ArrowDown", keyCode: 40 });
        expect(screen.getByRole("option", { name: "Second" })).toHaveClass("wordArtOptionActive");
        fireEvent.keyDown(document, { key: "Enter", keyCode: 13 });
        expect(onSelect).toHaveBeenCalledWith("second");
        rerender(<Example skin={null} />);
        expect(dropdownRef.current).toBe(dropdown);
        expect(dropdown).not.toHaveClass("wordArtDropdown");
        expect(screen.getByRole("option", { name: "Second" })).toHaveClass("active");
        expect(screen.getByRole("option", { name: "Second" })).not.toHaveClass("wordArtOption");
    });

    it("skins the mobile sheet content and its options without painting the backdrop", async () => {
        const ref = createRef<HTMLDivElement>();
        const onSelect = vi.fn();
        const user = userEvent.setup();
        render(
            <SkinProvider skin="wordart">
                <DropdownMobile ref={ref} opened setOpened={() => {}}>
                    <DropdownMobileBody>
                        <DropdownMobileList>
                            <DropdownMobileListItem id="mobile-first" selected onSelect={onSelect}>
                                Mobile option
                            </DropdownMobileListItem>
                        </DropdownMobileList>
                    </DropdownMobileBody>
                </DropdownMobile>
            </SkinProvider>,
        );
        await waitFor(() => expect(ref.current).toHaveClass("wordArtMobileDropdown"));
        expect(ref.current?.previousElementSibling).toHaveClass("dropdownMobileBackdrop");
        expect(ref.current?.previousElementSibling).not.toHaveClass("wordArtMobileDropdown");
        const option = screen.getByRole("option", { name: "Mobile option" });
        expect(option).toHaveClass("wordArtOption");
        expect(option).toHaveAttribute("aria-selected", "true");
        await user.click(option);
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("preserves Tabs keyboard selection and roving tabindex when its shared base is skinned", async () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
            return new DOMRect(0, 0, this.classList.contains("tabsFake") ? 600 : 100, 40);
        });
        const user = userEvent.setup();
        const ref = createRef<HTMLDivElement>();
        const Example = () => {
            const [selectedId, setSelectedId] = useState("overview");
            return (
                <SkinProvider skin="wordart">
                    <Tabs
                        ref={ref}
                        tabs={[
                            { id: "overview", label: "Overview" },
                            { id: "team", label: "Team" },
                        ]}
                        selectedId={selectedId}
                        onSelectTab={setSelectedId}
                        buttonDropdownAttributes={{ "aria-label": "More tabs" }}
                    />
                </SkinProvider>
            );
        };
        render(<Example />);
        const inlineTabs = ref.current?.querySelector<HTMLElement>(".tabsReal");
        expect(inlineTabs).toBeTruthy();
        if (!inlineTabs) return;
        const [overview, team] = within(inlineTabs).getAllByRole("tab");
        expect(team).toHaveClass("wordArtTab");
        await user.click(overview);
        await user.keyboard("{ArrowRight}");
        expect(team).toHaveFocus();
        expect(team).toHaveAttribute("tabindex", "0");
        expect(team).toHaveAttribute("aria-selected", "false");
        await user.keyboard("{Enter}");
        expect(team).toHaveAttribute("aria-selected", "true");
        expect(overview).toHaveAttribute("aria-selected", "false");
    });

    it("skins hidden TabsLine items through their dropdown and closes it on Escape", async () => {
        const user = userEvent.setup();
        render(
            <SkinProvider skin="wordart">
                <TabsLine
                    maxVisible={2}
                    selectedId="a"
                    onChangeTab={() => {}}
                    tabs={[
                        { id: "a", label: "Visible" },
                        { id: "b", label: "More" },
                        { id: "c", label: "Hidden" },
                    ]}
                />
            </SkinProvider>,
        );
        const target = screen.getByRole("tab", { name: "More" });
        expect(target).toHaveClass("wordArtLineTab");
        await user.click(target);
        expect(screen.getByRole("option", { name: "Hidden" })).toHaveClass("wordArtOption");
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        expect(target).toHaveFocus();
    });

    it("keeps a real modal portal, focus trap, Escape and focus return when switching the skin", async () => {
        const user = userEvent.setup();
        const ref = createRef<HTMLDivElement>();
        const Example = ({ skin }: { skin: TSkin }) => {
            const [isOpen, setOpen] = useState(false);
            return (
                <SkinProvider skin={skin}>
                    <button onClick={() => setOpen(true)}>Open modal</button>
                    <ModalWindow
                        ref={ref}
                        isOpen={isOpen}
                        aria-label="Project settings"
                        closeButton={
                            <ModalWindowClose
                                aria-label="Close modal"
                                title="Close modal"
                                onClick={() => setOpen(false)}
                            />
                        }
                        focusTrapProps={{
                            focusTrapOptions: { tabbableOptions: { displayCheck: "none" }, delayInitialFocus: false },
                        }}
                    >
                        <ModalWindowContent>
                            <ModalWindowBody>
                                <input aria-label="Project name" defaultValue="Triplex" />
                            </ModalWindowBody>
                        </ModalWindowContent>
                    </ModalWindow>
                </SkinProvider>
            );
        };
        const { container, rerender } = render(<Example skin="wordart" />);
        const trigger = screen.getByRole("button", { name: "Open modal" });
        await user.click(trigger);
        const dialog = screen.getByRole("dialog", { name: "Project settings" });
        const input = screen.getByRole("textbox", { name: "Project name" });
        expect(ref.current).toBe(dialog);
        expect(container).not.toContainElement(dialog);
        expect(dialog.querySelector(".wordArtModalSurface")).toBeInTheDocument();
        expect(input).toHaveFocus();
        await user.tab();
        expect(screen.getByRole("button", { name: /^Close modal/ })).toHaveFocus();
        await user.tab();
        expect(input).toHaveFocus();
        await user.type(input, " Next");
        rerender(<Example skin={null} />);
        expect(ref.current).toBe(dialog);
        expect(input).toHaveFocus();
        expect(input).toHaveValue("Triplex Next");
        expect(dialog.querySelector(".wordArtModalSurface")).not.toBeInTheDocument();
        // JSDOM has no layout; the existing Escape trigger checks the close button's visibility.
        vi.spyOn(screen.getByRole("button", { name: "Close modal" }), "offsetParent", "get").mockReturnValue(
            document.body,
        );
        fireEvent.keyDown(input, { key: "Escape", code: "Escape", keyCode: 27 });
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
        await waitFor(() => expect(trigger).toHaveFocus());
    });
});
