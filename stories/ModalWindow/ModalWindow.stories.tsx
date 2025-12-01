import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ModalWindow } from "../../src/components/ModalWindow/ModalWindow";
import { ModalWindowContent } from "../../src/components/ModalWindow/components/ModalWindowContent";
import { ModalWindowHeader } from "../../src/components/ModalWindow/components/ModalWindowHeader";
import { ModalWindowBody } from "../../src/components/ModalWindow/components/ModalWindowBody";
import { ModalWindowFooter } from "../../src/components/ModalWindow/components/ModalWindowFooter";
import { ModalWindowClose } from "../../src/components/ModalWindow/components/ModalWindowClose";
import { Button } from "../../src/components/Button/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { Gap } from "../../src/components/Gap";
import { Title } from "../../src/components/Typography/Title";
import { Text } from "../../src/components/Typography/Text";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";

type ModalWindowStoryArgs = {
    isLoading: boolean;
    size: EComponentSize;
};

const STORY_META_DESCRIPTION = `
Компонент **ModalWindow** отображает модальное окно поверх страницы с затемнённым фоном.

## Возможности

- **Размеры**: SM, MD, LG
- **Состояние загрузки**: отображение лоадера поверх контента
- **Фокус-ловушка**: фокус остаётся внутри модального окна
- **Закрытие по Escape**: автоматическое закрытие при нажатии Escape

## Структура

- \`ModalWindow\` — основной компонент
- \`ModalWindowContent\` — контейнер контента
- \`ModalWindowHeader\` — заголовок
- \`ModalWindowBody\` — тело
- \`ModalWindowFooter\` — футер
- \`ModalWindowClose\` — кнопка закрытия
`;

const meta = {
    title: "Components/ModalWindow",
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
        },
    },
} satisfies Meta<ModalWindowStoryArgs>;

export default meta;

type Story = StoryObj<ModalWindowStoryArgs>;

const ModalWindowPlayground: React.FC<ModalWindowStoryArgs> = ({ isLoading, size }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть модальное окно
            </Button>

            <ModalWindow
                isOpen={isOpen}
                size={size}
                closeButton={<ModalWindowClose onClick={handleClose} />}
                onExited={() => console.log("Modal closed")}
            >
                <ModalWindowContent isLoading={isLoading} loadingTitle="Загрузка...">
                    <ModalWindowHeader>
                        <ModalWindowHeader.Title>
                            <ModalWindowHeader.Title.Content>
                                <Title tag="h1" size={ETitleSize.H1}>
                                    Title text
                                </Title>
                            </ModalWindowHeader.Title.Content>
                            <ModalWindowHeader.Title.Controls>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                    Действие
                                </Button>
                            </ModalWindowHeader.Title.Controls>
                        </ModalWindowHeader.Title>
                    </ModalWindowHeader>

                    <ModalWindowBody>
                        <Text tag="div" size={ETextSize.B2}>
                            Содержимое модального окна. Здесь может быть любой контент: формы, текст, изображения и
                            другие элементы интерфейса.
                        </Text>
                        <Gap size={16} />
                        <Text tag="div" size={ETextSize.B2}>
                            Модальное окно поддерживает различные размеры (SM, MD, LG), состояние загрузки и прилипание
                            заголовка/футера при скролле.
                        </Text>
                        <Gap size={16} />
                        <Text tag="div" size={ETextSize.B2}>
                            Фокус автоматически остаётся внутри модального окна, а нажатие Escape закрывает его.
                        </Text>
                    </ModalWindowBody>

                    <ModalWindowFooter>
                        <ModalWindowFooter.Description>
                            <ModalWindowFooter.Description.Content>
                                <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                                    Дополнительная информация
                                </Text>
                            </ModalWindowFooter.Description.Content>
                            <ModalWindowFooter.Description.Controls>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleClose}>
                                    Отмена
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={handleClose}>
                                    Подтвердить
                                </Button>
                            </ModalWindowFooter.Description.Controls>
                        </ModalWindowFooter.Description>
                    </ModalWindowFooter>
                </ModalWindowContent>
            </ModalWindow>
        </div>
    );
};

