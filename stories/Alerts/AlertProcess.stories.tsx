import React, { useState } from "react";
import { AlertProcess } from "../../src/components/Alert/AlertProcess/AlertProcess";
import { StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { EAlertType } from "../../src/components/Alert/EAlertType";
import { Text } from "../../src/components/Typography/Text";
import { EFontType, ETextSize } from "../../src/components/Typography/enums";
import { Button } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Gap } from "../../src/components/Gap";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { Link } from "../../src/components/Link";
import {
    Title,
    Description,
    Primary,
    Controls,
    Stories,
    ArgTypes,
    Heading,
    Subheading,
} from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Alerts/AlertProcess",
    component: AlertProcess,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
        docs: {
            description: {
                component: `
Компонент процессного предупреждения с возможностью скрытия/раскрытия контента.

## Особенности

- Компонент не задает размеры или цвет текста. Контент передается с нужными компонентами Typography.
- Передать контент для спойлера можно через компонент **AlertProcess.Spoiler**.
- Передать кастомную иконку можно через свойство **renderIcon**.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <Subheading>AlertProcess</Subheading>
                    <ArgTypes of={AlertProcess} />
                    <Subheading>AlertProcess.Spoiler</Subheading>
                    <ArgTypes of={AlertProcess.Spoiler} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof AlertProcess> = {
    tags: ["!autodocs"],
    args: {
        children: "This message provides context or highlights important information to note.",
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
    },
    parameters: {
        controls: {
            include: ["type", "closable", "children"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: (args) => {
        return (
            <div style={{ maxWidth: "750px" }}>
                <AlertProcess {...args}>
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                        {args.children}
                    </Text>
                </AlertProcess>
            </div>
        );
    },
};

export const Default: StoryObj<typeof AlertProcess> = {
    parameters: {
        controls: { disable: true },
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
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Компонент с иконкой, переданной через свойство renderIcon.",
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
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const children = (
            <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                This message provides context or highlights important information to note.
            </Text>
        );

        return (
            <div style={{ maxWidth: "750px" }}>
                <AlertProcess type={EAlertType.INFO} closable onClose={action("onClose")}>
                    {children}
                </AlertProcess>
            </div>
        );
    },
};

export const WithButtonLink: StoryObj<typeof AlertProcess> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const children = (
            <>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
                <Gap size={8} />
                <Button theme={EButtonTheme.LINK} size={EComponentSize.SM}>
                    Button link text
                </Button>
            </>
        );

        return (
            <div style={{ maxWidth: "750px" }}>
                <AlertProcess type={EAlertType.INFO}>{children}</AlertProcess>
            </div>
        );
    },
};

export const WithLink: StoryObj<typeof AlertProcess> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const children = (
            <>
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    This message provides context or highlights important information to note.
                </Text>
                <Gap size={8} />
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    <Link href="#" onClick={(event) => event.preventDefault()}>
                        Link text
                    </Link>
                </Text>
            </>
        );

        return (
            <div style={{ maxWidth: "750px" }}>
                <AlertProcess type={EAlertType.INFO}>{children}</AlertProcess>
            </div>
        );
    },
};

export const WithSpoiler: StoryObj<typeof AlertProcess> = {
    parameters: {
        controls: { disable: true },
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
