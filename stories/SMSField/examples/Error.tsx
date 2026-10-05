import React, { useState } from "react";
import { SMSField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface IErrorItemProps {
    size: EComponentSize;
}

const ErrorItem = ({ size }: IErrorItemProps) => {
    const [code, setCode] = useState("");

    return (
        <div>
            <div style={{ marginBottom: 8, fontWeight: 700 }}>{size.toUpperCase()} — ERROR</div>
            <SMSField
                code={code}
                onChangeCode={setCode}
                onSubmitCode={() => {}}
                size={size}
                status={EFormFieldStatus.ERROR}
            >
                <SMSField.Refresh
                    aria-label="Запросить новый код"
                    countdownTime={10}
                    countdownTimeLeft={0}
                    onRefresh={() => {}}
                />
                <SMSField.Input aria-label={`СМС-код ${size}`} errorText="Неверный код" placeholder="Введите код" />
                <SMSField.Submit aria-label="Отправить код" />
            </SMSField>
        </div>
    );
};

const SIZES = Object.values(EComponentSize);

export const Error = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 300 }}>
        {SIZES.map((size) => (
            <ErrorItem key={size} size={size} />
        ))}
    </div>
);
