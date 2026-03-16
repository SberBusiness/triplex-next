import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import {
    Button,
    EButtonTheme,
    CardAction,
    ICardActionProps,
    ECardTheme,
    ECardRoundingSize,
    ECardContentPaddingSize,
    Title,
    ETitleSize,
    EFontWeightTitle,
    Text,
    ETextSize,
    EFontType,
    Link,
    Gap,
} from "../../src/components";
import { EComponentSize } from "../../src/enums/EComponentSize";
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
        testRunner: { skip: true },
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
            <div style={{ width: "250px" }}>
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
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: (args) => {
        const { paddingSize, ...cardArgs } = args;
        const [isSelected, setIsSelected] = useState(false);

        return (
            <div style={{ width: "250px" }}>
                <CardAction {...cardArgs} selected={isSelected} toggle={setIsSelected}>
                    <CardAction.Content paddingSize={paddingSize}>
                        <CardAction.Content.Header>
                            <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                                Title text
                            </Title>
                        </CardAction.Content.Header>
                        <CardAction.Content.Body>
                            <Text tag="div" size={ETextSize.B3}>
                                Body content
                            </Text>
                        </CardAction.Content.Body>
                    </CardAction.Content>
                </CardAction>
            </div>
        );
    },
};

export const Themes: StoryObj<TCardActionPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [isSelectedGeneral, setIsSelectedGeneral] = useState(false);
        const [isSelectedSecondary, setIsSelectedSecondary] = useState(false);

        const handleToggleGeneral = (selected: boolean) => {
            setIsSelectedGeneral(selected);
        };

        const handleToggleSecondary = (selected: boolean) => {
            setIsSelectedSecondary(selected);
        };

        return (
            <div style={{ width: "500px", display: "flex", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text size={ETextSize.B3}>ECardTheme.GENERAL</Text>
                    <CardAction
                        roundingSize={ECardRoundingSize.MD}
                        theme={ECardTheme.GENERAL}
                        selected={isSelectedGeneral}
                        toggle={handleToggleGeneral}
                    >
                        <CardAction.Media
                            style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                        />
                        <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
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
                                    This message provides additional context or highlights important information to
                                    note.
                                </Text>
                                <Gap size={8} />
                                <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
                                    <Link onClick={() => {}}>Link text</Link>
                                </Text>
                            </CardAction.Content.Body>
                        </CardAction.Content>
                    </CardAction>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text size={ETextSize.B3}>ECardTheme.SECONDARY</Text>
                    <CardAction
                        roundingSize={ECardRoundingSize.MD}
                        theme={ECardTheme.SECONDARY}
                        selected={isSelectedSecondary}
                        toggle={handleToggleSecondary}
                    >
                        <CardAction.Media
                            style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                        />
                        <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
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
                                    This message provides additional context or highlights important information to
                                    note.
                                </Text>
                                <Gap size={8} />
                                <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
                                    <Link onClick={() => {}}>Link text</Link>
                                </Text>
                            </CardAction.Content.Body>
                        </CardAction.Content>
                    </CardAction>
                </div>
            </div>
        );
    },
};

export const PaddingSizes: StoryObj<TCardActionPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [isSelectedMD, setIsSelectedMD] = useState(false);
        const [isSelectedSM, setIsSelectedSM] = useState(false);

        const handleToggleMD = (selected: boolean) => {
            setIsSelectedMD(selected);
        };

        const handleToggleSM = (selected: boolean) => {
            setIsSelectedSM(selected);
        };

        return (
            <div style={{ width: "500px", display: "flex", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text size={ETextSize.B3}>ECardContentPaddingSize.SM</Text>
                    <CardAction
                        roundingSize={ECardRoundingSize.MD}
                        theme={ECardTheme.GENERAL}
                        selected={isSelectedSM}
                        toggle={handleToggleSM}
                    >
                        <CardAction.Media
                            style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                        />
                        <CardAction.Content paddingSize={ECardContentPaddingSize.SM}>
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
                                    This message provides additional context or highlights important information to
                                    note.
                                </Text>
                                <Gap size={8} />
                                <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
                                    <Link onClick={() => {}}>Link text</Link>
                                </Text>
                            </CardAction.Content.Body>
                        </CardAction.Content>
                    </CardAction>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text size={ETextSize.B3}>ECardContentPaddingSize.MD</Text>
                    <CardAction
                        roundingSize={ECardRoundingSize.MD}
                        theme={ECardTheme.GENERAL}
                        selected={isSelectedMD}
                        toggle={handleToggleMD}
                    >
                        <CardAction.Media
                            style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                        />
                        <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
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
                                    This message provides additional context or highlights important information to
                                    note.
                                </Text>
                                <Gap size={8} />
                                <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
                                    <Link onClick={() => {}}>Link text</Link>
                                </Text>
                            </CardAction.Content.Body>
                        </CardAction.Content>
                    </CardAction>
                </div>
            </div>
        );
    },
};

export const RoundingSizes: StoryObj<TCardActionPlaygroundProps> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [isSelectedSM, setIsSelectedSM] = useState(false);
        const [isSelectedMD, setIsSelectedMD] = useState(false);

        const handleToggleSM = (selected: boolean) => {
            setIsSelectedSM(selected);
        };

        const handleToggleMD = (selected: boolean) => {
            setIsSelectedMD(selected);
        };

        return (
            <div style={{ width: "500px", display: "flex", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text size={ETextSize.B3}>ECardRoundingSize.SM</Text>
                    <CardAction
                        roundingSize={ECardRoundingSize.SM}
                        theme={ECardTheme.GENERAL}
                        selected={isSelectedSM}
                        toggle={handleToggleSM}
                    >
                        <CardAction.Media
                            style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                        />
                        <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
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
                                    This message provides additional context or highlights important information to
                                    note.
                                </Text>
                                <Gap size={8} />
                                <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
                                    <Link onClick={() => {}}>Link text</Link>
                                </Text>
                            </CardAction.Content.Body>
                        </CardAction.Content>
                    </CardAction>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Text size={ETextSize.B3}>ECardRoundingSize.MD</Text>
                    <CardAction
                        roundingSize={ECardRoundingSize.MD}
                        theme={ECardTheme.GENERAL}
                        selected={isSelectedMD}
                        toggle={handleToggleMD}
                    >
                        <CardAction.Media
                            style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                        />
                        <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
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
                                    This message provides additional context or highlights important information to
                                    note.
                                </Text>
                                <Gap size={8} />
                                <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
                                    <Link onClick={() => {}}>Link text</Link>
                                </Text>
                            </CardAction.Content.Body>
                        </CardAction.Content>
                    </CardAction>
                </div>
            </div>
        );
    },
};
