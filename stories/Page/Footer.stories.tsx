import React from "react";
import { StoryObj } from "@storybook/react";
import { Footer } from "../../src/components/Footer";
import { Button } from "../../src/components/Button";
import { EButtonTheme, EButtonSize } from "../../src/components/Button/enums";
import { Text, ETextSize } from "../../src/components/Typography";

export default {
    title: "Components/Footer",
    component: Footer,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент Footer — нижний блок страницы/контейнера с описанием и управляющими элементами.

## Возможности

- **Прилипающий футер**: опционально фиксируется у нижней границы экрана (
  \`sticky\`)
- **Композиция**: \`Footer.Description\` с областями \`Content\` и \`Controls\`
- **Гибкость**: можно передавать любой произвольный контент
                `,
            },
        },
    },
};

export const Basic: StoryObj<typeof Footer> = {
    render: () => (
        <Footer>
            <Footer.Description>
                <Footer.Description.Content>
                    <Text size={ETextSize.B3}>Footer page text</Text>
                </Footer.Description.Content>
                <Footer.Description.Controls>
                    <Button size={EButtonSize.MD} theme={EButtonTheme.SECONDARY} style={{ marginRight: 8 }}>
                        Button text
                    </Button>
                    <Button size={EButtonSize.MD} theme={EButtonTheme.GENERAL}>
                        Button text
                    </Button>
                </Footer.Description.Controls>
            </Footer.Description>
        </Footer>
    ),
    parameters: {
        docs: {
            description: { story: "Базовый футер с описанием и кнопками действий." },
        },
    },
};
