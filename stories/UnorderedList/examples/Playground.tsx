import React from "react";
import { UnorderedList, IUnorderedListItemProps, ETextSize, EFontType } from "@sberbusiness/triplex-next";
import { CheckboxtickStrokeSrvIcon20 } from "@sberbusiness/icons-next";

/** Аргументы стори Playground. */
export interface PlaygroundArgs {
    /** Массив конфигурации элементов списка. */
    items: IUnorderedListItemProps[];
    /** Размер текста, применяется ко всем элементам. */
    size: ETextSize;
    /** Тип (цвет) текста, применяется ко всем элементам. */
    type: EFontType;
    /** Кастомный маркер-иконка вместо маркера по умолчанию. */
    withCustomMarker: boolean;
}

export const Playground = ({ items, size, type, withCustomMarker }: PlaygroundArgs) => (
    <div style={{ maxWidth: "400px" }}>
        <UnorderedList
            items={items?.map((item, index) => ({
                key: index,
                ...item,
                size,
                type,
                marker: withCustomMarker ? <CheckboxtickStrokeSrvIcon20 paletteIndex={0} /> : undefined,
            }))}
        />
    </div>
);
