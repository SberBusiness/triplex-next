import React, { useState } from "react";
import { IslandWidget } from "../../src/components/IslandWidget";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Button, ButtonIcon } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import "./IslandWidget.less";
import { Link } from "../../src/components/Link";
import { Text, ETextSize, ETitleSize, Title, EFontType } from "../../src/components/Typography";
import { SettingsStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { DateField } from "../../src/components/DateField";
import { IIslandWidgetProps } from "../../src/components/IslandWidget";

export default {
    title: "Components/IslandWidget",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Визуально обособленный блок, предназначенный для представления сгруппированной информации, набора связанных действий или определенной функциональности. Является строительным блоком для создания дашбордов.

## Состав

- Header — шапка контента
- Body — основной контент
- Footer — нижняя часть
`,
            },
        },
    },
    args: {
        placeholderMask: "дд.мм.гггг",
        label: "дд.мм.гггг",
        invalidDateHint: "Указана недоступная для выбора дата.",
    },
    argTypes: {
        placeholderMask: {
            table: {
                disable: true,
            },
        },
        label: {
            table: {
                disable: true,
            },
        },
        invalidDateHint: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="island-widget-example">
                <Story />
            </div>
        ),
    ],
};

interface IIslandWidgetStoryProps extends IIslandWidgetProps {
    placeholderMask: string;
    label: string;
    invalidDateHint: string;
}

export const Basic: StoryObj<IIslandWidgetStoryProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const renderBody = (props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderFooter = (props) => (
            <IslandWidget.Footer {...props}>
                <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                    <Link>Link text</Link>
                </Text>
                <div className="island-widget-footer-controls">
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </div>
            </IslandWidget.Footer>
        );

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                    <ButtonIcon>
                        <SettingsStrokeSrvIcon20 paletteIndex={5} />
                    </ButtonIcon>
                    <DateField value={value} onChange={setValue} className="island-widget-date-field" {...args} />
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        return (
            <IslandWidget {...args} renderBody={renderBody} renderFooter={renderFooter} renderHeader={renderHeader} />
        );
    },
};

export const WithoutFooter: StoryObj<IIslandWidgetStoryProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const renderBody = (props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                    <ButtonIcon>
                        <SettingsStrokeSrvIcon20 paletteIndex={5} />
                    </ButtonIcon>
                    <DateField value={value} onChange={setValue} className="island-widget-date-field" {...args} />
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        return <IslandWidget renderBody={renderBody} renderHeader={renderHeader} />;
    },
};

export const WithFooterAndExtraFooter: StoryObj<IIslandWidgetStoryProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const renderBody = (props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                    <ButtonIcon>
                        <SettingsStrokeSrvIcon20 paletteIndex={5} />
                    </ButtonIcon>
                    <DateField value={value} onChange={setValue} className="island-widget-date-field" {...args} />
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        const renderFooter = (props) => (
            <IslandWidget.Footer {...props}>
                <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                    <Link>Link text</Link>
                </Text>
                <div className="island-widget-footer-controls">
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </div>
            </IslandWidget.Footer>
        );

        const renderExtraFooter = (props) => (
            <IslandWidget.ExtraFooter {...props}>
                <Text tag="div" size={ETextSize.B3}>
                    Extra footer content
                </Text>
            </IslandWidget.ExtraFooter>
        );

        return (
            <IslandWidget
                renderBody={renderBody}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
                renderExtraFooter={renderExtraFooter}
            />
        );
    },
};

export const WithoutFooterAndWithExtraFooter: StoryObj<IIslandWidgetStoryProps> = {
    render: (args) => {
        const [value, setValue] = useState("");

        const renderBody = (props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                    <ButtonIcon>
                        <SettingsStrokeSrvIcon20 paletteIndex={5} />
                    </ButtonIcon>
                    <DateField value={value} onChange={setValue} className="island-widget-date-field" {...args} />
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        const renderExtraFooter = (props) => (
            <IslandWidget.ExtraFooter {...props}>
                <Text tag="div" size={ETextSize.B3}>
                    Extra footer content
                </Text>
            </IslandWidget.ExtraFooter>
        );

        return (
            <IslandWidget renderBody={renderBody} renderHeader={renderHeader} renderExtraFooter={renderExtraFooter} />
        );
    },
};
