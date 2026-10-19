import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { DefaultRender, DefaultSource } from "./examples";

const meta = {
    title: "Experiments/Retro skins",
    component: DefaultRender,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        controls: { disable: true },
        docs: {
            description: {
                component:
                    "Три экспериментальных скина для Button, TextField и Island: Windows 95, Web 2.0 и WordArt. Цвета задаются через ThemeProvider, форма и объём — локальными LESS-классами на компонентах. Скины не меняют публичный API библиотеки. Ретро-интерпретации, а не точные копии исторических интерфейсов.",
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
} satisfies Meta<typeof DefaultRender>;

export default meta;
export const Default: StoryObj<typeof meta> = {
    render: () => <DefaultRender />,
    parameters: { docs: { source: { code: DefaultSource, language: "tsx" } } },
};
