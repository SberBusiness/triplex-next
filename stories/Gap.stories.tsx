import React from "react";
import { Gap } from "../src/components/Gap";
import { StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Gap",
    component: Gap,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 24, 32, 64, 128],
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
Компонент - разделитель. Добавляет пустое вертикальное пространство между компонентами.

## Особенности

- Размеры - 4, 8, 12, 16, 24, 32, 64, 128

## Использование

\`\`\`tsx
import { Gap } from '@sberbusiness/triplex-next';   

<Gap size={4} />
\`\`\`
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof Gap> = {
    name: "Playground",
    args: {
        size: 16,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 24, 32, 64, 128],
            description: "Размер отступа",
        },
    },
    parameters: {
        controls: {
            include: ["size"],
        },
    },
    render: (args) => (
        <div>
            <div
                style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "rgb(255, 217, 160)",
                }}
            >
                Sample Text Above
            </div>

            <Gap size={args.size} />

            <div
                style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "rgb(255, 217, 160)",
                }}
            >
                Sample Text Below
            </div>
        </div>
    ),
};

export const Default: StoryObj<typeof Gap> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div>
            <div
                style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "rgb(255, 217, 160)",
                }}
            >
                Sample Text Above
            </div>

            <Gap size={16} />

            <div
                style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "rgb(255, 217, 160)",
                }}
            >
                Sample Text Below
            </div>
        </div>
    ),
};
