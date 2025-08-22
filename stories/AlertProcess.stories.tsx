import React from "react";
import { AlertProcess } from "../src/components/Alert/AlertProcess/AlertProcess";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { EAlertType } from "../src/components/Alert/EAlertType";
import { Text } from "../src/components/Typography/Text";
import { EFontType, ETextSize } from "../src/components/Typography/enums";
import { Button } from "../src/components/Button";
import { EButtonSize, EButtonTheme } from "../src/components/Button";
import { Gap } from "../src/components/Gap";
import { HintSrvIcon16 } from "@sberbusiness/icons-next/HintSrvIcon16";

export default {
    title: "Components/AlertProcess",
    component: AlertProcess,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент процессного предупреждения с возможностью скрытия/раскрытия контента.

## Особенности

- **Типы**: Info, Warning, Error, System, Feature
- Компонент не задает размеры или цвет текста. Контент передается с нужными компонентами Typography
- Управлять скрытием и раскрытием контента возможно через свойство **expandableContent**
- Обработчик нажатия на иконку закрытия передается снаружи через свойство **onClose**

## Использование

\`\`\`tsx
import { AlertProcess, EAlertType } from '@sberbusiness/triplex-next';
import { Text, ETextSize, EFontType } from '@sberbusiness/triplex-next';

// Информационное сообщение
<AlertProcess type={EAlertType.INFO}>
    <Text size={ETextSize.B1} type={EFontType.PRIMARY}>
        Это информационное сообщение
    </Text>
</AlertProcess>

// С возможностью закрытия
<AlertProcess type={EAlertType.WARNING} closable onClose={handleClose}>
    <Text size={ETextSize.B1} type={EFontType.WARNING}>
        Это предупреждение можно закрыть
    </Text>
</AlertProcess>

// С раскрываемым контентом
<AlertProcess type={EAlertType.ERROR} expandableContent>
    <Text size={ETextSize.B1} type={EFontType.ERROR}>
        Основной контент
    </Text>
    <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
        Дополнительная информация, которая может быть скрыта
    </Text>
</AlertProcess>

// С изначально раскрытым контентом
<AlertProcess type={EAlertType.SYSTEM} expandableContent initialExpanded>
    <Text size={ETextSize.B1} type={EFontType.PRIMARY}>
        Контент изначально развернут
    </Text>
</AlertProcess>

// С кастомной иконкой
<AlertProcess type={EAlertType.INFO} renderIcon={<CustomIcon />}>
    <Text size={ETextSize.B1} type={EFontType.INFO}>
        Сообщение с кастомной иконкой
    </Text>
</AlertProcess>
\`\`\`
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
        expandableContent: false,
        initialExpanded: false,
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
        expandableContent: {
            control: { type: "boolean" },
            description: "Возможность скрытия/раскрытия контента",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        initialExpanded: {
            control: { type: "boolean" },
            description: "Начальное состояние развернутого контента",
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
    render: (args) => (
        <div style={{ width: "750px" }}>
            <AlertProcess {...args} />
        </div>
    ),
};

export const Default: StoryObj<typeof AlertProcess> = {
    name: "Default",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "750px" }}>
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        initialExpanded: {
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
};

export const WithCustomIcon: StoryObj<typeof AlertProcess> = {
    name: "With Custom Icon",
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "750px" }}>
            <AlertProcess type={EAlertType.INFO} renderIcon={<HintSrvIcon16 />}>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
            </AlertProcess>
        </div>
    ),
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        initialExpanded: {
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        initialExpanded: {
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "750px" }}>
            <AlertProcess type={EAlertType.INFO} {...args} />
            <AlertProcess type={EAlertType.WARNING} {...args} />
            <AlertProcess type={EAlertType.ERROR} {...args} />
            <AlertProcess type={EAlertType.SYSTEM} {...args} />
            <AlertProcess type={EAlertType.FEATURE} {...args} />
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        initialExpanded: {
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "750px" }}>
            <AlertProcess type={EAlertType.INFO} {...args} />
            <AlertProcess type={EAlertType.WARNING} {...args} />
            <AlertProcess type={EAlertType.ERROR} {...args} />
            <AlertProcess type={EAlertType.SYSTEM} {...args} />
            <AlertProcess type={EAlertType.FEATURE} {...args} />
        </div>
    ),
};

export const Spoiler: StoryObj<typeof AlertProcess> = {
    name: "Spoiler",
    args: {
        closable: true,
        onClose: action("onClose"),
        expandableContent: (
            <>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    У вас нет прав на подписание и отправку заявления в страховую компанию. Подписывать заявления, а
                    также заверять документы, имеет право генеральный директор на основании устава, владалец ИП на
                    основании доверенности.
                </Text>
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        initialExpanded: {
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "750px" }}>
            <AlertProcess type={EAlertType.INFO} {...args} />
            <AlertProcess type={EAlertType.WARNING} {...args} />
            <AlertProcess type={EAlertType.ERROR} {...args} />
            <AlertProcess type={EAlertType.SYSTEM} {...args} />
            <AlertProcess type={EAlertType.FEATURE} {...args} />
        </div>
    ),
};
