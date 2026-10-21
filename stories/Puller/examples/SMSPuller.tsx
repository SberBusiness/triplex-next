import React, { useEffect, useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EFontWeightText,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Puller,
    PullerBody,
    PullerClose,
    PullerHeader,
    SMSField,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

const COUNTDOWN_TIME = 30;
const MAX_LENGTH = 6;

export const SMSPuller = () => {
    const [opened, setOpened] = useState(false);
    const [code, setCode] = useState("");
    const [countdownTimeLeft, setCountdownTimeLeft] = useState(0);

    useEffect(() => {
        if (countdownTimeLeft === 0) {
            return;
        }

        const timeoutId = window.setTimeout(() => setCountdownTimeLeft((timeLeft) => timeLeft - 1), 1000);

        return () => window.clearTimeout(timeoutId);
    }, [countdownTimeLeft]);

    // В реальном сценарии здесь отправляется запрос на новый СМС-код.
    const sendCode = () => {
        setCode("");
        setCountdownTimeLeft(COUNTDOWN_TIME);
    };

    const handleOpen = () => {
        sendCode();
        setOpened(true);
    };

    const handleSubmitCode = () => {
        setOpened(false);
    };

    return (
        <div>
            <Button
                theme={EButtonTheme.GENERAL}
                size={EComponentSize.MD}
                aria-haspopup="dialog"
                aria-expanded={opened}
                onClick={handleOpen}
            >
                Open
            </Button>
            <Puller opened={opened} setOpened={setOpened} role="dialog" aria-labelledby="sms-puller-title">
                <PullerHeader controlButtons={<PullerClose aria-label="Close" onClick={() => setOpened(false)} />} />
                <PullerBody>
                    <div style={{ padding: "16px", textAlign: "center" }}>
                        <div style={{ marginBottom: 24 }}>
                            <Title id="sms-puller-title" size={ETitleSize.H3} weight={EFontWeightTitle.BOLD}>
                                Title text
                            </Title>
                            <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY} style={{ marginTop: 12 }}>
                                This message provides additional context and relevant information
                            </Text>
                        </div>
                        <SMSField
                            code={code}
                            onChangeCode={setCode}
                            onSubmitCode={handleSubmitCode}
                            size={EComponentSize.LG}
                        >
                            <SMSField.Refresh
                                aria-label="Request a new code"
                                countdownTime={COUNTDOWN_TIME}
                                countdownTimeLeft={countdownTimeLeft}
                                onRefresh={sendCode}
                            />
                            <SMSField.Input aria-label="SMS code" maxLength={MAX_LENGTH} placeholder="Type code" />
                            <SMSField.Submit aria-label="Confirm" />
                        </SMSField>
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY} style={{ marginTop: 16 }}>
                            Preliminary commission:{" "}
                            <Text size={ETextSize.B3} type={EFontType.SECONDARY} weight={EFontWeightText.SEMIBOLD}>
                                0,00 ₽
                            </Text>
                        </Text>
                    </div>
                </PullerBody>
            </Puller>
        </div>
    );
};
