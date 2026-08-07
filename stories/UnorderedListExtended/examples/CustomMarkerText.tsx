import React from "react";
import { UnorderedListExtended, EFontType } from "@sberbusiness/triplex-next";
import { CheckboxtickStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export const CustomMarkerText = () => (
    <div style={{ maxWidth: 200 }}>
        <UnorderedListExtended>
            <UnorderedListExtended.Item type={EFontType.PRIMARY}>
                <UnorderedListExtended.Item.Marker>
                    <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />
                </UnorderedListExtended.Item.Marker>
                Анализ рисков по 115-ФЗ
            </UnorderedListExtended.Item>
            <UnorderedListExtended.Item type={EFontType.PRIMARY}>
                <UnorderedListExtended.Item.Marker>
                    <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />
                </UnorderedListExtended.Item.Marker>
                Рекомендации с учётом отрасли
            </UnorderedListExtended.Item>
            <UnorderedListExtended.Item type={EFontType.PRIMARY}>
                <UnorderedListExtended.Item.Marker>
                    <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />
                </UnorderedListExtended.Item.Marker>
                Проверка данных ФНС и других госисточников
            </UnorderedListExtended.Item>
            <UnorderedListExtended.Item type={EFontType.PRIMARY}>
                <UnorderedListExtended.Item.Marker>
                    <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />
                </UnorderedListExtended.Item.Marker>
                Оценка финансовой устойчивости компании
            </UnorderedListExtended.Item>
            <UnorderedListExtended.Item type={EFontType.TERTIARY}>
                <UnorderedListExtended.Item.Marker>
                    <CheckboxtickStrokeSrvIcon20 paletteIndex={5} />
                </UnorderedListExtended.Item.Marker>
                Личный менеджер
            </UnorderedListExtended.Item>
            <UnorderedListExtended.Item type={EFontType.TERTIARY}>
                <UnorderedListExtended.Item.Marker>
                    <CheckboxtickStrokeSrvIcon20 paletteIndex={5} />
                </UnorderedListExtended.Item.Marker>
                Помощь при запросах и отказах от банка по операциям
            </UnorderedListExtended.Item>
        </UnorderedListExtended>
    </div>
);
