import React, { useEffect, useRef, useState } from "react";
import { action } from "storybook/actions";
import { SMSField } from "@sberbusiness/triplex-next";

export interface IPlaygroundArgs
    extends
        Pick<React.ComponentProps<typeof SMSField>, "size" | "status">,
        Pick<React.ComponentProps<typeof SMSField.Input>, "description" | "errorText" | "maxLength" | "placeholder"> {
    withCounter: boolean;
}

const COUNTDOWN_TIME = 10;

export const Playground = ({
    description,
    errorText,
    maxLength = 8,
    placeholder,
    size,
    status,
    withCounter,
}: IPlaygroundArgs) => {
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

    const handleChangeCode = (value: string) => {
        setCode(value);
        action("onChangeCode")(value);
    };

    const handleRefresh = () => {
        setCode("");
        setCountdownTimeLeft(COUNTDOWN_TIME);
        action("onRefresh")();
    };

    return (
        <div style={{ width: 300 }}>
            <SMSField
                code={code}
                onChangeCode={handleChangeCode}
                onSubmitCode={action("onSubmitCode")}
                size={size}
                status={status}
            >
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
                    counter={withCounter ? `${code.length}/${maxLength}` : undefined}
                    description={description}
                    errorText={errorText}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
                <SMSField.Submit aria-label="Отправить код" />
            </SMSField>
        </div>
    );
};
