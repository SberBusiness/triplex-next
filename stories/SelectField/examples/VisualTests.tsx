import React, { useState } from "react";
import { EComponentSize, EFormFieldStatus, ISelectFieldOption, SelectField } from "@sberbusiness/triplex-next";

const OPTIONS: ISelectFieldOption[] = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
    { id: "option4", value: "option4", label: "Четвёртая опция" },
    { id: "option5", value: "option5", label: "Пятая опция" },
];

/** Раскрытый список: подсветка выбранной опции и позиционирование выпадающего блока. Раскрывается play-функцией. */
const OpenedSelect = () => {
    const [value, setValue] = useState<ISelectFieldOption | undefined>(OPTIONS[1]);

    return (
        <div style={{ width: "240px" }}>
            <SelectField
                size={EComponentSize.MD}
                value={value}
                options={OPTIONS}
                onChange={setValue}
                placeholder="Не выбрано"
                targetProps={{ fieldLabel: "Открыть список" }}
                mobileTitle="Открыть список"
            />
        </div>
    );
};

/** Длинное значение: обрезка текста в поле выбора. */
const LongValueSelect = () => {
    const [value, setValue] = useState<ISelectFieldOption | undefined>({
        id: "long",
        value: "long",
        label: "Очень длинное название выбранной опции",
    });

    return (
        <div style={{ width: "240px" }}>
            <SelectField
                size={EComponentSize.LG}
                value={value}
                options={OPTIONS}
                onChange={setValue}
                placeholder="Не выбрано"
                targetProps={{ fieldLabel: "Значение не помещается" }}
                mobileTitle="Значение не помещается"
            />
        </div>
    );
};

/** Загрузка в маленьком размере: лоадер занимает место каретки, поле не открывается. */
const LoadingSmallSelect = () => (
    <div style={{ width: "240px" }}>
        <SelectField
            size={EComponentSize.SM}
            loading
            options={OPTIONS}
            onChange={() => {}}
            placeholder="Не выбрано"
            targetProps={{ fieldLabel: "Загрузка опций" }}
            mobileTitle="Загрузка опций"
        />
    </div>
);

/** Пустое заблокированное поле: плейсхолдер и каретка в состоянии DISABLED. */
const DisabledSelect = () => (
    <div style={{ width: "240px" }}>
        <SelectField
            size={EComponentSize.MD}
            status={EFormFieldStatus.DISABLED}
            options={OPTIONS}
            onChange={() => {}}
            placeholder="Не выбрано"
            targetProps={{ fieldLabel: "Поле недоступно" }}
            mobileTitle="Поле недоступно"
        />
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap", height: "360px" }}>
        <OpenedSelect />
        <LongValueSelect />
        <LoadingSmallSelect />
        <DisabledSelect />
    </div>
);
