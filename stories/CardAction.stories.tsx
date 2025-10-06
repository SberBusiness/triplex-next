import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import {
    Button,
    EButtonTheme,
    EButtonSize,
    CardAction,
    ECardTheme,
    ECardRoundingSize,
    ECardContentPaddingSize,
    Checkbox,
    ECheckboxSize,
    Title,
    ETitleSize,
    Text,
    ETextSize,
    EFontType,
    Link,
    Gap,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon20, SuccessStrokeStsIcon16 } from "@sberbusiness/icons-next";

/** Ширина интерактивной карточки */
const CONTAINER_WIDTH = "232px";
/** Высота блока Media */
const MEDIA_HEIGHT = "129px";

const meta = {
    title: "Components/Cards/CardAction",
    component: CardAction,
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
        selected: { control: { type: "boolean" }, description: "Контролируемое состояние выбора" },
        className: { table: { disable: true } },
        onToggle: { table: { disable: true } },
        toggle: { table: { disable: true } },
        onClick: { table: { disable: true } },
        onMouseDown: { table: { disable: true } },
        onKeyDown: { table: { disable: true } },
        onFocus: { table: { disable: true } },
        onBlur: { table: { disable: true } },
        children: { table: { disable: true } },
    },
} satisfies Meta<typeof CardAction>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: "General",
    args: {
        paddingSize: ECardContentPaddingSize.MD,
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
        selected: false,
        onToggle: action("onToggle"),
    },
    render: (args) => {
        const { paddingSize, selected, theme, ...cardArgs } = args as typeof args & {
            paddingSize?: ECardContentPaddingSize;
            selected?: boolean;
            theme?: ECardTheme;
        };

        return (
            <CardAction {...cardArgs} selected={selected} theme={theme} style={{ width: CONTAINER_WIDTH }}>
                <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
                <CardAction.Content paddingSize={paddingSize ?? ECardContentPaddingSize.MD}>
                    <CardAction.Content.Header>
                        <Title tag="div" size={ETitleSize.H3}>
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
                        {!selected ? (
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                                Button text
                            </Button>
                        ) : (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <SuccessStrokeStsIcon16 paletteIndex={0} />
                                <Text size={ETextSize.B3} style={{ marginLeft: "8px", marginRight: "18px" }}>
                                    Selected
                                </Text>
                            </div>
                        )}
                    </CardAction.Content.Footer>
                </CardAction.Content>
            </CardAction>
        );
    },
};

export const Secondary: Story = {
    name: "Secondary",
    args: {
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.SECONDARY,
        onToggle: action("onToggle"),
    },
    render: (args) => {
        const { paddingSize, selected, ...cardArgs } = args as typeof args & {
            paddingSize?: ECardContentPaddingSize;
            selected?: boolean;
        };

        return (
            <CardAction {...cardArgs} selected={selected} style={{ width: CONTAINER_WIDTH }}>
                <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
                <CardAction.Content paddingSize={paddingSize ?? ECardContentPaddingSize.MD}>
                    <CardAction.Content.Header>
                        <Title tag="div" size={ETitleSize.H3}>
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
                        {!selected ? (
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                                Button text
                            </Button>
                        ) : (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <SuccessStrokeStsIcon16 paletteIndex={0} />
                                <Text size={ETextSize.B3} style={{ marginLeft: "8px", marginRight: "18px" }}>
                                    Selected
                                </Text>
                            </div>
                        )}
                    </CardAction.Content.Footer>
                </CardAction.Content>
            </CardAction>
        );
    },
};

export const SmallPaddingSize: Story = {
    name: "Small padding size",
    args: {
        roundingSize: ECardRoundingSize.MD,
        onToggle: action("onToggle"),
    },
    render: (args) => (
        <CardAction {...args} style={{ width: CONTAINER_WIDTH }}>
            <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
            <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
                <CardAction.Content.Header>
                    <Title tag="div" size={ETitleSize.H3}>
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
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                        Button text
                    </Button>
                </CardAction.Content.Footer>
            </CardAction.Content>
        </CardAction>
    ),
};

export const SmallRoundingSize: Story = {
    name: "Small rounding size",
    args: {
        roundingSize: ECardRoundingSize.SM,
        onToggle: action("onToggle"),
    },
    render: (args) => (
        <CardAction {...args} style={{ width: CONTAINER_WIDTH }}>
            <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
            <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
                <CardAction.Content.Header>
                    <Title tag="div" size={ETitleSize.H3}>
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
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                        Button text
                    </Button>
                </CardAction.Content.Footer>
            </CardAction.Content>
        </CardAction>
    ),
};

export const Controlled: Story = {
    name: "Controlled",
    args: {
        roundingSize: ECardRoundingSize.MD,
        theme: ECardTheme.GENERAL,
    },
    render: (args) => {
        const [selected, setSelected] = React.useState<boolean>(false);

        const handleChangeSelect = () => setSelected((prev) => !prev);

        return (
            <div style={{ width: CONTAINER_WIDTH }}>
                <div style={{ marginBottom: 16 }}>
                    <Checkbox size={ECheckboxSize.MD} checked={selected} onChange={handleChangeSelect}>
                        Selected
                    </Checkbox>
                </div>
                <CardAction
                    {...args}
                    selected={selected}
                    toggle={setSelected}
                    onToggle={action("onToggle")}
                    style={{ width: CONTAINER_WIDTH }}
                >
                    <CardAction.Media
                        style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }}
                    />
                    <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
                        <CardAction.Content.Header>
                            <Title tag="div" size={ETitleSize.H3}>
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
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.SM}>
                                Button text
                            </Button>
                        </CardAction.Content.Footer>
                    </CardAction.Content>
                </CardAction>
            </div>
        );
    },
};
