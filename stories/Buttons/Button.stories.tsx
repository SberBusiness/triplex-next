import React from "react";
import { Button, EButtonTheme } from "../../src/components/Button";
import { StoryObj } from "@storybook/react";
import { Gap } from "../../src/components/Gap";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { DefaulticonStrokePrdIcon32, DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    Title as DocsTitle,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
} from "@storybook/addon-docs/blocks";
import { Text, ETextSize } from "../../src/components/Typography";

export default {
    title: "Components/Buttons/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент-кнопка.

## Особенности

- Можно использовать в строчном или блочном (свойство block) режиме.
- Передать иконку можно через свойство icon.
                `,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Button} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof Button> = {
    tags: ["!autodocs"],
    args: {
        children: "Button text",
        theme: EButtonTheme.GENERAL,
        size: EComponentSize.MD,
        block: false,
        loading: false,
    },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: Object.values(EButtonTheme),
            description: "Тема кнопки",
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер кнопки",
            table: {
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        block: {
            control: { type: "boolean" },
            description: "Блочный режим",
            table: {
                type: { summary: "boolean" },
            },
        },
        loading: {
            control: { type: "boolean" },
            description: "Режим загрузки",
            table: {
                type: { summary: "boolean" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Контент кнопки",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["theme", "size", "block", "loading", "children"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => (
        <div style={{ width: "250px" }}>
            <Button {...args} />
        </div>
    ),
};

export const Default: StoryObj<typeof Button> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div style={{ maxWidth: "250px" }}>
            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                Button text
            </Button>
        </div>
    ),
};

export const States: StoryObj<typeof Button> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text size={ETextSize.B3}>Expanded</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} aria-expanded>
                        General
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} aria-expanded>
                        Secondary
                    </Button>
                    <Button theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD} aria-expanded>
                        Secondary Light
                    </Button>
                    <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD} aria-expanded>
                        Danger
                    </Button>
                    <Button
                        theme={EButtonTheme.GENERAL}
                        size={EComponentSize.MD}
                        icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                        aria-expanded
                    />
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text size={ETextSize.B3}>Loading</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Button loading theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button loading theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button loading theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button loading theme={EButtonTheme.DANGER} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button
                        loading
                        icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                        size={EComponentSize.MD}
                        theme={EButtonTheme.GENERAL}
                    />
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text size={ETextSize.B3}>Disabled</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Button disabled theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        General
                    </Button>
                    <Button disabled theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Secondary
                    </Button>
                    <Button disabled theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
                        Secondary Light
                    </Button>
                    <Button disabled theme={EButtonTheme.DANGER} size={EComponentSize.MD}>
                        Danger
                    </Button>
                    <Button disabled theme={EButtonTheme.LINK} size={EComponentSize.MD}>
                        Link
                    </Button>
                    <Button
                        icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                        size={EComponentSize.MD}
                        theme={EButtonTheme.GENERAL}
                        disabled
                    />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состояниях expanded, loading, disabled.",
            },
        },
        controls: { disable: true },
    },
};

export const Sizes: StoryObj<typeof Button> = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text size={ETextSize.B3}>EComponentSize.SM</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Button size={EComponentSize.SM} theme={EButtonTheme.GENERAL}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.SM} theme={EButtonTheme.SECONDARY}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.SM} theme={EButtonTheme.SECONDARY_LIGHT}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.SM} theme={EButtonTheme.DANGER}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.SM} theme={EButtonTheme.LINK}>
                        Button text
                    </Button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text size={ETextSize.B3}>EComponentSize.MD</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY_LIGHT}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.DANGER}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.LINK}>
                        Button text
                    </Button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Text size={ETextSize.B3}>EComponentSize.LG</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Button size={EComponentSize.LG} theme={EButtonTheme.GENERAL}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.LG} theme={EButtonTheme.SECONDARY}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.LG} theme={EButtonTheme.SECONDARY_LIGHT}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.LG} theme={EButtonTheme.DANGER}>
                        Button text
                    </Button>
                    <Button size={EComponentSize.LG} theme={EButtonTheme.LINK}>
                        Button text
                    </Button>
                </div>
            </div>
        </div>
    ),
    parameters: {
        controls: { disable: true },
    },
};

export const Themes: StoryObj<typeof Button> = {
    render: () => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                    General
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
                    Secondary Light
                </Button>
                <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD}>
                    Danger
                </Button>
                <Button theme={EButtonTheme.LINK} size={EComponentSize.MD}>
                    Link
                </Button>
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
    },
};

export const WithIcon: StoryObj<typeof Button> = {
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                size={EComponentSize.SM}
                theme={EButtonTheme.GENERAL}
            />
            <Button
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                size={EComponentSize.MD}
                theme={EButtonTheme.SECONDARY}
            />
            <Button
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                size={EComponentSize.MD}
                theme={EButtonTheme.SECONDARY_LIGHT}
            />
            <Button
                icon={<DefaulticonStrokePrdIcon32 paletteIndex={7} />}
                size={EComponentSize.LG}
                theme={EButtonTheme.DANGER}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка с иконкой, переданной через свойство icon.",
            },
        },
        controls: { disable: true },
    },
};

export const BlockMode: StoryObj<typeof Button> = {
    render: () => (
        <div style={{ maxWidth: 280 }}>
            <Button block theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                General
            </Button>
            <Gap size={16} />
            <Button block theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                Secondary
            </Button>
            <Gap size={16} />
            <Button block theme={EButtonTheme.SECONDARY_LIGHT} size={EComponentSize.MD}>
                Secondary Light
            </Button>
            <Gap size={16} />
            <Button
                block
                size={EComponentSize.MD}
                theme={EButtonTheme.DANGER}
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в блочном режиме (свойство block).",
            },
        },
        controls: { disable: true },
    },
};

export const TextWithIcon: StoryObj<typeof Button> = {
    args: {
        icon: <DefaulticonStrokePrdIcon20 paletteIndex={5} />,
        theme: EButtonTheme.LINK,
        size: EComponentSize.MD,
    },
    parameters: {
        docs: {
            description: {
                story: "Контент кнопки состоит из текста и иконки (свойство icon).",
            },
        },
        controls: { disable: true },
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button {...args}>&nbsp;Button text</Button>
        </div>
    ),
};
