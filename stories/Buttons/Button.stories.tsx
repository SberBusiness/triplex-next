import React from "react";
import { Button } from "../../src/components/Button";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { Gap } from "../../src/components/Gap";
import { EButtonTheme, EButtonSize } from "../../src/components/Button/enums";
import { DefaulticonStrokePrdIcon32, DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

export default {
    title: "Components/Buttons/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент кнопки с различными темами, размерами и состояниями.

## Особенности

- **Темы**: General, Secondary, SecondaryLight, Danger, Link
- **Размеры**: small (SM), medium (MD), large (LG)
- **Состояния**: disabled, loading, expanded
- **Режимы**: обычный, блочный (block)
- **Доступность**: поддержка ARIA атрибутов и клавиатурной навигации
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof Button> = {
    name: "Playground",
    args: {
        children: "Button text",
        onClick: action("On Click"),
        theme: EButtonTheme.GENERAL,
        size: EButtonSize.MD,
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
            options: Object.values(EButtonSize),
            description: "Размер кнопки",
            table: {
                defaultValue: { summary: EButtonSize.MD },
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
        onClick: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <div style={{ width: "250px" }}>
            <Button {...args} />
        </div>
    ),
};

export const Default: StoryObj<typeof Button> = {
    name: "Default",
    args: {
        children: "Button text",
        onClick: action("On Click"),
        theme: EButtonTheme.GENERAL,
        size: EButtonSize.MD,
    },
    argTypes: {
        theme: {
            table: {
                disable: true,
            },
        },
        size: {
            table: {
                disable: true,
            },
        },
        block: {
            table: {
                disable: true,
            },
        },
        loading: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },

    render: (args) => (
        <div style={{ width: "250px" }}>
            <Button {...args} />
        </div>
    ),
};

export const DifferentThemes: StoryObj<typeof Button> = {
    name: "Different Themes",
    render: () => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                    General
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.SECONDARY_LIGHT} size={EButtonSize.MD}>
                    Secondary Light
                </Button>
                <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
                    Danger
                </Button>
                <Button theme={EButtonTheme.LINK} size={EButtonSize.MD}>
                    Link
                </Button>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Доступные темы кнопок",
            },
        },
    },
};

export const Icon: StoryObj<typeof Button> = {
    name: "Icon",
    argTypes: {
        icon: { table: { disable: true } },
    },
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                size={EButtonSize.SM}
                theme={EButtonTheme.GENERAL}
            />
            <Button
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                size={EButtonSize.MD}
                theme={EButtonTheme.SECONDARY}
            />
            <Button
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                size={EButtonSize.MD}
                theme={EButtonTheme.SECONDARY_LIGHT}
            />
            <Button
                icon={<DefaulticonStrokePrdIcon32 paletteIndex={7} />}
                size={EButtonSize.LG}
                theme={EButtonTheme.DANGER}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка с иконкой, переданной свойством icon",
            },
        },
    },
};

export const DifferentSizes: StoryObj<typeof Button> = {
    name: "Different Sizes",
    render: () => (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.GENERAL}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.GENERAL}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.GENERAL}>
                    LG
                </Button>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.SECONDARY}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.SECONDARY}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.SECONDARY}>
                    LG
                </Button>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.SECONDARY_LIGHT}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.SECONDARY_LIGHT}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.SECONDARY_LIGHT}>
                    LG
                </Button>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.DANGER}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.DANGER}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.DANGER}>
                    LG
                </Button>
            </div>
            <Gap size={16} />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button size={EButtonSize.SM} theme={EButtonTheme.LINK}>
                    SM
                </Button>
                <Button size={EButtonSize.MD} theme={EButtonTheme.LINK}>
                    MD
                </Button>
                <Button size={EButtonSize.LG} theme={EButtonTheme.LINK}>
                    LG
                </Button>
            </div>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: "Доступные размеры кнопок",
            },
        },
    },
};

export const BlockMode: StoryObj<typeof Button> = {
    name: "Block mode",
    render: () => (
        <>
            <Button block theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                General
            </Button>
            <Gap size={16} />
            <Button block theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Secondary
            </Button>
            <Gap size={16} />
            <Button block theme={EButtonTheme.SECONDARY_LIGHT} size={EButtonSize.MD}>
                Secondary Light
            </Button>
            <Gap size={16} />
            <Button
                block
                size={EButtonSize.MD}
                theme={EButtonTheme.DANGER}
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
            />
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в блочном режиме",
            },
        },
    },
};

export const Disabled: StoryObj<typeof Button> = {
    name: "Disabled",
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button disabled theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                General
            </Button>
            <Button disabled theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Secondary
            </Button>
            <Button disabled theme={EButtonTheme.SECONDARY_LIGHT} size={EButtonSize.MD}>
                Secondary Light
            </Button>
            <Button disabled theme={EButtonTheme.DANGER} size={EButtonSize.MD}>
                Danger
            </Button>
            <Button disabled theme={EButtonTheme.LINK} size={EButtonSize.MD}>
                Link
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии disabled",
            },
        },
    },
};

export const Loading: StoryObj<typeof Button> = {
    name: "Loading",
    render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button loading theme={EButtonTheme.GENERAL} size={EButtonSize.SM}>
                Button text
            </Button>
            <Button
                loading
                icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                size={EButtonSize.SM}
                theme={EButtonTheme.GENERAL}
            />
            <Button loading theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                Button text
            </Button>
            <Button loading theme={EButtonTheme.SECONDARY_LIGHT} size={EButtonSize.MD}>
                Button text
            </Button>
            <Button loading theme={EButtonTheme.DANGER} size={EButtonSize.LG}>
                Button text
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии loading",
            },
        },
    },
};

export const Expanded: StoryObj<typeof Button> = {
    name: "Expanded",
    render: () => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD} aria-expanded>
                    General
                </Button>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} aria-expanded>
                    Secondary
                </Button>
                <Button theme={EButtonTheme.SECONDARY_LIGHT} size={EButtonSize.MD} aria-expanded>
                    Secondary Light
                </Button>
                <Button theme={EButtonTheme.DANGER} size={EButtonSize.MD} aria-expanded>
                    Danger
                </Button>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EButtonSize.MD}
                    icon={<DefaulticonStrokePrdIcon20 paletteIndex={7} />}
                    aria-expanded
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Кнопка в состоянии expanded",
            },
        },
    },
};

export const TextWithIcon: StoryObj<typeof Button> = {
    name: "Text With Icon",
    args: {
        icon: <DefaulticonStrokePrdIcon32 paletteIndex={5} />,
        theme: EButtonTheme.GENERAL,
        size: EButtonSize.MD,
    },
    argTypes: {
        icon: { table: { disable: true } },
        theme: {
            control: { type: "select" },
            options: Object.values(EButtonTheme),
        },
        size: {
            control: { type: "select" },
            options: Object.values(EButtonSize),
            table: {
                defaultValue: { summary: EButtonSize.MD },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Контент кнопки состоит из текста и иконки",
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button {...args}>&nbsp;Button text</Button>
        </div>
    ),
};
