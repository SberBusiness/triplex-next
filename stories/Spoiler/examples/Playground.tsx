import React from "react";
import { action } from "storybook/actions";
import { Spoiler, Text, EComponentSize, ETextSize, EFontType } from "@sberbusiness/triplex-next";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs {
    /** Размер компонента. */
    size: EComponentSize;
    /** Текст раскрытия содержимого. */
    labelExpand: string;
    /** Текст скрытия содержимого. */
    labelCollapse: string;
}

const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.SM]: ETextSize.B4,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B2,
};

export const Playground = ({ size, labelExpand, labelCollapse }: IPlaygroundArgs) => (
    <Spoiler size={size} labelExpand={labelExpand} labelCollapse={labelCollapse} onToggle={action("onToggle")}>
        <Text size={SIZE_TO_TEXT_SIZE_MAP[size]} type={EFontType.PRIMARY}>
            Скрытый контент
        </Text>
    </Spoiler>
);
