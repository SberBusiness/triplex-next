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

interface ISizeItemProps {
    size: EComponentSize;
    label: string;
}

const SizeItem = ({ size, label }: ISizeItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>{label}</div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть {label}
            </Button>

            <ModalWindow isOpen={isOpen} size={size} closeButton={<ModalWindowClose onClick={handleClose} />}>
                <ModalWindowContent>
                    <ModalWindowHeader>
                        <ModalWindowHeader.Title>
                            <ModalWindowHeader.Title.Content>
                                <MobileView
                                    fallback={
                                        <Title tag="h1" size={ETitleSize.H1}>
                                            Размер {label}
                                        </Title>
                                    }
                                >
                                    <Title tag="h2" size={ETitleSize.H2}>
                                        Размер {label}
                                    </Title>
                                </MobileView>
                            </ModalWindowHeader.Title.Content>
                        </ModalWindowHeader.Title>
                    </ModalWindowHeader>

                    <ModalWindowBody>
                        <Text tag="div" size={ETextSize.B2}>
                            Пример модального окна размера {label}.
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

export const Sizes = () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <SizeItem size={EComponentSize.SM} label="SM" />
        <SizeItem size={EComponentSize.MD} label="MD" />
        <SizeItem size={EComponentSize.LG} label="LG" />
    </div>
);
