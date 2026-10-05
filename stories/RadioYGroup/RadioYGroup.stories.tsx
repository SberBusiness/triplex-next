import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { expect, within } from "storybook/test";
import { RadioYGroup } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Sizes as SizesRender,
    SizesSource,
    Selected as SelectedRender,
    SelectedSource,
    Disabled as DisabledRender,
    DisabledSource,
    VisualTests as VisualTestsRender,
} from "./examples";

const meta = {
    title: "Components/RadioYGroup",
    component: RadioYGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Вертикальная группа радио-кнопок с ролью radiogroup. Размер, выбор и disabled задаются на дочерних Radio. Общий name объединяет Radio в одну группу выбора; разным группам нужны разные name. Группа принимает HTML-атрибуты div и ref на корневой элемент. Доступное имя задаётся через aria-label или aria-labelledby.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof RadioYGroup>;

export default meta;
type Story = StoryObj<typeof RadioYGroup>;

export const Default: Story = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: { code: DefaultSource, language: "tsx" },
        },
    },
};

export const Sizes: Story = {
    render: SizesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Размер каждого элемента задаётся через size дочернего Radio." },
            source: { code: SizesSource, language: "tsx" },
        },
    },
};

export const Selected: Story = {
    render: SelectedRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Управляемый выбор хранится в состоянии приложения и передаётся в checked каждого Radio.",
            },
            source: { code: SelectedSource, language: "tsx" },
        },
    },
};

export const Disabled: Story = {
    render: DisabledRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "disabled задаётся на каждом Radio отдельно. Показаны выбранные и невыбранные элементы всех размеров.",
            },
            source: { code: DisabledSource, language: "tsx" },
        },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        visualTests: { hoverTarget: "radio-y-group-hover-unchecked" },
    },
    play: async ({ canvas, userEvent }) => {
        const focusGroup = within(canvas.getByRole("radiogroup", { name: "Фокус с клавиатуры" }));
        const focusRadio = focusGroup.getByRole("radio", { name: "Первый вариант" });
        const hoverRadio = canvas.getByTestId("radio-y-group-hover-unchecked");

        await userEvent.tab();
        await expect(focusRadio).toHaveFocus();
        await expect(focusRadio).not.toBeChecked();
        await userEvent.hover(hoverRadio);
        await expect(hoverRadio).not.toBeChecked();
        await expect(focusRadio).toHaveFocus();
    },
};

export const VisualTestsCheckedHover: Story = {
    tags: ["!autodocs"],
    render: VisualTestsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        visualTests: { hoverTarget: "radio-y-group-hover-checked" },
    },
    play: async ({ canvas, userEvent }) => {
        const focusGroup = within(canvas.getByRole("radiogroup", { name: "Фокус с клавиатуры" }));
        const focusRadio = focusGroup.getByRole("radio", { name: "Первый вариант" });
        const hoverRadio = canvas.getByTestId("radio-y-group-hover-checked");

        await userEvent.tab();
        await userEvent.keyboard(" ");
        await expect(focusRadio).toHaveFocus();
        await expect(focusRadio).toBeChecked();
        await userEvent.hover(hoverRadio);
        await expect(hoverRadio).toBeChecked();
        await expect(focusRadio).toHaveFocus();
    },
};
