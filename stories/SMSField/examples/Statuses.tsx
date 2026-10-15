import React, { useState } from "react";
import { SMSField, EComponentSize, EFormFieldStatus, ISMSFieldProps } from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: NonNullable<ISMSFieldProps["status"]>;
}

const StatusItem = ({ status }: IStatusItemProps) => {
    const [code, setCode] = useState("");

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{status.toUpperCase()}</div>
            <SMSField
                code={code}
                onChangeCode={setCode}
                onSubmitCode={() => {}}
                size={EComponentSize.LG}
                status={status}
            >
                <SMSField.Refresh
                    aria-label="Запросить новый код"
                    countdownTime={10}
                    countdownTimeLeft={0}
                    onRefresh={() => {}}
                />
                <SMSField.Input aria-label={`СМС-код ${status}`} errorText="Неверный код" placeholder="Введите код" />
                <SMSField.Submit aria-label="Отправить код" />
            </SMSField>
        </div>
    );
};

// WARNING в SMSField не поддерживается.
const STATUSES = [EFormFieldStatus.DEFAULT, EFormFieldStatus.ERROR, EFormFieldStatus.DISABLED] as const;

export const Statuses = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
