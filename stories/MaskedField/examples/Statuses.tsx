import React, { useState } from "react";
import { MaskedField, FormFieldMaskedInput, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{status.toUpperCase()}</div>
            <MaskedField
                status={status}
                label="Label"
                maskedInputProps={{
                    mask: FormFieldMaskedInput.presets.masks.phone,
                    value,
                    onChange: handleChange,
                }}
            />
        </div>
    );
};

const STATUSES = Object.values(EFormFieldStatus);

export const Statuses = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