export const Playground: Story = {
    render: (args) => <ModalWindowPlayground {...args} />,
    args: {
        isLoading: false,
        size: EComponentSize.MD,
    },
    argTypes: {
        isLoading: {
            control: { type: "boolean" },
            description: "Показать состояние загрузки модального окна.",
            table: {
                category: "Состояния",
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        size: {
            control: { type: "select" },
            options: [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG],
            description: "Размер модального окна.",
            table: {
                category: "Внешний вид",
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "MD" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Интерактивный пример модального окна. Управляйте состояниями через панель Storybook.",
            },
        },
    },
};

export const Sizes: Story = {
    render: () => {
        const SizeExample: React.FC<{ size: EComponentSize; title: string }> = ({ size, title }) => {
            const [isOpen, setIsOpen] = useState(false);

            const handleOpen = () => setIsOpen(true);
            const handleClose = () => setIsOpen(false);

            return (
                <div>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                        {title}
                    </Button>

                    <ModalWindow isOpen={isOpen} size={size} closeButton={<ModalWindowClose onClick={handleClose} />}>
                        <ModalWindowContent>
                            <ModalWindowHeader>
                                <ModalWindowHeader.Title>
                                    <ModalWindowHeader.Title.Content>
                                        <Title tag="h1" size={ETitleSize.H1}>
                                            Title text
                                        </Title>
                                    </ModalWindowHeader.Title.Content>
                                </ModalWindowHeader.Title>
                            </ModalWindowHeader>

                            <ModalWindowBody>
                                <Text tag="div" size={ETextSize.B2}>
                                    Пример модального окна размера {title}.
                                </Text>
                            </ModalWindowBody>

                            <ModalWindowFooter>
                                <ModalWindowFooter.Description>
                                    <ModalWindowFooter.Description.Controls>
                                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                            Button text
                                        </Button>
                                    </ModalWindowFooter.Description.Controls>
                                </ModalWindowFooter.Description>
                            </ModalWindowFooter>
                        </ModalWindowContent>
                    </ModalWindow>
                </div>
            );
        };

        return (
            <div style={{ display: "flex", gap: 16 }}>
                <SizeExample size={EComponentSize.SM} title="SM" />
                <SizeExample size={EComponentSize.MD} title="MD" />
                <SizeExample size={EComponentSize.LG} title="LG" />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Примеры модальных окон разных размеров: SM, MD и LG.",
            },
        },
        controls: { disable: true },
    },
};

export const WithLongContent: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpen = () => setIsOpen(true);
        const handleClose = () => setIsOpen(false);

        const paragraphs = Array.from({ length: 10 }, (_, i) => (
            <React.Fragment key={i}>
                <Text tag="div" size={ETextSize.B2}>
                    Параграф {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
                {i < 9 && <Gap size={16} />}
            </React.Fragment>
        ));

        return (
            <div>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                    Открыть с длинным контентом
                </Button>

                <ModalWindow
                    isOpen={isOpen}
                    size={EComponentSize.MD}
                    closeButton={<ModalWindowClose onClick={handleClose} />}
                >
                    <ModalWindowContent>
                        <ModalWindowHeader>
                            <ModalWindowHeader.Title>
                                <ModalWindowHeader.Title.Content>
                                    <Title tag="h1" size={ETitleSize.H1}>
                                        Модальное окно
                                    </Title>
                                </ModalWindowHeader.Title.Content>
                            </ModalWindowHeader.Title>
                        </ModalWindowHeader>

                        <ModalWindowBody>{paragraphs}</ModalWindowBody>

                        <ModalWindowFooter>
                            <ModalWindowFooter.Description>
                                <ModalWindowFooter.Description.Controls>
                                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                        Button text
                                    </Button>
                                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                        Button text
                                    </Button>
                                </ModalWindowFooter.Description.Controls>
                            </ModalWindowFooter.Description>
                        </ModalWindowFooter>
                    </ModalWindowContent>
                </ModalWindow>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Пример модального окна с длинным контентом и прилипающими заголовком и футером.",
            },
        },
        controls: { disable: true },
    },
};

export const LoadingState: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        const handleOpen = () => setIsOpen(true);
        const handleClose = () => setIsOpen(false);

        return (
            <div>
                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                    Открыть с загрузкой
                </Button>

                <ModalWindow
                    isOpen={isOpen}
                    isLoading
                    size={EComponentSize.MD}
                    closeButton={<ModalWindowClose onClick={handleClose} />}
                >
                    <ModalWindowContent isLoading loadingTitle="Загрузка данных...">
                        <ModalWindowHeader>
                            <ModalWindowHeader.Title>
                                <ModalWindowHeader.Title.Content>
                                    <Title tag="h1" size={ETitleSize.H1}>
                                        Модальное окно
                                    </Title>
                                </ModalWindowHeader.Title.Content>
                            </ModalWindowHeader.Title>
                        </ModalWindowHeader>

                        <ModalWindowBody>
                            <Text tag="div" size={ETextSize.B2}>
                                Этот контент скрыт под индикатором загрузки.
                            </Text>
                        </ModalWindowBody>

                        <ModalWindowFooter>
                            <ModalWindowFooter.Description>
                                <ModalWindowFooter.Description.Controls>
                                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                        Button text
                                    </Button>
                                </ModalWindowFooter.Description.Controls>
                            </ModalWindowFooter.Description>
                        </ModalWindowFooter>
                    </ModalWindowContent>
                </ModalWindow>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Пример модального окна в состоянии загрузки.",
            },
        },
        controls: { disable: true },
    },
};
