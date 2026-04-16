import React, { useState } from "react";
import { TextareaField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [value, setValue] = useState("");

    const handleTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
            <TextareaField
                size={EComponentSize.LG}
                status={status}
                textareaProps={{
                    value,
                    placeholder: "Type to proceed",
                    onChange: handleTextareaChange,
                }}
                label="Label"
            />
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
