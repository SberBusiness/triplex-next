import React, { useState } from "react";
import { DateField, EFontType, EFormFieldStatus, ETitleSize, Gap, Title } from "@sberbusiness/triplex-next";

export const StatesExample = () => {
    const [value, setValue] = useState("");
    return (
        <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column" }}>
            <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                Обычное состояние
            </Title>
            <DateField
                value={value}
                onChange={setValue}
                label="Label"
                placeholderMask="дд.мм.гггг"
                status={EFormFieldStatus.DEFAULT}
            />
            <Gap size={24} />
            <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                Состояние ошибки
            </Title>
            <DateField
                value={value}
                onChange={setValue}
                label="Label"
                placeholderMask="дд.мм.гггг"
                status={EFormFieldStatus.ERROR}
            />
            <Gap size={24} />
            <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                Состояние предупреждения
            </Title>
            <DateField
                value={value}
                onChange={setValue}
                label="Label"
                placeholderMask="дд.мм.гггг"
                status={EFormFieldStatus.WARNING}
            />
            <Gap size={24} />
            <Title tag="h3" size={ETitleSize.H3} type={EFontType.PRIMARY} style={{ marginBottom: "16px" }}>
                Отключенное состояние
            </Title>
            <DateField
                value={value}
                onChange={setValue}
                label="Label"
                placeholderMask="дд.мм.гггг"
                status={EFormFieldStatus.DISABLED}
            />
        </div>
    );
};
