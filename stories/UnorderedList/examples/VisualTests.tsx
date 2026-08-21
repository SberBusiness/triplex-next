import React from "react";
import { UnorderedList, ETextSize, EFontType, EFontWeightText, ELineType } from "@sberbusiness/triplex-next";
import { CheckboxtickStrokeSrvIcon20 } from "@sberbusiness/icons-next";

const BLOCK_STYLE: React.CSSProperties = { width: "220px" };

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", flexWrap: "wrap" }}>
        {/* Маркеры по умолчанию. */}
        <div style={BLOCK_STYLE}>
            <UnorderedList
                items={[{ children: "List item text" }, { children: "List item text" }, { children: "List item text" }]}
            />
        </div>
        {/* Кастомный маркер-иконка. */}
        <div style={BLOCK_STYLE}>
            <UnorderedList
                items={[
                    { marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />, children: "List item text" },
                    { marker: <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />, children: "List item text" },
                ]}
            />
        </div>
        {/* Текстовый маркер. */}
        <div style={BLOCK_STYLE}>
            <UnorderedList
                items={[
                    { marker: "1.", children: "List item text" },
                    { marker: "2.", children: "List item text" },
                    { marker: "10.", children: "List item text" },
                ]}
            />
        </div>
        {/* Многострочный текст: маркер выравнивается по первой строке. */}
        <div style={{ width: "160px" }}>
            <UnorderedList
                items={[
                    { children: "Очень длинный текст элемента списка, который переносится на несколько строк" },
                    { children: "Короткий элемент" },
                ]}
            />
        </div>
        {/* Типы (цвет текста и маркера). */}
        <div style={BLOCK_STYLE}>
            <UnorderedList
                items={[
                    { type: EFontType.PRIMARY, children: "Primary" },
                    { type: EFontType.SECONDARY, children: "Secondary" },
                    { type: EFontType.TERTIARY, children: "Tertiary" },
                    { type: EFontType.DISABLED, children: "Disabled" },
                    { type: EFontType.SUCCESS, children: "Success" },
                    { type: EFontType.ERROR, children: "Error" },
                ]}
            />
        </div>
        {/* Толщина шрифта и интерлиньяж. */}
        <div style={BLOCK_STYLE}>
            <UnorderedList
                items={[
                    { weight: EFontWeightText.SEMIBOLD, children: "Semibold item" },
                    { line: ELineType.COMPACT, children: "Compact line item" },
                    { size: ETextSize.B1, weight: EFontWeightText.SEMIBOLD, children: "B1 semibold item" },
                ]}
            />
        </div>
        {/* Один элемент. */}
        <div style={BLOCK_STYLE}>
            <UnorderedList items={[{ children: "Single list item" }]} />
        </div>
    </div>
);
