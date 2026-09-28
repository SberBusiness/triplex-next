import React from "react";
import { Spoiler, Text, EComponentSize, ETextSize, EFontType } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);

const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.SM]: ETextSize.B4,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B2,
};

/** Раскрытое состояние задаётся контролируемо, чтобы скриншот не зависел от взаимодействия. */
const keepExpanded = () => {};

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "flex-start", gap: 50, flexWrap: "wrap" }}>
                <Spoiler
                    size={size}
                    labelExpand={`${size.toUpperCase()} свёрнут`}
                    labelCollapse={`${size.toUpperCase()} раскрыт`}
                >
                    <Text size={SIZE_TO_TEXT_SIZE_MAP[size]} type={EFontType.PRIMARY}>
                        Скрытый контент
                    </Text>
                </Spoiler>
                <Spoiler
                    size={size}
                    expanded={true}
                    toggle={keepExpanded}
                    labelExpand={`${size.toUpperCase()} свёрнут`}
                    labelCollapse={`${size.toUpperCase()} раскрыт`}
                >
                    <Text size={SIZE_TO_TEXT_SIZE_MAP[size]} type={EFontType.PRIMARY}>
                        Скрытый контент
                    </Text>
                </Spoiler>
            </div>
        ))}

        <div style={{ display: "flex", alignItems: "flex-start", gap: 50, flexWrap: "wrap" }}>
            {/* Правый блок заголовка. */}
            <Spoiler
                size={EComponentSize.MD}
                expanded={true}
                toggle={keepExpanded}
                labelExpand="Развернуть"
                labelCollapse="Свернуть"
                rightBlock={
                    <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                        12 документов
                    </Text>
                }
            >
                <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                    Скрытый контент
                </Text>
            </Spoiler>

            {/* Длинный текст кнопки переносится по словам и выравнивается по левому краю. */}
            <div style={{ width: 240 }}>
                <Spoiler
                    size={EComponentSize.MD}
                    labelExpand="Очень длинный текст кнопки спойлера, который переносится на несколько строк"
                    labelCollapse="Свернуть"
                >
                    <Text size={ETextSize.B3} type={EFontType.PRIMARY}>
                        Скрытый контент
                    </Text>
                </Spoiler>
            </div>
        </div>
    </div>
);
