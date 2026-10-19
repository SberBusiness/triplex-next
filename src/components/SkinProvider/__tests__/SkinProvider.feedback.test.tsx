import React, { createRef, useRef } from "react";
import { createPortal } from "react-dom";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SkinProvider, TSkin } from "../index";
import { EOrderDirection, ITableBasicColumn, MasterTable } from "../../Table";
import { Tooltip, ETooltipSize } from "../../Tooltip";
import { Notification, NotificationGrouped } from "../../Notification";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("SkinProvider — tables and feedback", () => {
    it("preserves the table ref, sorting, row clicks and selected state through skin changes", async () => {
        const ref = createRef<HTMLTableElement>();
        const onOrderBy = vi.fn();
        const onClickRow = vi.fn();
        const user = userEvent.setup();
        const columns: ITableBasicColumn[] = [
            { fieldKey: "name", label: "Recipient", orderDirection: EOrderDirection.NONE },
        ];
        const Example = ({ skin }: { skin: TSkin }) => (
            <SkinProvider skin={skin}>
                <MasterTable>
                    <MasterTable.TableBasic
                        ref={ref}
                        aria-label="Payments"
                        className="consumerTable"
                        columns={columns}
                        data={[{ rowKey: "one", selected: true, rowData: { name: "Example company" } }]}
                        onOrderBy={onOrderBy}
                        onClickRow={onClickRow}
                        renderNoData={() => <div>Empty</div>}
                    />
                </MasterTable>
            </SkinProvider>
        );
        const { rerender } = render(<Example skin="wordart" />);
        const table = screen.getByRole("table", { name: "Payments" });
        const row = screen.getByRole("row", { name: "Example company" });
        expect(ref.current).toBe(table);
        expect(table).toHaveClass("consumerTable");
        expect(table.parentElement).toHaveClass("wordArtTable");
        expect(row).toHaveClass("wordArtTableSelected", "selected");
        await user.click(screen.getByText("Recipient"));
        expect(onOrderBy).toHaveBeenCalledWith({ fieldKey: "name", direction: EOrderDirection.ASC });
        await user.click(row);
        expect(onClickRow).toHaveBeenCalledWith("one");
        rerender(<Example skin={null} />);
        expect(ref.current).toBe(table);
        expect(table.parentElement).not.toHaveClass("wordArtTable");
        expect(row).toHaveClass("selected");
        expect(row).not.toHaveClass("wordArtTableSelected");
    });

    it("inherits the tooltip skin in a real portal, keeps ARIA and closes with Escape after opt-out", async () => {
        const user = userEvent.setup();
        const onShow = vi.fn();
        const Example = ({ skin }: { skin: TSkin }) => {
            const targetRef = useRef<HTMLButtonElement>(null);
            return (
                <SkinProvider skin={skin}>
                    <Tooltip
                        targetRef={targetRef}
                        size={ETooltipSize.SM}
                        toggleType="click"
                        disableAdaptiveMode
                        role="tooltip"
                        id="skin-help"
                        className="consumerTooltip"
                        onShow={onShow}
                    >
                        <Tooltip.Target>
                            <button ref={targetRef} aria-describedby="skin-help">
                                Explain
                            </button>
                        </Tooltip.Target>
                        <Tooltip.Body>Payment details</Tooltip.Body>
                        <Tooltip.XButton aria-label="Close help" />
                    </Tooltip>
                </SkinProvider>
            );
        };
        const { container, rerender } = render(<Example skin="wordart" />);
        const trigger = screen.getByRole("button", { name: "Explain" });
        await user.click(trigger);
        const tooltip = screen.getByRole("tooltip");
        expect(container).not.toContainElement(tooltip);
        expect(tooltip).toHaveClass("wordArtTooltip", "consumerTooltip");
        expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
        expect(onShow).toHaveBeenCalledWith(tooltip);
        rerender(<Example skin={null} />);
        expect(screen.getByRole("tooltip")).toBe(tooltip);
        expect(tooltip).not.toHaveClass("wordArtTooltip");
        fireEvent.keyDown(trigger, { key: "Escape", code: "Escape" });
        await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
    });

    it("uses the skinned mobile sheet for adaptive tooltips and keeps closing functional", async () => {
        vi.spyOn(window, "matchMedia").mockImplementation((media) => ({
            media,
            matches: true,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));
        const user = userEvent.setup();
        const toggle = vi.fn();
        const Example = () => {
            const targetRef = useRef<HTMLButtonElement>(null);
            return (
                <SkinProvider skin="wordart">
                    <Tooltip targetRef={targetRef} size={ETooltipSize.SM} toggleType="click" toggle={toggle}>
                        <Tooltip.Target>
                            <button ref={targetRef}>Mobile help</button>
                        </Tooltip.Target>
                        <Tooltip.Body>Adaptive explanation</Tooltip.Body>
                        <Tooltip.MobileHeader>Details</Tooltip.MobileHeader>
                        <Tooltip.XButton aria-label="Close mobile help" />
                    </Tooltip>
                </SkinProvider>
            );
        };
        render(<Example />);
        await user.click(screen.getByRole("button", { name: "Mobile help" }));
        await waitFor(() =>
            expect(screen.getByText("Adaptive explanation").closest(".wordArtMobileDropdown")).toBeInTheDocument(),
        );
        const backdrop = screen
            .getByText("Adaptive explanation")
            .closest(".wordArtMobileDropdown")?.previousElementSibling;
        expect(backdrop).toHaveClass("dropdownMobileBackdrop");
        if (!backdrop) return;
        // JSDOM does not run CSS transitions; finish the real overlay's opening and closing lifecycle.
        fireEvent.transitionEnd(backdrop);
        expect(document.body).not.toHaveClass("wordArtMobileDropdown");
        await user.click(screen.getByRole("button", { name: "Close mobile help" }));
        expect(toggle).toHaveBeenLastCalledWith(false);
        const closingBackdrop = document.querySelector(".dropdownMobileBackdrop.closing");
        expect(closingBackdrop).toBeInTheDocument();
        if (!closingBackdrop) return;
        fireEvent.transitionEnd(closingBackdrop);
        await waitFor(() => expect(screen.queryByText("Adaptive explanation")).not.toBeInTheDocument());
    });

    it("skins notification portals and both group layers while preserving refs and actions", async () => {
        const ref = createRef<HTMLDivElement>();
        const groupRef = createRef<HTMLDivElement>();
        const onClose = vi.fn();
        const user = userEvent.setup();
        const Example = ({ skin }: { skin: TSkin }) => (
            <SkinProvider skin={skin}>
                {createPortal(
                    <NotificationGrouped ref={groupRef}>
                        <Notification ref={ref} aria-label="Payment result">
                            <Notification.Body>
                                <Notification.Body.Header>Done</Notification.Body.Header>
                            </Notification.Body>
                            <Notification.Close aria-label="Dismiss" onClick={onClose} />
                        </Notification>
                    </NotificationGrouped>,
                    document.body,
                )}
            </SkinProvider>
        );
        const { container, rerender } = render(<Example skin="wordart" />);
        const notification = screen.getByRole("alertdialog", { name: "Payment result" });
        expect(ref.current).toBe(notification);
        expect(container).not.toContainElement(notification);
        expect(notification).toHaveClass("wordArtNotification");
        expect(groupRef.current?.querySelectorAll(".wordArtNotificationLayer")).toHaveLength(2);
        await user.click(screen.getByRole("button", { name: "Dismiss" }));
        expect(onClose).toHaveBeenCalledTimes(1);
        rerender(<Example skin={null} />);
        expect(ref.current).toBe(notification);
        expect(notification).not.toHaveClass("wordArtNotification");
        expect(groupRef.current?.querySelectorAll(".wordArtNotificationLayer")).toHaveLength(0);
        expect(groupRef.current?.querySelectorAll(".notificationGroupedFooterItem")).toHaveLength(2);
    });
});
