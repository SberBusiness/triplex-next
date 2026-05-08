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

const PARAGRAPHS = Array.from({ length: 10 }, (_, i) => i + 1);

export const WithLongContent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть с длинным контентом
            </Button>

            <ModalWindow
                isOpen={isOpen}
                size={EComponentSize.MD}
                closeButton={<ModalWindowClose onClick={handleClose} title="Закрыть" />}
            >
                <ModalWindowContent>
                    <ModalWindowHeader>
                        <ModalWindowHeader.Title>
                            <ModalWindowHeader.Title.Content>
                                <MobileView
                                    fallback={
                                        <Title tag="h1" size={ETitleSize.H1}>
                                            Длинный контент
                                        </Title>
                                    }
                                >
                                    <Title tag="h2" size={ETitleSize.H2}>
                                        Длинный контент
                                    </Title>
                                </MobileView>
                            </ModalWindowHeader.Title.Content>
                        </ModalWindowHeader.Title>
                    </ModalWindowHeader>

                    <ModalWindowBody>
                        {PARAGRAPHS.map((n, i) => (
                            <React.Fragment key={n}>
                                <Text tag="div" size={ETextSize.B2}>
                                    Параграф {n}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Text>
                                {i < PARAGRAPHS.length - 1 && <Gap size={16} />}
                            </React.Fragment>
                        ))}
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
