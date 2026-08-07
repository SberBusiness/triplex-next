import React from "react";
import { UnorderedList, EFontType } from "@sberbusiness/triplex-next";
import { CheckboxtickStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export const CustomMarkerText = () => (
    <div style={{ maxWidth: 200 }}>
        <UnorderedList
            items={[
                {
                    key: "risk-115",
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Анализ рисков по 115-ФЗ",
                },
                {
                    key: "industry-rec",
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Рекомендации с учётом отрасли",
                },
                {
                    key: "fns-check",
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Проверка данных ФНС и других госисточников",
                },
                {
                    key: "fin-stability",
                    type: EFontType.PRIMARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />,
                    children: "Оценка финансовой устойчивости компании",
                },
                {
                    key: "personal-manager",
                    type: EFontType.TERTIARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={5} />,
                    children: "Личный менеджер",
                },
                {
                    key: "bank-support",
                    type: EFontType.TERTIARY,
                    marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={5} />,
                    children: "Помощь при запросах и отказах от банка по операциям",
                },
            ]}
        />
    </div>
);
