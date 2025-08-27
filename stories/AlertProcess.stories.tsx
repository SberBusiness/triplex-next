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
- Передавать контент для спойлера возможно через свойство **expandableContent**
- Состояние спойлера задается через свойство **expandableContentOpen**
- Обработчик нажатия на иконку закрытия передается снаружи через свойство **onClose**
- Компонент не задает размеры или цвет текста. Контент передается с нужными компонентами Typography

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
<AlertProcess type={EAlertType.ERROR} expandableContent={
    <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
        Контент, который можно скрыть или показать по клику на иконку
    </Text>
}>
    <Text size={ETextSize.B1} type={EFontType.ERROR}>
        Основной контент
    </Text>
</AlertProcess>

// С изначально раскрытым контентом
<AlertProcess type={EAlertType.SYSTEM} expandableContentOpen expandableContent={
    <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
        Контент, который можно скрыть или показать по клику на иконку
    </Text>
}>
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
        expandableContentOpen: false,
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
            control: { type: "text" },
            description: "Контент спойлера",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        expandableContentOpen: {
            control: { type: "boolean" },
            if: { arg: "expandableContent" },
            description: "Начальное состояние спойлера",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        onExpandableContentOpen: {
            table: {
                disable: true,
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
        renderSpoiler: {
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
            <div style={{ width: "750px" }}>
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        expandableContentOpen: {
            table: {
                disable: true,
            },
        },
        onExpandableContentOpen: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        renderSpoiler: {
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        expandableContentOpen: {
            table: {
                disable: true,
            },
        },
        onExpandableContentOpen: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        renderSpoiler: {
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "750px" }}>
            <AlertProcess type={EAlertType.INFO} renderIcon={<HintSrvIcon16 />}>
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        expandableContentOpen: {
            table: {
                disable: true,
            },
        },
        onExpandableContentOpen: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        renderSpoiler: {
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
        expandableContent: {
            table: {
                disable: true,
            },
        },
        expandableContentOpen: {
            table: {
                disable: true,
            },
        },
        onExpandableContentOpen: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        renderSpoiler: {
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
    args: {
        expandableContent: (
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                У вас нет прав на подписание и отправку заявления в страховую компанию. Подписывать заявления, а также
                заверять документы, имеет право генеральный директор на основании устава, владалец ИП на основании
                доверенности.
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
        expandableContentOpen: {
            table: {
                disable: true,
            },
        },
        onExpandableContentOpen: {
            table: {
                disable: true,
            },
        },
        renderIcon: {
            table: {
                disable: true,
            },
        },
        renderSpoiler: {
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
    render: function Render(args) {
        const [expanded, setExpanded] = useState(false);

        const renderSpoiler = () => (
            <AlertProcess.Spoiler expandableContentOpen={expanded}>{args.expandableContent}</AlertProcess.Spoiler>
        );

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "750px" }}>
                <AlertProcess
                    type={EAlertType.INFO}
                    onExpandableContentOpen={setExpanded}
                    expandableContentOpen={expanded}
                    expandableContent={args.expandableContent}
                    renderSpoiler={renderSpoiler}
                />
            </div>
        );
    },
};
