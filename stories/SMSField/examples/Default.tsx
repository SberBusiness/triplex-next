import React, { useState } from "react";
import { SMSField, EComponentSize } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [code, setCode] = useState("");

    return (
        <div style={{ width: 300 }}>
            <SMSField code={code} onChangeCode={setCode} onSubmitCode={() => {}} size={EComponentSize.MD}>
                <SMSField.Refresh
                    aria-label="Запросить новый код"
                    countdownTime={10}
                    countdownTimeLeft={0}
                    onRefresh={() => {}}
                />
                <SMSField.Input aria-label="СМС-код" placeholder="Введите код" />
                <SMSField.Submit aria-label="Отправить код" />
            </SMSField>
        </div>
    );
};
