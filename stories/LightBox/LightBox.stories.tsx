import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { LightBox } from "../../src/components/LightBox/LightBox";
import { Page } from "../../src/components/Page/Page";
import { Button } from "../../src/components/Button/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { Gap } from "../../src/components/Gap";
import { Title } from "../../src/components/Typography/Title";
import { Text } from "../../src/components/Typography/Text";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { EHeaderPageType, EFooterPageType } from "../../src/components/Page/components/enums";
import { Island } from "../../src/components/Island/Island";
import { IslandBody } from "../../src/components/Island/components/IslandBody";
import { EIslandType } from "../../src/components/Island/enums";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { FocusTrapUtils } from "../../src/utils/focus/FocusTrapUtils";
import { EComponentSize } from "../../src/enums/EComponentSize";
import "./styles.less";

type LightBoxStoryArgs = {
    isLoading: boolean;
    showControls: boolean;
    stickyHeader: boolean;
    stickyFooter: boolean;
    pageWidth: number;
};

const STORY_META_DESCRIPTION = `
Компонент **LightBox** отображает крупный контент поверх страницы. Структура включает заголовок, тело, футер и дополнительные оверлеи.
`;

const meta = {
    title: "Components/LightBox/LightBox",
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
        },
    },
} satisfies Meta<LightBoxStoryArgs>;

export default meta;

const POEM_LINES: string[] = [
    "Мой дядя самых честных правил,",
    "Когда не в шутку занемог,",
    "Он уважать себя заставил",
    "И лучше выдумать не мог.",
    "Его пример другим наука;",
    "Но, боже мой, какая скука",
    "С больным сидеть и день и ночь,",
    "Не отходя ни шагу прочь!",
    "Какое низкое коварство",
    "Полуживого забавлять,",
    "Ему подушки поправлять,",
    "Печально подносить лекарство,",
    "Вздыхать и думать про себя:",
    "Когда же черт возьмёт тебя…",
];

const PoemBlock: React.FC = () => (
    <Island type={EIslandType.TYPE_1} borderRadius={16} paddingSize={16}>
        <IslandBody>
            {POEM_LINES.map((line) => (
                <React.Fragment key={line}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </IslandBody>
    </Island>
);

const LightBoxPageContent: React.FC<{ stickyHeader: boolean; stickyFooter: boolean; pageWidth: number }> = ({
    stickyHeader,
    stickyFooter,
    pageWidth,
}) => (
    <Page style={{ maxWidth: pageWidth }}>
        <Page.Header type={EHeaderPageType.SECOND} sticky={stickyHeader}>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Title
                        tag="h1"
                        size={ETitleSize.H1}
                        tabIndex={-1}
                        // Устанавливает фокус на первый элемент при открытии LightBox.
                        {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                    >
                        Евгений Онегин
                    </Title>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Русский поэт, драматург и прозаик, заложивший основы русского реалистического направления.
                    </Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button
                        icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                        theme={EButtonTheme.SECONDARY}
                        size={EComponentSize.MD}
                    />
                    <Button
                        icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                        theme={EButtonTheme.SECONDARY}
                        size={EComponentSize.MD}
                    />
                </Page.Header.Title.Controls>
            </Page.Header.Title>
        </Page.Header>

        <Page.Body verticalMargin={16}>
            {[0, 1, 2].map((index) => (
                <React.Fragment key={index}>
                    <PoemBlock />
                    {index < 2 && <Gap size={16} />}
                </React.Fragment>
            ))}
        </Page.Body>

        <Page.Footer type={EFooterPageType.SECOND} sticky={stickyFooter}>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Button text
                    </Button>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Button text
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

const LightBoxPlayground: React.FC<LightBoxStoryArgs> = ({
    isLoading,
    showControls,
    stickyHeader,
    stickyFooter,
    pageWidth,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const lightBoxChildren: React.ReactElement[] = [
        <LightBox.Content key="content" isLoading={isLoading}>
            <LightBoxPageContent stickyHeader={stickyHeader} stickyFooter={stickyFooter} pageWidth={pageWidth} />
        </LightBox.Content>,
    ];

    if (showControls) {
        lightBoxChildren.push(
            <LightBox.Controls key="controls">
                <LightBox.Controls.Close title="Закрыть" data-test-id="lightbox-close" onClick={handleClose} />
                <LightBox.Controls.Prev title="Назад" clickByArrowLeft onClick={() => console.log("Prev clicked")} />
                <LightBox.Controls.Next title="Вперёд" clickByArrowRight onClick={() => console.log("Next clicked")} />
            </LightBox.Controls>,
        );
    }

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox isLoading={isLoading} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                    {lightBoxChildren}
                </LightBox>
            ) : null}
        </div>
    );
};

const Template = (args: LightBoxStoryArgs) => <LightBoxPlayground {...args} />;

type Story = StoryObj<LightBoxStoryArgs>;

export const Playground: Story = {
    render: Template,
    args: {
        isLoading: false,
        showControls: true,
        stickyHeader: true,
        stickyFooter: true,
        pageWidth: 1000,
    },
    argTypes: {
        isLoading: {
            control: { type: "boolean" },
            description: "Показать состояние загрузки LightBox.",
            table: {
                category: "Состояния",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        showControls: {
            control: { type: "boolean" },
            description: "Отображать навигационные кнопки LightBox.Controls.",
            table: {
                category: "Содержимое",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        stickyHeader: {
            control: { type: "boolean" },
            description: "Использовать sticky-позиционирование для Page.Header.",
            table: {
                category: "Контент",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        stickyFooter: {
            control: { type: "boolean" },
            description: "Использовать sticky-позиционирование для Page.Footer.",
            table: {
                category: "Контент",
                type: { summary: "boolean" },
                defaultValue: { summary: "true" },
            },
        },
        pageWidth: {
            control: { type: "number" },
            description: "Максимальная ширина области Page в пикселях.",
            table: {
                category: "Контент",
                type: { summary: "number" },
                defaultValue: { summary: "800" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивный пример LightBox. Управляйте состояниями и оверлеями через панель Storybook.",
            },
        },
    },
};

export const DefaultView: Story = {
    render: () => (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                    <LightBoxPageContent stickyHeader stickyFooter pageWidth={1000} />
                </LightBox>
            ) : null}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Базовая конфигурация LightBox с активными контролами и липкими шапкой и футером.",
            },
        },
    },
};
