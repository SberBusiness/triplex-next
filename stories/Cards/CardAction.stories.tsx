import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import {
    CardAction,
    ICardActionProps,
    EButtonTheme,
    ECardTheme,
    ECardRoundingSize,
    ECardContentPaddingSize,
    Title,
    ETitleSize,
    EFontWeightTitle,
    Button,
    EComponentSize,
    Text,
    ETextSize,
    EFontType,
    Link,
    Gap,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    Heading,
    ArgTypes,
} from "@storybook/addon-docs/blocks";
import {
    CardActionDefaultExample,
    CardActionDefaultExampleSource,
    CardActionPaddingSizesExample,
    CardActionPaddingSizesExampleSource,
    CardActionRoundingSizesExample,
    CardActionRoundingSizesExampleSource,
    CardActionThemesExample,
    CardActionThemesExampleSource,
} from "./examples/CardAction";

/** Высота блока Media */
const MEDIA_HEIGHT = "129px";

type TCardActionPlaygroundProps = Pick<
    ICardActionProps,
    "roundingSize" | "theme" | "selected" | "onToggle" | "toggle"
> & {
    paddingSize: ECardContentPaddingSize;
};

const meta = {
    title: "Components/Cards/CardAction",
    component: CardAction,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Интерактивная карточка с возможностью выбора.
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CardAction} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    argTypes: {
        paddingSize: {
            control: { type: "select" },
            options: Object.values(ECardContentPaddingSize),
            desciption: "Возможные размеры внутреннего отступа",
            table: { defaultValue: { summary: ECardContentPaddingSize.MD } },
        },
        roundingSize: {
            control: { type: "select" },
            options: Object.values(ECardRoundingSize),
            description: "Размер скругления карточки",
            table: { defaultValue: { summary: ECardRoundingSize.MD } },
        },
        theme: {
            control: { type: "select" },
            options: Object.values(ECardTheme),
            description: "Тема карточки",
            table: { defaultValue: { summary: ECardTheme.GENERAL } },
        },
        selected: { table: { disable: true } },
        onToggle: { table: { disable: true } },
        toggle: { table: { disable: true } },
    },
} satisfies Meta<TCardActionPlaygroundProps>;

export default meta;

export const Playground: StoryObj<TCardActionPlaygroundProps> = {
    tags: ["!autodocs"],
    parameters: {
        controls: {
            include: ["paddingSize", "roundingSize", "theme"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: (args) => {
        const { paddingSize, theme, ...cardArgs } = args;

        const [isSelected, setIsSelected] = useState(args?.selected ?? false);

        const handleToggle = (selected: boolean) => {
            setIsSelected(selected);
            args.onToggle?.(selected);
            args.toggle?.(selected);
            action("onToggle")(selected);
            action("toggle")(selected);
        };

        const buttomTheme = isSelected ? EButtonTheme.SECONDARY_LIGHT : EButtonTheme.SECONDARY;
        const isGeneralTheme = theme === ECardTheme.GENERAL;

        return (
            <div style={{ width: "216px" }}>
                <CardAction {...cardArgs} theme={theme} selected={isSelected} toggle={handleToggle}>
                    <CardAction.Media
                        style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                    />
                    <CardAction.Content paddingSize={paddingSize}>
                        <CardAction.Content.Header>
                            <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                                Title text
                            </Title>
                        </CardAction.Content.Header>
                        <CardAction.Content.Body>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                                <Text size={ETextSize.B3} style={{ marginLeft: "8px" }}>
                                    List item text
                                </Text>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                                <Text size={ETextSize.B3} style={{ marginLeft: "8px" }}>
                                    List item text
                                </Text>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                                <DefaulticonStrokePrdIcon20 paletteIndex={5} />
                                <Text size={ETextSize.B3} style={{ marginLeft: "8px" }}>
                                    List item text
                                </Text>
                            </div>
                            <Gap size={8} />
                            <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                                This message provides additional context or highlights important information to note.
                            </Text>
                            <Gap size={8} />
                            <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
                                <Link onClick={() => {}}>Link text</Link>
                            </Text>
                        </CardAction.Content.Body>
                        {isGeneralTheme && (
                            <CardAction.Content.Footer>
                                <Button theme={buttomTheme} size={EComponentSize.SM}>
                                    Button text
                                </Button>
                            </CardAction.Content.Footer>
                        )}
                    </CardAction.Content>
                </CardAction>
            </div>
        );
    },
};

export const Default: StoryObj<TCardActionPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardActionDefaultExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardActionDefaultExample,
};

export const Themes: StoryObj<TCardActionPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardActionThemesExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardActionThemesExample,
};

export const PaddingSizes: StoryObj<TCardActionPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardActionPaddingSizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardActionPaddingSizesExample,
};

export const RoundingSizes: StoryObj<TCardActionPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: CardActionRoundingSizesExampleSource,
                language: "tsx",
            },
        },
    },
    render: CardActionRoundingSizesExample,
};
