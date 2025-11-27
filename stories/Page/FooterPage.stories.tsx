import React from "react";
import { StoryObj } from "@storybook/react";
import { Button } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Text, ETextSize } from "../../src/components/Typography";
import { Page, EFooterPageType } from "../../src/components/Page";
import {
    IFooterPageTypeFirstProps,
    IFooterPageTypeSecondProps,
    FooterPage,
} from "../../src/components/Page/components/FooterPage";
import "./Footer.less";

export default {
    title: "Components/FooterPage",
    component: FooterPage,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент FooterPage — нижний блок страницы/контейнера с описанием и управляющими элементами.

## Возможности

- **Композиция**: \`Footer.Description\` с областями \`Content\` и \`Controls\`
- **Гибкость**: можно передавать любой произвольный контент
                `,
            },
        },
    },
};

export const Playground: StoryObj<IFooterPageTypeFirstProps | IFooterPageTypeSecondProps> = {
    args: {
        type: EFooterPageType.FIRST,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: [EFooterPageType.FIRST, EFooterPageType.SECOND],
            description: "Тип футера страницы",
            table: { type: { summary: "EFooterPageType" }, defaultValue: { summary: "first" } },
        },
    },
    render: (args) => (
        <div className="footer-example">
            <Page.Footer type={args.type}>
                <Page.Footer.Description>
                    <Page.Footer.Description.Content>
                        <Text size={ETextSize.B3}>Footer page content</Text>
                    </Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                        <Button
                            size={EComponentSize.MD}
                            theme={
                                args.type === EFooterPageType.FIRST
                                    ? EButtonTheme.SECONDARY
                                    : EButtonTheme.SECONDARY_LIGHT
                            }
                        >
                            Button text
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Button text
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </div>
    ),
};

export const Basic: StoryObj<IFooterPageTypeFirstProps | IFooterPageTypeSecondProps> = {
    args: {
        type: EFooterPageType.FIRST,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EFooterPageType),
        },
    },
    render: (args) => (
        <div className="footer-example">
            <Page.Footer type={args.type}>
                <Page.Footer.Description>
                    <Page.Footer.Description.Controls>
                        <Button
                            size={EComponentSize.MD}
                            theme={
                                args.type === EFooterPageType.FIRST
                                    ? EButtonTheme.SECONDARY
                                    : EButtonTheme.SECONDARY_LIGHT
                            }
                        >
                            Button text
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Button text
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </div>
    ),
};

export const WithLink: StoryObj<IFooterPageTypeFirstProps | IFooterPageTypeSecondProps> = {
    args: {
        type: EFooterPageType.FIRST,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EFooterPageType),
        },
    },
    render: (args) => (
        <div className="footer-example">
            <Page.Footer type={args.type}>
                <Page.Footer.Description>
                    <Page.Footer.Description.Content>
                        <Button theme={EButtonTheme.LINK} size={EComponentSize.MD}>
                            Button link text
                        </Button>
                    </Page.Footer.Description.Content>
                    <Page.Footer.Description.Controls>
                        <Button
                            size={EComponentSize.MD}
                            theme={
                                args.type === EFooterPageType.FIRST
                                    ? EButtonTheme.SECONDARY
                                    : EButtonTheme.SECONDARY_LIGHT
                            }
                        >
                            Button text
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Button text
                        </Button>
                    </Page.Footer.Description.Controls>
                </Page.Footer.Description>
            </Page.Footer>
        </div>
    ),
};
