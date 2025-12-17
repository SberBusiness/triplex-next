import React from "react";
import { StoryObj } from "@storybook/react";
import { Controls, Description, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Text, ETextSize } from "../../src/components/Typography";
import { EFontType } from "../../src/components/Typography/enums";
import {
    BodyPage,
    IBodyPageTypeFirstProps,
    IBodyPageTypeSecondProps,
} from "../../src/components/Page/components/BodyPage";
import { EBodyPageType, EBodyPageVerticalMargin } from "../../src/components/Page/components/enums";

export default {
    title: "Components/BodyPage",
    component: BodyPage,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EBodyPageType),
            description: "Тип компонента BodyPage",
            table: {
                type: { summary: "EBodyPageType" },
                defaultValue: { summary: "first" },
            },
        },
        verticalMargin: {
            control: { type: "select" },
            options: Object.values(EBodyPageVerticalMargin),
            description: "Вертикальные отступы контента",
            table: {
                type: { summary: "EBodyPageVerticalMargin" },
                defaultValue: { summary: "large" },
            },
        },
        children: {
            description: "Контент страницы",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
Компонент BodyPage — тело страницы/контейнера для контента.

## Возможности

- **Два типа**: \`FIRST\` — контент внутри Island (карточки), \`SECOND\` — контент без карточки
- **Вертикальные отступы**: поддержка \`verticalMargin\` с вариантами LARGE (24px) и SMALL (16px)
- **Гибкость**: можно передавать любой произвольный контент
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
        },
    },
};

interface IPlaygroundArgs {
    type: EBodyPageType;
    verticalMargin: EBodyPageVerticalMargin;
}

export const Playground: StoryObj<IPlaygroundArgs> = {
    args: {
        type: EBodyPageType.FIRST,
        verticalMargin: EBodyPageVerticalMargin.LARGE,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EBodyPageType),
            description: "Тип компонента BodyPage",
            table: {
                type: { summary: "EBodyPageType" },
                defaultValue: { summary: "first" },
            },
        },
        verticalMargin: {
            control: { type: "select" },
            options: Object.values(EBodyPageVerticalMargin),
            description: "Вертикальные отступы контента",
            table: {
                type: { summary: "EBodyPageVerticalMargin" },
                defaultValue: { summary: "large" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["type", "verticalMargin"],
        },
    },
    render: (args: IPlaygroundArgs) => (
        <BodyPage type={args.type} verticalMargin={args.verticalMargin}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </Text>
        </BodyPage>
    ),
};

export const Default: StoryObj<IBodyPageTypeFirstProps> = {
    render: () => (
        <BodyPage type={EBodyPageType.FIRST}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                BodyPage типа FIRST оборачивает контент в компонент Island (карточку) с белым фоном и тенью.
            </Text>
            <br />
            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </Text>
        </BodyPage>
    ),
    parameters: {
        docs: {
            description: { story: "BodyPage типа FIRST — контент внутри карточки (Island)." },
        },
        controls: { disable: true },
    },
};

export const TypeSecond: StoryObj<IBodyPageTypeSecondProps> = {
    render: () => (
        <BodyPage type={EBodyPageType.SECOND}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                BodyPage типа SECOND отображает контент без карточки.
            </Text>
            <br />
            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </Text>
        </BodyPage>
    ),
    parameters: {
        docs: {
            description: { story: "BodyPage типа SECOND — контент без карточки." },
        },
        controls: { disable: true },
    },
};

export const WithVerticalMarginSmall: StoryObj<IBodyPageTypeFirstProps> = {
    render: () => (
        <BodyPage type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.SMALL}>
            <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                BodyPage с уменьшенными вертикальными отступами (16px вместо 24px).
            </Text>
        </BodyPage>
    ),
    parameters: {
        docs: {
            description: { story: "BodyPage с маленькими вертикальными отступами (SMALL = 16px)." },
        },
        controls: { disable: true },
    },
};
