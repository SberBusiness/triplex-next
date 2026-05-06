import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    ETitleSize,
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

export const LoadingState = () => {
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
                size={EComponentSize.MD}
                closeButton={<ModalWindowClose onClick={handleClose} title="Закрыть" />}
            >
                <ModalWindowContent isLoading loadingTitle="Загрузка данных...">
                    <ModalWindowHeader>
                        <ModalWindowHeader.Title>
                            <ModalWindowHeader.Title.Content>
                                <MobileView
                                    fallback={
                                        <Title tag="h1" size={ETitleSize.H1}>
                                            Загрузка
                                        </Title>
                                    }
                                >
                                    <Title tag="h2" size={ETitleSize.H2}>
                                        Загрузка
                                    </Title>
                                </MobileView>
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
