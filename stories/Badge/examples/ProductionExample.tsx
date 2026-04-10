import React from "react";
import { NewsmallFilledSrvIcon20, PercentsmallStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { Badge, EComponentSize, EFontType, EFontWeightText, ETextSize, Text } from "@sberbusiness/triplex-next";

export const ProductionExample = () => (
    <div style={{ display: "flex", gap: "16px" }}>
        <Badge size={EComponentSize.MD} prefix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />} />
        <Badge size={EComponentSize.MD} prefix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />}>
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                Badge text
            </Text>
        </Badge>
        <Badge size={EComponentSize.MD} postfix={<PercentsmallStrokeSrvIcon20 paletteIndex={7} />}>
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                Badge text
            </Text>
        </Badge>
        <Badge
            size={EComponentSize.MD}
            prefix={<NewsmallFilledSrvIcon20 paletteIndex={7} />}
            style={{ backgroundColor: "#1297FE" }}
        >
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                Новинка
            </Text>
        </Badge>
        <Badge size={EComponentSize.MD} style={{ backgroundColor: "#E3FFFA" }}>
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.BRAND}>
                Рисков не выявлено
            </Text>
        </Badge>
        <Badge size={EComponentSize.MD} style={{ backgroundColor: "#FFF0F3" }}>
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.ERROR}>
                Негативные факторы
            </Text>
        </Badge>
        <Badge size={EComponentSize.MD} style={{ backgroundColor: "#FFF4DB" }}>
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.WARNING}>
                Обратите внимание
            </Text>
        </Badge>
        <Badge size={EComponentSize.MD} style={{ backgroundColor: "#EEF3FC" }}>
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.SYSTEM}>
                Нет данных
            </Text>
        </Badge>
    </div>
);
