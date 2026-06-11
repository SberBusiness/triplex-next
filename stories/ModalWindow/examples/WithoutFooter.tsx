import React, { useState } from "react";
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
    ModalWindowHeader,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

export const WithoutFooter = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть без ModalWindowFooter
            </Button>

            <ModalWindow
                isOpen={isOpen}
                size={EComponentSize.MD}
                closeButton={<ModalWindowClose onClick={handleClose} title="Закрыть" />}
                onExited={() => {}}
            >
                <ModalWindowContent>
                    <ModalWindowHeader>
                        <ModalWindowHeader.Title>
                            <ModalWindowHeader.Title.Content>
                                <Title tag="h1" size={ETitleSize.H1}>
                                    Заголовок окна
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
                            Фокус автоматически удерживается внутри окна, нажатие Escape закрывает его.
                        </Text>
                    </ModalWindowBody>
                </ModalWindowContent>
            </ModalWindow>
        </div>
    );
};
