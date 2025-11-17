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
    Checkbox,
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
import "./Cards.less";

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
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Интерактивная карточка с возможностью выбора. Поддерживает скругления и контролируемое состояние.

## Особенности

- **Темы**: General, Secondary
- **Размеры внутреннего отступа**: small (SM), medium (MD)
- **Размеры скругления карточки**: small (SM), medium (MD)
- **Состояния**: selected

## Использование

\`\`\`tsx
import { CardAction, ECardTheme, ECardRoundingSize, ECardContentPaddingSize } from '@sberbusiness/triplex-next';

const [selected, setSelected] = React.useState(false);

const handleChangeSelect = () => setSelected((prev) => !prev);

<CardAction
    selected={selected}
    toggle={setSelected}
    onToggle={action("onToggle")}
    roundingSize={ECardRoundingSize.MD}
    theme={ECardTheme.GENERAL}
    style={{ width: "232px" }}
>
    <CardAction.Media style={{ backgroundImage: "url(example.png)", height: "129px" }} />
    <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
        <CardAction.Content.Header>
            Title text
        </CardAction.Content.Header>
        <CardAction.Content.Body>
            Body content
        </CardAction.Content.Body>
        <CardAction.Content.Footer>
            Footer content
        </CardAction.Content.Footer>
    </CardAction.Content>
</CardAction>
\`\`\`
                `,
            },
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

type Story = StoryObj<TCardActionPlaygroundProps>;

export const Playground: Story = {
    name: "Playground",
    parameters: {
        docs: {
            description: {
                story: "Интерактивная демонстрация Card Action. Позволяет настраивать все основные свойства компонента.",
            },
        },
        controls: { exclude: ["selected"] },
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: function Render(args) {
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
            <div className="card-playground-preview">
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

export const General: Story = {
    name: "General",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Action General. Скругление карточки: MD, размер внутреннего отступа контента карточки: MD.",
            },
        },
        controls: { exclude: ["theme", "selected"] },
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: function Render(args) {
        const { paddingSize, ...cardArgs } = args;

        const [isSelected, setIsSelected] = useState(args?.selected ?? false);

        const handleToggle = (selected: boolean) => {
            setIsSelected(selected);
            args.onToggle?.(selected);
            args.toggle?.(selected);
            action("onToggle")(selected);
            action("toggle")(selected);
        };

        const buttomTheme = isSelected ? EButtonTheme.SECONDARY_LIGHT : EButtonTheme.SECONDARY;

        return (
            <div className="card-playground-preview">
                <CardAction {...cardArgs} selected={isSelected} toggle={handleToggle}>
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
                        <CardAction.Content.Footer>
                            <Button theme={buttomTheme} size={EComponentSize.SM}>
                                Button text
                            </Button>
                        </CardAction.Content.Footer>
                    </CardAction.Content>
                </CardAction>
            </div>
        );
    },
};

export const Secondary: Story = {
    name: "Secondary",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Action Secondary. Скругление карточки: MD, размер внутреннего отступа контента карточки: MD.",
            },
        },
        controls: { exclude: ["theme", "selected"] },
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.SECONDARY,
        selected: false,
    },
    render: function Render(args) {
        const { paddingSize, ...cardArgs } = args;

        const [isSelected, setIsSelected] = useState(args?.selected ?? false);

        const handleToggle = (selected: boolean) => {
            setIsSelected(selected);
            args.onToggle?.(selected);
            args.toggle?.(selected);
            action("onToggle")(selected);
            action("toggle")(selected);
        };

        return (
            <div className="card-playground-preview">
                <CardAction {...cardArgs} selected={isSelected} toggle={handleToggle}>
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
                    </CardAction.Content>
                </CardAction>
            </div>
        );
    },
};

export const SmallPaddingSize: Story = {
    name: "Small padding size",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Action. Размер внутреннего отступа контента карточки: SM.",
            },
        },
        controls: { exclude: ["paddingSize", "selected"] },
    },
    args: {
        paddingSize: ECardContentPaddingSize.SM,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: function Render(args) {
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
            <div className="card-playground-preview">
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

export const SmallRoundingSize: Story = {
    name: "Small rounding size",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Action. Скругление карточки: SM.",
            },
        },
        controls: { exclude: ["roundingSize", "selected"] },
    },
    args: {
        paddingSize: ECardContentPaddingSize.SM,
        roundingSize: ECardRoundingSize.SM,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: function Render(args) {
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
            <div className="card-playground-preview">
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

export const Controlled: Story = {
    name: "Controlled",
    parameters: {
        docs: {
            description: {
                story: "Пример использования Card Action. Позволяет переключаться в состояние Selected и обратно",
            },
        },
        controls: { exclude: ["selected"] },
    },
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
    },
    render: function Render(args) {
        const { paddingSize, theme, ...cardArgs } = args;

        const [isSelected, setIsSelected] = useState<boolean>(args?.selected ?? false);

        const handleChangeSelect = () => setIsSelected((prev) => !prev);

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
            <div className="card-playground-preview">
                <Checkbox size={EComponentSize.MD} checked={isSelected} onChange={handleChangeSelect}>
                    Selected
                </Checkbox>
                <Gap size={16} />
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
