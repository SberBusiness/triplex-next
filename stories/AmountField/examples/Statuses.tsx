import React, { useState } from "react";
import { AmountField, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [value, setValue] = useState<string>("");

    return (
        <div style={{ maxWidth: 300 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
            <AmountField
                status={status}
                label="Label"
                inputProps={{
                    value,
                    placeholder: "0,00 ₽",
                    onChange: setValue,
                }}
                currency="₽"
            />
        </div>
    );
};

const STATUSES = Object.values(EFormFieldStatus);

export const Statuses = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
