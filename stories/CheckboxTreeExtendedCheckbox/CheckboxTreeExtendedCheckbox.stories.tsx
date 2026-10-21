import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxTreeExtended } from "@sberbusiness/triplex-next";
import { expect } from "storybook/test";
import { VisualTestsRender } from "./examples";

const meta = {
    title: "Components/CheckboxTreeExtended/Checkbox",
    component: CheckboxTreeExtended.Checkbox,
    parameters: { layout: "padded" },
} satisfies Meta<typeof CheckboxTreeExtended.Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    parameters: {
        controls: { disable: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
        testRunner: { hoverSelector: '[data-testid="checkbox-tree-extended-md-checked"]' },
    },
    render: VisualTestsRender,
    play: async ({ canvas, canvasElement, userEvent }) => {
        await userEvent.click(canvasElement);
        await userEvent.tab();
        await userEvent.tab();
        await expect(canvas.getByTestId("checkbox-tree-extended-sm-focus")).toHaveFocus();
        await expect(canvas.getByTestId("checkbox-tree-extended-md-checked")).toBeChecked();
        await expect(canvas.getByTestId("checkbox-tree-extended-md-bulk")).toBeChecked();
        await expect(canvas.getByTestId("checkbox-tree-extended-md-disabled")).toBeDisabled();
        await expect(canvas.getByTestId("checkbox-tree-extended-md-disabled-checked")).toBeChecked();
        await expect(canvas.getByTestId("checkbox-tree-extended-md-disabled-bulk")).toBeDisabled();
    },
};
