import type { Meta, StoryObj } from "@storybook/react";
import { ColumnSettings } from "@sberbusiness/triplex-next";
import { VisualTestsRender } from "./examples";

const meta = {
    title: "Components/ColumnSettingsSortableListItem",
    component: ColumnSettings.SortableList.Item,
    tags: ["!autodocs", "!dev"],
    parameters: {
        layout: "padded",
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
} satisfies Meta<typeof ColumnSettings.SortableList.Item>;

export default meta;

export const VisualTests: StoryObj<typeof ColumnSettings.SortableList.Item> = {
    render: VisualTestsRender,
    play: async ({ canvas, canvasElement }) => {
        const row = canvas.getByTestId("item-dragging");
        const staticContent = canvas.getByTestId("item-drag-static-content");
        // Target — первый элемент li; контент с checkbox защищён data-draggable="false".
        const target = row.firstElementChild;

        if (!(target instanceof HTMLElement)) {
            throw new Error("ColumnSettingsSortableListItem: drag target is missing");
        }

        const rect = target.getBoundingClientRect();
        const position = { clientX: rect.right - 20, clientY: rect.top + rect.height / 2 };

        // Native-события не оставляют pressed-state в userEvent между forceRemount для xs и xl.
        target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 0, buttons: 1, ...position }));
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        canvasElement.ownerDocument.dispatchEvent(
            new MouseEvent("mousemove", { bubbles: true, buttons: 1, ...position, clientY: position.clientY - 12 }),
        );

        await new Promise<void>((resolve, reject) => {
            const observer = new MutationObserver(check);
            const timeout = setTimeout(() => {
                observer.disconnect();
                reject(
                    new Error("ColumnSettingsSortableListItem: drag state or staticContent collapse did not settle"),
                );
            }, 3000);

            function check() {
                if (row.className.includes("dragging") && getComputedStyle(staticContent).visibility === "hidden") {
                    clearTimeout(timeout);
                    observer.disconnect();
                    resolve();
                }
            }

            observer.observe(row, { attributes: true, childList: true, subtree: true });
            check();
        });
    },
};
