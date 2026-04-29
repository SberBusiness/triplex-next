import React from "react";
import {
    EComponentSize,
    EFontType,
    EFontWeightText,
    EMarkerStatus,
    ETextSize,
    ISwipeableAreaRef,
    List,
    ListItemControlsButton,
    ListItemControlsButtonDropdown,
    ListItemTable,
    MarkerStatus,
    Text,
} from "@sberbusiness/triplex-next";
import { AttachmentStrokeSrvIcon20, DotshorizontalStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export const WithSwipeEmulation = () => {
    const options = [
        {
            id: "button-dropdown-swipe-emulation-option-1",
            label: "Текст пункта меню 1",
            onSelect: () => alert("Выбран пункт меню 1."),
        },
        {
            id: "button-dropdown-swipe-emulation-card-option-2",
            label: "Текст пункта меню 2",
            onSelect: () => alert("Выбран пункт меню 2."),
        },
        {
            id: "button-dropdown-swipe-emulation-card-option-3",
            label: "Текст пункта меню 3",
            onSelect: () => alert("Выбран пункт меню 3."),
        },
    ];

    const ref = React.useRef<ISwipeableAreaRef>(null);

    return (
        <div style={{ maxWidth: "500px" }}>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.swipeLeft();
                    }
                }}
            >
                swipe
            </button>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.closeSwipe();
                    }
                }}
            >
                close
            </button>
            <br />

            <List>
                <ListItemTable
                    swipeableAreaRef={ref}
                    onClickItem={() => console.log("Клик по карточке.")}
                    controlButtons={
                        <>
                            <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                Скачать
                            </ListItemControlsButton>
                            <ListItemControlsButtonDropdown
                                icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                options={options}
                            >
                                Действия
                            </ListItemControlsButtonDropdown>
                        </>
                    }
                >
                    <Text size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                        1 220 000 000 RUB
                    </Text>

                    <Text size={ETextSize.B3} tag="div">
                        №1 ООО Голубая Роза Голубая
                    </Text>
                    <Text size={ETextSize.B3} tag="div">
                        Длинное назначение платежа
                    </Text>
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                        НДС не облагается
                    </Text>
                    <Text size={ETextSize.B3} tag="div" type={EFontType.SECONDARY}>
                        40702 810 2 0527 5000000 от 09.04.24
                    </Text>
                    <MarkerStatus status={EMarkerStatus.SUCCESS} size={EComponentSize.LG}>
                        Status text
                    </MarkerStatus>
                </ListItemTable>
            </List>
        </div>
    );
};
