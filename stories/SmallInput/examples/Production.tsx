import React, { useState } from "react";
import { SmallInput, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

const DOCUMENT_NUMBER_MAX_LENGTH = 6;

export const Production = () => {
    const [documentNumber, setDocumentNumber] = useState("000123");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setDocumentNumber(event.target.value.replace(/\D/g, ""));
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text tag="span" size={ETextSize.B3} type={EFontType.SECONDARY}>
                Документ №
            </Text>
            <div style={{ width: "80px" }}>
                <SmallInput
                    value={documentNumber}
                    placeholder="000000"
                    maxLength={DOCUMENT_NUMBER_MAX_LENGTH}
                    aria-label="Номер документа"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};
