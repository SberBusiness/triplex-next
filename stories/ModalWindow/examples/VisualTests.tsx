import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    ETitleSize,
    Gap,
    MobileView,
    ModalWindow,
    ModalWindowBody,
    ModalWindowClose,
    ModalWindowContent,
    ModalWindowFooter,
    ModalWindowHeader,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

/** Лейбл триггер-кнопки для visual tests; используется в `play`-функциях для поиска кнопки. */
export const VISUAL_TESTS_TRIGGER_LABEL = "Открыть модальное окно";

interface IVisualTestsModalProps {
    size?: EComponentSize;
    isLoading?: boolean;
    longContent?: boolean;
    title: string;
}

const PARAGRAPHS = Array.from({ length: 10 }, (_, i) => i + 1);

const VisualTestsModal = ({
    size = EComponentSize.MD,
    isLoading = false,
    longContent = false,
    title,
}: IVisualTestsModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                {VISUAL_TESTS_TRIGGER_LABEL}
            </Button>

            <ModalWindow
                isOpen={isOpen}
                size={size}
                closeButton={<ModalWindowClose onClick={handleClose} title="Закрыть" />}
            >
                <ModalWindowContent isLoading={isLoading} loadingTitle={isLoading ? "Загрузка данных..." : undefined}>
                    <ModalWindowHeader>
                        <ModalWindowHeader.Title>
                            <ModalWindowHeader.Title.Content>
                                <MobileView
                                    fallback={
                                        <Title tag="h1" size={ETitleSize.H1}>
                                            {title}
                                        </Title>
                                    }
                                >
                                    <Title tag="h2" size={ETitleSize.H2}>
                                        {title}
                                    </Title>
                                </MobileView>
                            </ModalWindowHeader.Title.Content>
                        </ModalWindowHeader.Title>
                    </ModalWindowHeader>

                    <ModalWindowBody>
                        {longContent ? (
                            PARAGRAPHS.map((n, i) => (
                                <React.Fragment key={n}>
                                    <Text tag="div" size={ETextSize.B2}>
                                        Параграф {n}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </Text>
                                    {i < PARAGRAPHS.length - 1 && <Gap size={16} />}
                                </React.Fragment>
                            ))
                        ) : (
                            <Text tag="div" size={ETextSize.B2}>
                                Содержимое модального окна. Здесь может быть любой контент: формы, текст, изображения и
                                другие элементы интерфейса.
                            </Text>
                        )}
                    </ModalWindowBody>

                    <ModalWindowFooter>
                        <ModalWindowFooter.Description>
                            <ModalWindowFooter.Description.Controls>
                                <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleClose}>
                                    Button text
                                </Button>
                                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={handleClose}>
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

export const VisualTestsDefault = () => <VisualTestsModal title="Заголовок окна" />;

export const VisualTestsSizeSm = () => <VisualTestsModal size={EComponentSize.SM} title="Размер SM" />;

export const VisualTestsSizeLg = () => <VisualTestsModal size={EComponentSize.LG} title="Размер LG" />;

export const VisualTestsLongContent = () => <VisualTestsModal longContent title="Длинный контент" />;

export const VisualTestsLoading = () => <VisualTestsModal isLoading title="Загрузка" />;
