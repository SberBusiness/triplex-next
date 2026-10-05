import React from "react";
import { action } from "storybook/actions";
import { SMSField, EComponentSize, EFormFieldStatus } from "@sberbusiness/triplex-next";

export const VisualTestsErrorFocused = () => (
    <div style={{ width: 300 }}>
        <SMSField
            code=""
            onChangeCode={action("onChangeCode")}
            onSubmitCode={action("onSubmitCode")}
            size={EComponentSize.MD}
            status={EFormFieldStatus.ERROR}
        >
            <SMSField.Refresh
                aria-label="Запросить новый код"
                countdownTime={10}
                countdownTimeLeft={0}
                onRefresh={action("onRefresh")}
            />
            <SMSField.Input aria-label="СМС-код" errorText="Неверный код" placeholder="Введите код" />
            <SMSField.Submit aria-label="Отправить код" />
        </SMSField>
    </div>
);
