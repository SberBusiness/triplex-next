import React, { useState } from "react";
import { AlertProcess } from "../src/components/Alert/AlertProcess/AlertProcess";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { EAlertType } from "../src/components/Alert/EAlertType";
import { Text } from "../src/components/Typography/Text";
import { EFontType, ETextSize } from "../src/components/Typography/enums";
import { Button } from "../src/components/Button";
import { EButtonSize, EButtonTheme } from "../src/components/Button";
import { Gap } from "../src/components/Gap";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

export default {
    title: "Components/Alerts/AlertProcess",
    component: AlertProcess,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент процессного предупреждения с возможностью скрытия/раскрытия контента.

## Особенности

- **Типы**: Info, Warning, Error, System, Feature
- Передавать контент для спойлера возможно через компонент **AlertProcess.Spoiler**. Состояние спойлера задается через свойство **open**, а обработчик изменения состояния - через свойство **onOpen**
- Обработчик нажатия на иконку закрытия передается снаружи через свойство **onClose**
- Компонент не задает размеры или цвет текста. Контент передается с нужными компонентами Typography
                `,
            },
        },
    },
};

export const Playground: StoryObj<typeof AlertProcess> = {
    name: "Playground",
    args: {
        children: (
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                This message provides context or highlights important information to note.
            </Text>
        ),
        type: EAlertType.INFO,
        closable: false,
        onClose: action("onClose"),
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EAlertType),
            description: "Тип предупреждения",
            table: {
                type: { summary: "EAlertType" },
            },
        },
        closable: {
            control: { type: "boolean" },
            description: "Возможность закрытия предупреждения",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Содержимое предупреждения (используйте Typography компоненты)",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        onClose: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        return (
            <div style={{ maxWidth: "750px" }}>
                <AlertProcess {...args} />
            </div>
        );
    },
};

export const Default: StoryObj<typeof AlertProcess> = {
    name: "Default",
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        closable: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        onClose: {
            table: {
                disable: true,
            },
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "750px" }}>
            <AlertProcess type={EAlertType.INFO}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
            </AlertProcess>
            <AlertProcess type={EAlertType.WARNING}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
            </AlertProcess>
            <AlertProcess type={EAlertType.ERROR}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
            </AlertProcess>
            <AlertProcess type={EAlertType.SYSTEM}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
            </AlertProcess>
            <AlertProcess type={EAlertType.FEATURE}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
            </AlertProcess>
        </div>
    ),
};

export const WithCustomIcon: StoryObj<typeof AlertProcess> = {
    name: "With Custom Icon",
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        closable: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        onClose: {
            table: {
                disable: true,
            },
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "750px" }}>
            <AlertProcess type={EAlertType.INFO} renderIcon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
            </AlertProcess>
        </div>
    ),
};

export const Closable: StoryObj<typeof AlertProcess> = {
    name: "Closable",
    args: {
        closable: true,
        onClose: action("onClose"),
        children: (
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                This message provides context or highlights important information to note.
            </Text>
        ),
    },
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        closable: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        onClose: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "750px" }}>
            <AlertProcess {...args} type={EAlertType.INFO} />
            <AlertProcess {...args} type={EAlertType.WARNING} />
            <AlertProcess {...args} type={EAlertType.ERROR} />
            <AlertProcess {...args} type={EAlertType.SYSTEM} />
            <AlertProcess {...args} type={EAlertType.FEATURE} />
        </div>
    ),
};

export const WithButton: StoryObj<typeof AlertProcess> = {
    name: "With Button",
    args: {
        closable: true,
        onClose: action("onClose"),
        children: (
            <>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
                <Gap size={8} />
                <Button theme={EButtonTheme.LINK} size={EButtonSize.SM}>
                    Button link text
                </Button>
            </>
        ),
    },
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        closable: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        onClose: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "750px" }}>
            <AlertProcess {...args} type={EAlertType.INFO} />
            <AlertProcess {...args} type={EAlertType.WARNING} />
            <AlertProcess {...args} type={EAlertType.ERROR} />
            <AlertProcess {...args} type={EAlertType.SYSTEM} />
            <AlertProcess {...args} type={EAlertType.FEATURE} />
        </div>
    ),
};

export const Spoiler: StoryObj<typeof AlertProcess> = {
    name: "Spoiler",
    argTypes: {
        type: {
            table: {
                disable: true,
            },
        },
        closable: {
            table: {
                disable: true,
            },
        },
        children: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        onClose: {
            table: {
                disable: true,
            },
        },
    },
    render: function Render() {
        const [expanded, setExpanded] = useState(false);

        return (
            <div style={{ maxWidth: "750px" }}>
                <AlertProcess type={EAlertType.INFO}>
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                        По вопросам финмониторинга обращайтесь в рабочие дни с 03:00 до 21:00 МСК с мобильного телефона
                        по номеру 0321, доб. 6. Звонки по России бесплатные.
                    </Text>
                    <AlertProcess.Spoiler open={expanded} onOpen={setExpanded}>
                        <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                            У вас нет прав на подписание и отправку заявления в страховую компанию. Подписывать
                            заявления, а также заверять документы, имеет право генеральный директор на основании устава,
                            владалец ИП на основании доверенности.
                        </Text>
                    </AlertProcess.Spoiler>
                </AlertProcess>
            </div>
        );
    },
};
