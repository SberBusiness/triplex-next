import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    ETitleSize,
    Gap,
    ModalWindow,
    ModalWindowBody,
    ModalWindowClose,
    ModalWindowContent,
    ModalWindowFooter,
    ModalWindowHeader,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

export interface IPlaygroundArgs {
    isLoading: boolean;
    size: EComponentSize;
}

export const Playground = ({ isLoading, size }: IPlaygroundArgs) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        action("onClose")();
        setIsOpen(false);
    };

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть модальное окно
            </Button>

            <ModalWindow
                isOpen={isOpen}
                size={size}
                closeButton={<ModalWindowClose onClick={handleClose} title="Закрыть" />}
                onExited={action("onExited")}
            >
                <ModalWindowContent isLoading={isLoading} loadingTitle="Загрузка...">
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
                            Содержимое модального окна. Здесь может быть любой контент: формы, текст, изображения и
                            другие элементы интерфейса.
                        </Text>
                        <Gap size={16} />
                        <Text tag="div" size={ETextSize.B2}>
                            Модальное окно поддерживает различные размеры (SM, MD, LG), состояние загрузки.
                        </Text>
                        <Gap size={16} />
                        <Text tag="div" size={ETextSize.B2}>
                            Фокус автоматически остаётся внутри модального окна, а нажатие Escape закрывает его.
                        </Text>
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
