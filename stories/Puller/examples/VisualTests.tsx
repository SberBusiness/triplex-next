import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    Portal,
    Puller,
    PullerBody,
    PullerClose,
    PullerFooter,
    PullerHeader,
    PullerList,
    PullerListItem,
    PullerLoader,
    Text,
} from "@sberbusiness/triplex-next";

const LONG_OPTIONS = Array.from({ length: 12 }, (_, index) => ({
    id: `visual-option-${index + 1}`,
    label: `Value ${index + 1}`,
}));

/** Максимальное наполнение: перенос заголовка, скролл тела, все состояния элементов. Раскрывается play-функцией. */
export const VisualTests = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-haspopup="dialog"
                aria-expanded={opened}
                onClick={() => setOpened(true)}
            >
                Open
            </Button>
            <Portal container={document.body}>
                <Puller opened={opened} setOpened={setOpened} role="dialog" aria-label="Visual tests">
                    <PullerHeader
                        controlButtons={
                            <>
                                <PullerLoader />
                                <PullerClose aria-label="Close" onClick={() => setOpened(false)} />
                            </>
                        }
                    >
                        <Text size={ETextSize.B1}>
                            A very long puller title that does not fit on one line and wraps onto the next one
                        </Text>
                    </PullerHeader>
                    <PullerBody>
                        <PullerList aria-label="Options">
                            {LONG_OPTIONS.map((option, index) => (
                                <PullerListItem
                                    key={option.id}
                                    id={option.id}
                                    selected={index === 1}
                                    showNotificationIcon={index === 2}
                                >
                                    {option.label}
                                </PullerListItem>
                            ))}
                        </PullerList>
                    </PullerBody>
                    <PullerFooter>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <Button
                                theme={EButtonTheme.SECONDARY}
                                size={EComponentSize.MD}
                                block
                                onClick={() => setOpened(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EComponentSize.MD}
                                block
                                onClick={() => setOpened(false)}
                            >
                                Apply
                            </Button>
                        </div>
                    </PullerFooter>
                </Puller>
            </Portal>
        </div>
    );
};
