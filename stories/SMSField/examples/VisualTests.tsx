import React from "react";
import { action } from "storybook/actions";
import { SMSField, EComponentSize, EFormFieldStatus, ISMSFieldProps } from "@sberbusiness/triplex-next";

interface IVisualItemProps {
    label: string;
    status?: ISMSFieldProps["status"];
    countdownTimeLeft?: number;
    withDescription?: boolean;
}

const VisualItem = ({
    label,
    status = EFormFieldStatus.DEFAULT,
    countdownTimeLeft = 0,
    withDescription = false,
}: IVisualItemProps) => (
    <div>
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{label}</div>
        <SMSField
            code="12345678"
            onChangeCode={action("onChangeCode")}
            onSubmitCode={action("onSubmitCode")}
            size={EComponentSize.LG}
            status={status}
        >
            <SMSField.Refresh
                aria-label="Запросить новый код"
                countdownTime={10}
                countdownTimeLeft={countdownTimeLeft}
                onRefresh={action("onRefresh")}
            />
            <SMSField.Input
                aria-label="СМС-код"
                counter={withDescription ? "8/8" : undefined}
                description={withDescription ? "Введите код из СМС" : undefined}
                errorText="Неверный код"
                placeholder="Введите код"
            />
            <SMSField.Submit aria-label="Отправить код" />
        </SMSField>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
        <VisualItem label="DEFAULT, с кодом" />
        <VisualItem label="ERROR, с кодом" status={EFormFieldStatus.ERROR} />
        <VisualItem label="DISABLED, с кодом" status={EFormFieldStatus.DISABLED} />
        <VisualItem label="Начало обратного отсчёта: 10/10" countdownTimeLeft={10} />
        <VisualItem label="Обратный отсчёт: 5/10" countdownTimeLeft={5} />
        <VisualItem label="Описание и счётчик" withDescription />
    </div>
);
