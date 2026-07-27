import React, { useState } from "react";
import { TextField, Text, EFormFieldStatus, ETextSize, EFontType } from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: EFormFieldStatus;
    description: string;
    descriptionType: EFontType;
}

const StatusItem = ({ status, description, descriptionType }: IStatusItemProps) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{status.toUpperCase()}</div>
            <TextField
                status={status}
                label="Label"
                description={
                    <Text tag="div" size={ETextSize.B4} type={descriptionType}>
                        {description}
                    </Text>
                }
                inputProps={{ value, onChange: handleChange, placeholder: "Type to proceed" }}
            />
        </div>
    );
};

const STATUSES: Array<IStatusItemProps> = [
    { status: EFormFieldStatus.DEFAULT, description: "(21) Description", descriptionType: EFontType.SECONDARY },
    { status: EFormFieldStatus.ERROR, description: "Error text", descriptionType: EFontType.ERROR },
    { status: EFormFieldStatus.WARNING, description: "Warning text", descriptionType: EFontType.WARNING },
    { status: EFormFieldStatus.DISABLED, description: "(21) Description", descriptionType: EFontType.SECONDARY },
];

export const Statuses = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {STATUSES.map((item) => (
            <StatusItem key={item.status} {...item} />
        ))}
    </div>
);
