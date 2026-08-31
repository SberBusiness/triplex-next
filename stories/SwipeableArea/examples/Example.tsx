import React, { useRef } from "react";
import {
    EFontType,
    EFontWeightText,
    ETextSize,
    ISwipeableAreaRef,
    List,
    ListItem,
    ListItemContent,
    ListItemControls,
    ListItemControlsButton,
    ListItemControlsButtonDropdown,
    ListItemTailRight,
    SwipeableArea,
    Text,
} from "@sberbusiness/triplex-next";
import { AttachmentStrokeSrvIcon20, DotshorizontalStrokeSrvIcon20 } from "@sberbusiness/icons-next";

const PAYMENTS = [
    { id: "swipeable-area-payment-1", amount: "1 220 000,00 ₽", counterparty: "ООО «Голубая роза»" },
    { id: "swipeable-area-payment-2", amount: "84 300,00 ₽", counterparty: "ООО «Северный ветер»" },
    { id: "swipeable-area-payment-3", amount: "12 500,00 ₽", counterparty: "ИП Иванов И. И." },
];

export const Example = () => {
    const swipeableAreaRefs = useRef<Record<string, ISwipeableAreaRef | null>>({});

    // Открытой остаётся только одна карточка: свайп по одной закрывает остальные.
    const handleSwipeLeft = (paymentId: string) => {
        Object.entries(swipeableAreaRefs.current).forEach(([id, swipeableArea]) => {
            if (id !== paymentId) {
                swipeableArea?.closeSwipe();
            }
        });
    };

    return (
        <div style={{ maxWidth: "500px" }}>
            <List>
                {PAYMENTS.map((payment) => (
                    <ListItem key={payment.id}>
                        <SwipeableArea
                            ref={(instance) => {
                                swipeableAreaRefs.current[payment.id] = instance;
                            }}
                            rightSwipeableArea={
                                <ListItemControls>
                                    <ListItemControlsButton
                                        icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}
                                        onClick={() => {}}
                                    >
                                        Скачать
                                    </ListItemControlsButton>
                                    <ListItemControlsButtonDropdown
                                        icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                        options={[
                                            { id: `${payment.id}-option-1`, label: "Повторить", onSelect: () => {} },
                                            { id: `${payment.id}-option-2`, label: "Удалить", onSelect: () => {} },
                                        ]}
                                    >
                                        Действия
                                    </ListItemControlsButtonDropdown>
                                </ListItemControls>
                            }
                            onSwipeLeft={() => handleSwipeLeft(payment.id)}
                        >
                            <ListItemTailRight />
                            {/* Минимальная высота, из-за блока с кнопками, появляющегося при свайпе. */}
                            <ListItemContent style={{ minHeight: "56px" }}>
                                <Text size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD} tag="div">
                                    {payment.amount}
                                </Text>
                                <Text size={ETextSize.B3} tag="div">
                                    {payment.counterparty}
                                </Text>
                                <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                                    Оплата по счёту от 09.04.24
                                </Text>
                            </ListItemContent>
                        </SwipeableArea>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
