import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { ETooltipPreferPlace, ETooltipSize, HelpBox } from "@sberbusiness/triplex-next";
import {
    ChangeIconProps as ChangeIconPropsRender,
    ChangeIconPropsSource,
    Controlled as ControlledRender,
    ControlledSource,
    Default as DefaultRender,
    DefaultSource,
    Placement as PlacementRender,
    PlacementSource,
    Sizes as SizesRender,
    SizesSource,
    WithMobileHeader as WithMobileHeaderRender,
    WithMobileHeaderSource,
} from "./examples";

interface IHelpBoxPlaygroundProps extends React.ComponentProps<typeof HelpBox> {
    contentText?: string;
    mobileHeaderText?: string;
}

const meta = {
    title: "Components/HelpBox",
    component: HelpBox,
    parameters: {
        docs: {
            description: {
                component:
                    "Иконка помощи с всплывающей подсказкой.\n\n- **Размеры тултипа**: SM, LG\n- **Расположение**: above, below, left, right\n- **Мобильный заголовок**: отдельная зона для мобильной версии",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={HelpBox} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof HelpBox>;

export default meta;

export const Playground: StoryObj<IHelpBoxPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        tooltipSize: ETooltipSize.SM,
        preferPlace: ETooltipPreferPlace.ABOVE,
        contentText: "Текст подсказки",
        mobileHeaderText: "Заголовок подсказки",
    },
    argTypes: {
        tooltipSize: {
            control: { type: "select" },
            options: Object.values(ETooltipSize),
            description: "Размер тултипа",
            table: {
                type: { summary: "ETooltipSize" },
                defaultValue: { summary: "ETooltipSize.SM" },
            },
        },
        preferPlace: {
            control: { type: "select" },
            options: Object.values(ETooltipPreferPlace),
            description: "Предпочтительное положение",
            table: {
                type: { summary: "ETooltipPreferPlace" },
                defaultValue: { summary: "ETooltipPreferPlace.ABOVE" },
            },
        },
        contentText: {
            control: { type: "text" },
            description: "Текст в теле подсказки",
            table: {
                category: "Settings",
                type: { summary: "string" },
                defaultValue: { summary: "Текст подсказки" },
            },
        },
        mobileHeaderText: {
            control: { type: "text" },
            description: "Текст мобильного заголовка",
            table: {
                category: "Settings",
                type: { summary: "string" },
                defaultValue: { summary: "Заголовок подсказки" },
            },
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: ["tooltipSize", "preferPlace", "contentText", "mobileHeaderText"],
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: (args) => {
        const { contentText, mobileHeaderText, ...helpBoxProps } = args;

        return (
            <div style={{ display: "flex", justifyContent: "center", padding: 50 }}>
                <HelpBox
                    {...helpBoxProps}
                    mobileHeaderContent={mobileHeaderText || undefined}
                    aria-label="Подсказка"
                    tooltipXButtonProps={{ "aria-label": "Закрыть" }}
                >
                    {contentText || "Текст подсказки"}
                </HelpBox>
            </div>
        );
    },
};

export const Default: StoryObj<typeof HelpBox> = {
    name: "Default",
    render: DefaultRender,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof HelpBox> = {
    name: "Sizes",
    render: SizesRender,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: SizesSource,
                language: "tsx",
            },
        },
    },
};

export const Placement: StoryObj<typeof HelpBox> = {
    name: "Placement",
    render: PlacementRender,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: PlacementSource,
                language: "tsx",
            },
        },
    },
};

export const WithMobileHeader: StoryObj<typeof HelpBox> = {
    name: "With Mobile Header",
    render: WithMobileHeaderRender,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: WithMobileHeaderSource,
                language: "tsx",
            },
        },
    },
};

export const Controlled: StoryObj<typeof HelpBox> = {
    name: "Controlled",
    render: ControlledRender,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: ControlledSource,
                language: "tsx",
            },
        },
    },
};

export const ChangeIconProps: StoryObj<typeof HelpBox> = {
    name: "ChangeIconProps",
    render: ChangeIconPropsRender,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: ChangeIconPropsSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof HelpBox> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 100, flexWrap: "wrap", padding: 80 }}>
            <HelpBox
                tooltipSize={ETooltipSize.LG}
                preferPlace={ETooltipPreferPlace.BELOW}
                mobileHeaderContent="Заголовок подсказки"
                isOpen
                aria-label="Подсказка"
                tooltipXButtonProps={{ "aria-label": "Закрыть" }}
            >
                Тултип размера LG с длинным содержимым для демонстрации разницы
            </HelpBox>
        </div>
    ),
};
