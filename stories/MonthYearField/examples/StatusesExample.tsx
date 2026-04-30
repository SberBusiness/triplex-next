import React, { useState } from "react";
import { MonthYearField, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [value, setValue] = useState<string>("");

    return (
        <div style={{ maxWidth: 300 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
            <MonthYearField status={status} value={value} label="Label" placeholder="мм.гггг" onChange={setValue} />
        </div>
    );
};

const STATUSES = Object.values(EFormFieldStatus);

export const StatusesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
