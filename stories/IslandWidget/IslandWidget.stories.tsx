import React, { useState } from "react";
import { IslandWidget, IslandWidgetWrapper } from "../../src/components/IslandWidget";
import { StoryObj } from "@storybook/react";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Button, ButtonIcon } from "../../src/components/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import "./IslandWidget.less";
import { Link } from "../../src/components/Link";
import { Text, ETextSize, ETitleSize, Title, EFontType } from "../../src/components/Typography";
import { SettingsStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { DateField } from "../../src/components/DateField";
import { EDropdownAlignment } from "../../src/components/Dropdown/enums";
import { EFormFieldStatus } from "../../src/components/FormField/enums";
import { Title as DocsTitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/IslandWidget",
    component: IslandWidget,
    tags: ["autodocs"],
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component: `
Визуально обособленный блок, предназначенный для представления сгруппированной информации, набора связанных действий или определенной функциональности.

## Состав

- Header — шапка контента
- Body — основной контент
- Footer — нижняя часть
`,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
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

export const Default: StoryObj<typeof IslandWidget> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [value, setValue] = useState("");

        const renderBody = (props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderFooter = (props) => (
            <IslandWidget.Footer {...props}>
                <IslandWidget.Footer.Content>
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        <Link>Link text</Link>
                    </Text>
                </IslandWidget.Footer.Content>
                <IslandWidget.Footer.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </IslandWidget.Footer.Controls>
            </IslandWidget.Footer>
        );

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                    <ButtonIcon>
                        <SettingsStrokeSrvIcon20 paletteIndex={5} />
                    </ButtonIcon>
                    <DateField
                        value={value}
                        onChange={setValue}
                        className="island-widget-date-field"
                        placeholderMask="дд.мм.гггг"
                        label="дд.мм.гггг"
                        invalidDateHint="Указана недоступная для выбора дата."
                        alignment={EDropdownAlignment.LEFT}
                        size={EComponentSize.SM}
                        status={EFormFieldStatus.DEFAULT}
                    />
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        return <IslandWidget renderBody={renderBody} renderFooter={renderFooter} renderHeader={renderHeader} />;
    },
};

export const WithoutFooter: StoryObj<typeof IslandWidget> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const renderBody = (props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
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

export const WithFooterAndExtraFooter: StoryObj<typeof IslandWidget> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "IslandWidget с Footer и ExtraFooter.",
            },
        },
    },
    render: () => {
        const [extraFooterOpen, setExtraFooterOpen] = useState(false);
        const [bodyHeight, setBodyHeight] = useState(260);

        const renderBody = (props) => (
            <IslandWidget.Body {...props}>
                <div style={{ height: bodyHeight, transition: "height 0.3s ease-in-out" }}>Content</div>
            </IslandWidget.Body>
        );

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
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
                <IslandWidget.Footer.Content>
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        <Link>Link text</Link>
                    </Text>
                </IslandWidget.Footer.Content>
                <IslandWidget.Footer.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Button text
                    </Button>
                </IslandWidget.Footer.Controls>
            </IslandWidget.Footer>
        );

        const renderExtraFooter = () => (
            <IslandWidget.ExtraFooter open={extraFooterOpen}>
                <div className="island-widget-extra-footer">
                    <Text size={ETextSize.B3}>Extra footer content</Text>
                </div>
            </IslandWidget.ExtraFooter>
        );

        const handleExtraFooterOpen = (open) => {
            setExtraFooterOpen(open);
            setBodyHeight(open ? 196 : 260);
        };

        const renderControlPanel = () => (
            <div className="island-widget-control-panel">
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(true)}
                >
                    Open Extra Footer
                </Button>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(false)}
                >
                    Close Extra Footer
                </Button>
            </div>
        );

        return (
            <>
                {renderControlPanel()}
                <IslandWidgetWrapper>
                    <IslandWidget renderBody={renderBody} renderHeader={renderHeader} renderFooter={renderFooter} />
                    {renderExtraFooter()}
                </IslandWidgetWrapper>
            </>
        );
    },
};

export const WithoutFooterAndWithExtraFooter: StoryObj<typeof IslandWidget> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "IslandWidget с ExtraFooter без Footer.",
            },
        },
    },
    render: () => {
        const [extraFooterOpen, setExtraFooterOpen] = useState(false);
        const [bodyHeight, setBodyHeight] = useState(260);

        const renderBody = (props) => (
            <IslandWidget.Body {...props}>
                <div style={{ height: bodyHeight, transition: "height 0.3s ease-in-out" }}>Content</div>
            </IslandWidget.Body>
        );

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        const renderExtraFooter = () => (
            <IslandWidget.ExtraFooter open={extraFooterOpen}>
                <div className="island-widget-extra-footer">
                    <Text size={ETextSize.B3}>Extra footer content</Text>
                </div>
            </IslandWidget.ExtraFooter>
        );

        const handleExtraFooterOpen = (open) => {
            setExtraFooterOpen(open);
            setBodyHeight(open ? 196 : 260);
        };

        const renderControlPanel = () => (
            <div className="island-widget-control-panel">
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(true)}
                >
                    Open Extra Footer
                </Button>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(false)}
                >
                    Close Extra Footer
                </Button>
            </div>
        );

        return (
            <>
                {renderControlPanel()}
                <IslandWidgetWrapper>
                    <IslandWidget renderBody={renderBody} renderHeader={renderHeader} />
                    {renderExtraFooter()}
                </IslandWidgetWrapper>
            </>
        );
    },
};

export const WithExtraFooterAndIslandWidgetHeight: StoryObj<typeof IslandWidget> = {
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "IslandWidget с ExtraFooter и передачей высоты для IslandWidgetWrapper.",
            },
        },
    },
    render: () => {
        const [extraFooterOpen, setExtraFooterOpen] = useState(false);

        const renderBody = (props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>;

        const renderHeader = (props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        );

        const renderExtraFooter = () => (
            <IslandWidget.ExtraFooter open={extraFooterOpen}>
                <div className="island-widget-extra-footer">
                    <Text size={ETextSize.B3}>Extra footer content</Text>
                </div>
            </IslandWidget.ExtraFooter>
        );

        const handleExtraFooterOpen = (open) => {
            setExtraFooterOpen(open);
        };

        const renderControlPanel = () => (
            <div className="island-widget-control-panel">
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(true)}
                >
                    Open Extra Footer
                </Button>
                <Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.SM}
                    onClick={() => handleExtraFooterOpen(false)}
                >
                    Close Extra Footer
                </Button>
            </div>
        );

        return (
            <>
                {renderControlPanel()}
                <IslandWidgetWrapper style={{ height: "500px" }}>
                    <IslandWidget renderBody={renderBody} renderHeader={renderHeader} />
                    {renderExtraFooter()}
                </IslandWidgetWrapper>
            </>
        );
    },
};
