import React from "react";
import { action } from "storybook/actions";
import { SMSField, EComponentSize } from "@sberbusiness/triplex-next";

export const VisualTestsFocused = () => (
    <div style={{ width: 300 }}>
        <SMSField
            code=""
            onChangeCode={action("onChangeCode")}
            onSubmitCode={action("onSubmitCode")}
            size={EComponentSize.MD}
        >
            <SMSField.Refresh
                aria-label="Запросить новый код"
                countdownTime={10}
                countdownTimeLeft={0}
                onRefresh={action("onRefresh")}
            />
            <SMSField.Input aria-label="СМС-код" placeholder="Введите код" />
            <SMSField.Submit aria-label="Отправить код" />
        </SMSField>
    </div>
);
