import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Controls, Description, Primary, Stories, Heading, Title as SBTitle } from "@storybook/addon-docs/blocks";
import { LightBox } from "../../src/components/LightBox/LightBox";
import { Page } from "../../src/components/Page/Page";
import { Button } from "../../src/components/Button/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { Gap } from "../../src/components/Gap";
import { Title } from "../../src/components/Typography/Title";
import { Text } from "../../src/components/Typography/Text";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { EHeaderPageType, EFooterPageType, EBodyPageType } from "../../src/components/Page/components/enums";
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
};

const STORY_META_DESCRIPTION = `
Компонент **LightBox** отображает крупный контент поверх страницы. Структура включает заголовок, тело, футер и дополнительные оверлеи.
Если контента мало, рекомендуется использовать Page.Body типа FIRST, чтобы не было пустого пространства. Если контента много, рекомендуется использовать Page.Body типа SECOND, и внутри него использовать несколько Island.
`;

const meta = {
    title: "Components/LightBox/LightBox",
    component: LightBox,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
            page: () => (
                <>
                    <SBTitle />
                    <Description />
                    <Heading>Props</Heading>
                    <Controls of={Default} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof LightBox>;

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
    <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
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

const LightBoxPageContent: React.FC<{ stickyHeader: boolean; stickyFooter: boolean }> = ({
    stickyHeader,
    stickyFooter,
}) => (
    <Page>
        <Page.Header type={EHeaderPageType.FIRST} sticky={stickyHeader}>
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

        <Page.Body type={EBodyPageType.SECOND}>
            {[0, 1, 2].map((index) => (
                <React.Fragment key={index}>
                    <PoemBlock />
                    {index < 2 && <Gap size={24} />}
                </React.Fragment>
            ))}
        </Page.Body>

        <Page.Footer type={EFooterPageType.FIRST} sticky={stickyFooter}>
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

const LightBoxPlayground: React.FC<LightBoxStoryArgs> = ({ isLoading, showControls, stickyHeader, stickyFooter }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const lightBoxChildren: React.ReactElement[] = [
        <LightBox.Content key="content" isLoading={isLoading}>
            <LightBoxPageContent stickyHeader={stickyHeader} stickyFooter={stickyFooter} />
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
    tags: ["!autodocs"],
    args: {
        isLoading: false,
        showControls: true,
        stickyHeader: true,
        stickyFooter: true,
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
    },
    parameters: {
        controls: {
            include: ["isLoading", "showControls", "stickyHeader", "stickyFooter"],
        },
        docs: {
            description: {
                story: "Интерактивный пример LightBox. Управляйте состояниями и оверлеями через панель Storybook.",
            },
            canvas: {
                sourceState: "none",
            },
        },
    },
};

export const Default: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpen = () => setIsOpen(true);
        const handleClose = () => setIsOpen(false);

        return (
            <div>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                    Открыть LightBox
                </Button>

                {isOpen ? (
                    <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                        <LightBox.Content key="content" isLoading={false}>
                            <LightBoxPageContent stickyHeader stickyFooter />
                        </LightBox.Content>

                        <LightBox.Controls>
                            <LightBox.Controls.Close
                                title="Закрыть"
                                data-test-id="lightbox-close"
                                onClick={handleClose}
                            />
                            <LightBox.Controls.Prev
                                title="Назад"
                                clickByArrowLeft
                                onClick={() => console.log("Prev clicked")}
                            />
                            <LightBox.Controls.Next
                                title="Вперёд"
                                clickByArrowRight
                                onClick={() => console.log("Next clicked")}
                            />
                        </LightBox.Controls>
                    </LightBox>
                ) : null}
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Базовая конфигурация LightBox с активными контролами и липкими шапкой и футером.",
            },
        },
    },
};

export const SmallContent: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpen = () => setIsOpen(true);
        const handleClose = () => setIsOpen(false);

        return (
            <div>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                    Открыть LightBox
                </Button>

                {isOpen ? (
                    <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                        <LightBox.Content key="content" isLoading={false}>
                            <Page>
                                <Page.Header type={EHeaderPageType.FIRST}>
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
                                                Русский поэт, драматург и прозаик, заложивший основы русского
                                                реалистического направления.
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

                                <Page.Body type={EBodyPageType.FIRST}>
                                    Если контента мало, рекомендуется использовать Page.Body типа FIRST, чтобы не было
                                    пустого пространства.
                                </Page.Body>

                                <Page.Footer type={EFooterPageType.FIRST}>
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
                        </LightBox.Content>

                        <LightBox.Controls>
                            <LightBox.Controls.Close
                                title="Закрыть"
                                data-test-id="lightbox-close"
                                onClick={handleClose}
                            />
                            <LightBox.Controls.Prev
                                title="Назад"
                                clickByArrowLeft
                                onClick={() => console.log("Prev clicked")}
                            />
                            <LightBox.Controls.Next
                                title="Вперёд"
                                clickByArrowRight
                                onClick={() => console.log("Next clicked")}
                            />
                        </LightBox.Controls>
                    </LightBox>
                ) : null}
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Базовая конфигурация LightBox с активными контролами и липкими шапкой и футером.",
            },
        },
    },
};

export const SplitMode: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpen = () => setIsOpen(true);
        const handleClose = () => setIsOpen(false);

        return (
            <div>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                    Открыть LightBox
                </Button>

                <div id="LightBox-next-view-manager-node-example" />

                {isOpen ? (
                    <LightBox
                        isLoading={false}
                        isSideOverlayOpened={false}
                        isTopOverlayOpened={false}
                        lightBoxViewManagerNodeId="LightBox-next-view-manager-node-example"
                    >
                        <LightBox.Content key="content" isLoading={false}>
                            <LightBoxPageContent stickyHeader stickyFooter />
                        </LightBox.Content>

                        <LightBox.Controls>
                            <LightBox.Controls.Close
                                title="Закрыть"
                                data-test-id="lightbox-close"
                                onClick={handleClose}
                            />
                            <LightBox.Controls.Prev
                                title="Назад"
                                clickByArrowLeft
                                onClick={() => console.log("Prev clicked")}
                            />
                            <LightBox.Controls.Next
                                title="Вперёд"
                                clickByArrowRight
                                onClick={() => console.log("Next clicked")}
                            />
                        </LightBox.Controls>
                    </LightBox>
                ) : null}
            </div>
        );
    },
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Конфигурация LightBox в режиме split-mode. LightBox занимает 90% ширины экрана и располагается по центру. DOM-элемент с идентификатором LightBox-next-view-manager-node-example используется для позиционирования LightBox. Граница этого элемента равна границам LightBox.",
            },
        },
    },
};
