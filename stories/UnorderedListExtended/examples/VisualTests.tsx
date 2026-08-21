import React from "react";
import { UnorderedListExtended, ETextSize, EFontType, EFontWeightText, ELineType } from "@sberbusiness/triplex-next";
import { CheckboxtickStrokeSrvIcon20 } from "@sberbusiness/icons-next";

const BLOCK_STYLE: React.CSSProperties = { width: "220px" };

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", flexWrap: "wrap" }}>
        {/* Маркеры по умолчанию. */}
        <div style={BLOCK_STYLE}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker />
                    List item text
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker />
                    List item text
                </UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
        {/* Элементы без маркера: в расширенном API маркер добавляется явно. */}
        <div style={BLOCK_STYLE}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item>Item without marker</UnorderedListExtended.Item>
                <UnorderedListExtended.Item>Item without marker</UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
        {/* Кастомный маркер-иконка. */}
        <div style={BLOCK_STYLE}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker>
                        <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />
                    </UnorderedListExtended.Item.Marker>
                    List item text
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker>
                        <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />
                    </UnorderedListExtended.Item.Marker>
                    List item text
                </UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
        {/* Текстовый маркер. */}
        <div style={BLOCK_STYLE}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker>1.</UnorderedListExtended.Item.Marker>
                    List item text
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker>10.</UnorderedListExtended.Item.Marker>
                    List item text
                </UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
        {/* Многострочный текст: маркер выравнивается по первой строке. */}
        <div style={{ width: "160px" }}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker />
                    Очень длинный текст элемента списка, который переносится на несколько строк
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker />
                    Короткий элемент
                </UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
        {/* Типы (цвет текста и маркера). */}
        <div style={BLOCK_STYLE}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item type={EFontType.PRIMARY}>
                    <UnorderedListExtended.Item.Marker />
                    Primary
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item type={EFontType.SECONDARY}>
                    <UnorderedListExtended.Item.Marker />
                    Secondary
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item type={EFontType.TERTIARY}>
                    <UnorderedListExtended.Item.Marker />
                    Tertiary
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item type={EFontType.ERROR}>
                    <UnorderedListExtended.Item.Marker />
                    Error
                </UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
        {/* Толщина шрифта и интерлиньяж. */}
        <div style={BLOCK_STYLE}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item weight={EFontWeightText.SEMIBOLD}>
                    <UnorderedListExtended.Item.Marker />
                    Semibold item
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item line={ELineType.COMPACT}>
                    <UnorderedListExtended.Item.Marker />
                    Compact line item
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item size={ETextSize.B1} weight={EFontWeightText.SEMIBOLD}>
                    <UnorderedListExtended.Item.Marker />
                    B1 semibold item
                </UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
        {/* Смешанные маркеры внутри одного списка. */}
        <div style={BLOCK_STYLE}>
            <UnorderedListExtended>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker />
                    Default marker
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item>
                    <UnorderedListExtended.Item.Marker>
                        <CheckboxtickStrokeSrvIcon20 paletteIndex={0} />
                    </UnorderedListExtended.Item.Marker>
                    Icon marker
                </UnorderedListExtended.Item>
                <UnorderedListExtended.Item>Without marker</UnorderedListExtended.Item>
            </UnorderedListExtended>
        </div>
    </div>
);
