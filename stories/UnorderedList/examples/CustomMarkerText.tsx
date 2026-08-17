import React from "react";
import { UnorderedList, EFontType } from "@sberbusiness/triplex-next";
import { CheckboxtickStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export const CustomMarkerText = () => (
    <div style={{ maxWidth: 200 }}>
        <UnorderedList
            items={[
                {
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Анализ рисков по 115-ФЗ",
                },
                {
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Рекомендации с учётом отрасли",
                },
                {
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Проверка данных ФНС и других госисточников",
                },
                {
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Оценка финансовой устойчивости компании",
                },
                {
                    type: EFontType.TERTIARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={5} />,
                    children: "Личный менеджер",
                },
                {
                    type: EFontType.TERTIARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={5} />,
                    children: "Помощь при запросах и отказах от банка по операциям",
                },
            ]}
        />
    </div>
);
