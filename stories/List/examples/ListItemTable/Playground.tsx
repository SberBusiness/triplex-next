import React from "react";
import {
    EComponentSize,
    EFontType,
    EFontWeightText,
    EMarkerStatus,
    ETextSize,
    List,
    ListItemControlsButton,
    ListItemControlsButtonDropdown,
    ListItemTable,
    MarkerStatus,
    Text,
} from "@sberbusiness/triplex-next";
import { AttachmentStrokeSrvIcon20, DotshorizontalStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { action } from "storybook/actions";
import { useArgs } from "storybook/preview-api";

export interface PlaygroundArgs {
    selected: boolean;
}

const dropdownOptions = [
    {
        id: "playground-dropdown-option-1",
        label: "Текст пункта меню 1",
        onSelect: action("onSelect: option 1"),
    },
    {
        id: "playground-dropdown-option-2",
        label: "Текст пункта меню 2",
        onSelect: action("onSelect: option 2"),
    },
];

export const Playground = ({ selected }: PlaygroundArgs) => {
    // Привязка к Storybook controls: и Controls panel, и клик по чекбоксу
    // обновляют один и тот же arg, поэтому состояние не дублируется в локальном useState.
    const [, updateArgs] = useArgs<PlaygroundArgs>();

    return (
        <div style={{ maxWidth: "500px" }}>
            <List>
                <ListItemTable
                    selected={selected}
                    onSelect={(next) => updateArgs({ selected: next })}
                    onClickItem={action("onClickItem")}
                    controlButtons={
                        <>
                            <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                Скачать
                            </ListItemControlsButton>
                            <ListItemControlsButtonDropdown
                                icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                options={dropdownOptions}
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
