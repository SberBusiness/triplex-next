import React, { useState } from "react";
import { SMSField, EComponentSize } from "@sberbusiness/triplex-next";

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const [code, setCode] = useState("");

    return (
        <div>
            <div style={{ marginBottom: 8, fontWeight: 700 }}>{size.toUpperCase()}</div>
            <SMSField code={code} onChangeCode={setCode} onSubmitCode={() => {}} size={size}>
                <SMSField.Refresh
                    aria-label="Запросить новый код"
                    countdownTime={10}
                    countdownTimeLeft={0}
                    onRefresh={() => {}}
                />
                <SMSField.Input aria-label={`СМС-код ${size}`} placeholder="Введите код" />
                <SMSField.Submit aria-label="Отправить код" />
            </SMSField>
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 300 }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
