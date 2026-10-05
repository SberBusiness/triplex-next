import React, { useEffect, useRef, useState } from "react";
import { SMSField, EComponentSize } from "@sberbusiness/triplex-next";

const COUNTDOWN_TIME = 10;
const MAX_LENGTH = 8;

export const Example = () => {
    const [code, setCode] = useState("");
    const [countdownTimeLeft, setCountdownTimeLeft] = useState(0);
    const targetRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (countdownTimeLeft === 0) {
            return;
        }

        const timeoutId = window.setTimeout(() => setCountdownTimeLeft((timeLeft) => timeLeft - 1), 1000);

        return () => window.clearTimeout(timeoutId);
    }, [countdownTimeLeft]);

    const handleRefresh = () => {
        setCode("");
        setCountdownTimeLeft(COUNTDOWN_TIME);
    };

    return (
        <div style={{ width: 300 }}>
            <SMSField code={code} onChangeCode={setCode} onSubmitCode={() => {}} size={EComponentSize.MD}>
                <SMSField.Tooltip targetRef={targetRef} message="Запросить СМС-код ещё раз">
                    <SMSField.Refresh
                        aria-label="Запросить новый код"
                        countdownTime={COUNTDOWN_TIME}
                        countdownTimeLeft={countdownTimeLeft}
                        onRefresh={handleRefresh}
                        ref={targetRef}
                    />
                </SMSField.Tooltip>
                <SMSField.Input
                    aria-label="СМС-код"
                    counter={`${code.length}/${MAX_LENGTH}`}
                    description="Введите код из СМС"
                    maxLength={MAX_LENGTH}
                    placeholder="Введите код"
                />
                <SMSField.Submit aria-label="Отправить код" />
            </SMSField>
        </div>
    );
};
