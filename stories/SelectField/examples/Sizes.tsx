import React, { useState } from "react";
import { EComponentSize, ISelectFieldOption, SelectField } from "@sberbusiness/triplex-next";

const OPTIONS: ISelectFieldOption[] = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
];

const SIZES = Object.values(EComponentSize);

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [value, setValue] = useState<ISelectFieldOption | undefined>(OPTIONS[0]);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <SelectField
                size={size}
                value={value}
                options={OPTIONS}
                onChange={setValue}
                placeholder="Не выбрано"
                targetProps={{ fieldLabel: "Выберите опцию" }}
                mobileTitle="Выберите опцию"
            />
        </div>
    );
};

export const Sizes = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
