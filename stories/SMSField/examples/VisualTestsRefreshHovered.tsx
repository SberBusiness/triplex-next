import React, { useRef } from "react";
import { action } from "storybook/actions";
import { SMSField, EComponentSize } from "@sberbusiness/triplex-next";

export const VisualTestsRefreshHovered = () => {
    const targetRef = useRef<HTMLButtonElement>(null);

    return (
        <div style={{ paddingTop: 80, width: 300 }}>
            <SMSField
                code=""
                onChangeCode={action("onChangeCode")}
                onSubmitCode={action("onSubmitCode")}
                size={EComponentSize.MD}
            >
                <SMSField.Tooltip
                    id="smsfield-refresh-tooltip"
                    targetRef={targetRef}
                    message="Запросить СМС-код ещё раз"
                >
                    <SMSField.Refresh
                        aria-label="Запросить новый код"
                        countdownTime={10}
                        countdownTimeLeft={0}
                        onRefresh={action("onRefresh")}
                        ref={targetRef}
                    />
                </SMSField.Tooltip>
                <SMSField.Input aria-label="СМС-код" placeholder="Введите код" />
                <SMSField.Submit aria-label="Отправить код" />
            </SMSField>
        </div>
    );
};
