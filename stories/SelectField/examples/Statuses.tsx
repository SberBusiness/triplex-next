import React, { useState } from "react";
import { EComponentSize, EFormFieldStatus, ISelectFieldOption, SelectField } from "@sberbusiness/triplex-next";

const OPTIONS: ISelectFieldOption[] = [
    { id: "option1", value: "option1", label: "Первая опция" },
    { id: "option2", value: "option2", label: "Вторая опция" },
    { id: "option3", value: "option3", label: "Третья опция" },
];

const STATUSES = Object.values(EFormFieldStatus);

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [value, setValue] = useState<ISelectFieldOption | undefined>(OPTIONS[0]);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{status.toUpperCase()}</div>
            <SelectField
                size={EComponentSize.LG}
                status={status}
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

export const Statuses = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
