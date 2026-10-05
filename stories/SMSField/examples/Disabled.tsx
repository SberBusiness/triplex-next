import React from "react";
import { SMSField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);
const CODES = ["", "12345678"];

export const Disabled = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 300 }}>
        {SIZES.flatMap((size) =>
            CODES.map((code) => (
                <div key={`${size}-${code}`}>
                    <div style={{ marginBottom: 8, fontWeight: 700 }}>
                        {size.toUpperCase()} — DISABLED, {code ? "с кодом" : "пустое поле"}
                    </div>
                    <SMSField
                        code={code}
                        onChangeCode={() => {}}
                        onSubmitCode={() => {}}
                        size={size}
                        status={EFormFieldStatus.DISABLED}
                    >
                        <SMSField.Refresh
                            aria-label="Запросить новый код"
                            countdownTime={10}
                            countdownTimeLeft={5}
                            onRefresh={() => {}}
                        />
                        <SMSField.Input aria-label="СМС-код" placeholder="Введите код" />
                        <SMSField.Submit aria-label="Отправить код" />
                    </SMSField>
                </div>
            )),
        )}
    </div>
);
