import React from "react";
import { action } from "storybook/actions";
import { SMSField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

interface IVisualItemProps {
    label: string;
    size: EComponentSize;
    status?: EFormFieldStatus.DEFAULT | EFormFieldStatus.ERROR;
    countdownTimeLeft?: number;
    withDescription?: boolean;
}

const VisualItem = ({
    label,
    size,
    status = EFormFieldStatus.DEFAULT,
    countdownTimeLeft = 0,
    withDescription = false,
}: IVisualItemProps) => (
    <div>
        <div style={{ marginBottom: 8, fontWeight: 700 }}>{label}</div>
        <SMSField
            code="12345678"
            onChangeCode={action("onChangeCode")}
            onSubmitCode={action("onSubmitCode")}
            size={size}
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

const SIZES = Object.values(EComponentSize);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 300 }}>
        {SIZES.flatMap((size) => [
            <VisualItem key={`${size}-default`} label={`${size.toUpperCase()} — DEFAULT, с кодом`} size={size} />,
            <VisualItem
                key={`${size}-error`}
                label={`${size.toUpperCase()} — ERROR, с кодом`}
                size={size}
                status={EFormFieldStatus.ERROR}
            />,
        ])}
        <VisualItem label="Начало обратного отсчёта: 10/10" size={EComponentSize.MD} countdownTimeLeft={10} />
        <VisualItem label="Обратный отсчёт: 5/10" size={EComponentSize.MD} countdownTimeLeft={5} />
        <VisualItem label="Описание и счётчик" size={EComponentSize.MD} withDescription />
    </div>
);
