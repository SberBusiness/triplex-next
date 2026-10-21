import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { Carousel } from "@sberbusiness/triplex-next";
import { VisualTestsRender } from "./examples";

const meta = {
    title: "Components/Carousel/PrevButton",
    component: Carousel.PrevButton,
} satisfies Meta<typeof Carousel.PrevButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const VisualTests: Story = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { hoverSelector: '[data-testid="carousel-prev-hover"]' },
    },
    play: async ({ canvasElement, userEvent }) => {
        const canvas = within(canvasElement);
        for (const id of ["carousel-prev-focus", "carousel-prev-hover", "carousel-prev-disabled"]) {
            await userEvent.click(canvas.getByTestId(`${id}-prepare`));
            await expect(canvas.getByTestId(id)).toHaveAttribute("aria-disabled", "false");
        }
        const startButton = canvas.getByTestId("carousel-prev-start");
        await expect(startButton).toHaveAttribute("aria-disabled", "true");
        await expect(startButton).toBeEnabled();
        await expect(canvas.getByTestId("carousel-prev-disabled")).toBeDisabled();
        await userEvent.hover(canvas.getByTestId("carousel-prev-hover"));
        await expect(canvas.getByTestId("carousel-prev-hover")).toBeEnabled();
        await userEvent.click(canvasElement);
        await userEvent.tab();
        await expect(canvas.getByTestId("carousel-prev-focus")).toHaveFocus();
    },
};
