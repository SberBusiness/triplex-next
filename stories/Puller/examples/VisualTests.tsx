import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
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

/**
 * Максимальное наполнение: длинный заголовок с переносом, лоадер и кнопка закрытия в controlButtons,
 * список длиннее max-height (скролл тела), выбранный элемент, значок уведомлений, футер с двумя кнопками.
 * Раскрывается play-функцией.
 */
export const VisualTests = () => {
    const [opened, setOpened] = useState(false);

    const handleSetOpened = (nextOpened: boolean) => {
        action("setOpened")(nextOpened);
        setOpened(nextOpened);
    };

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-haspopup="dialog"
                aria-expanded={opened}
                onClick={() => handleSetOpened(true)}
            >
                Open
            </Button>
            <Puller opened={opened} setOpened={handleSetOpened} role="dialog" aria-label="Visual tests">
                <PullerHeader
                    controlButtons={
                        <>
                            <PullerLoader />
                            <PullerClose aria-label="Close" onClick={() => handleSetOpened(false)} />
                        </>
                    }
                >
                    <Text size={ETextSize.B1}>
                        A very long puller title that does not fit on one line and wraps onto the next one
                    </Text>
                </PullerHeader>
                <PullerBody>
                    <PullerList>
                        {LONG_OPTIONS.map((option, index) => (
                            <PullerListItem
                                key={option.id}
                                id={option.id}
                                selected={index === 1}
                                showNotificationIcon={index === 2}
                                onSelect={() => action("onSelect")(option.id)}
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
                            onClick={() => handleSetOpened(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            theme={EButtonTheme.GENERAL}
                            size={EComponentSize.MD}
                            block
                            onClick={() => handleSetOpened(false)}
                        >
                            Apply
                        </Button>
                    </div>
                </PullerFooter>
            </Puller>
        </div>
    );
};
