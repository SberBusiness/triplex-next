import React, { useState } from "react";
import { EComponentSize, ISelectFieldOption, SelectField } from "@sberbusiness/triplex-next";

const OPTIONS: ISelectFieldOption[] = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
];

export const Loading = () => {
    const [value, setValue] = useState<ISelectFieldOption>();

    return (
        <div style={{ maxWidth: "300px" }}>
            <SelectField
                size={EComponentSize.LG}
                loading
                value={value}
                options={OPTIONS}
                onChange={setValue}
                placeholder="Не выбрано"
                targetProps={{ fieldLabel: "Загрузка опций" }}
                mobileTitle="Загрузка опций"
            />
        </div>
    );
};
