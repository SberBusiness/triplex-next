import React, { useState } from "react";
import { NumberField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [value, setValue] = useState<string>("");

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => setValue(event.target.value);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{status.toUpperCase()}</div>
            <NumberField
                size={EComponentSize.LG}
                status={status}
                inputProps={{
                    value,
                    placeholder: "0",
                    onChange: handleInputChange,
                }}
                label={"Label"}
            />
        </div>
    );
};

const STATUSES = Object.values(EFormFieldStatus);

export const StatusesExample = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
