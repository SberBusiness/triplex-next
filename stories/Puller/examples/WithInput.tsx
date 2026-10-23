import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    Portal,
    Puller,
    PullerBody,
    PullerClose,
    PullerHeader,
    PullerInput,
    PullerList,
    PullerListItem,
    PullerLoader,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "with-input-option-1", label: "Moscow" },
    { id: "with-input-option-2", label: "Mombasa" },
    { id: "with-input-option-3", label: "Montreal" },
];

export const WithInput = () => {
    const [opened, setOpened] = useState(false);
    const [inputValue, setInputValue] = useState("Mo");

    const handleSelect = (label: string) => {
        setInputValue(label);
        setOpened(false);
    };

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
                <Puller opened={opened} setOpened={setOpened} role="dialog" aria-label="City search">
                    <PullerHeader
                        controlButtons={
                            <>
                                {/* В реальном сценарии лоадер показывается на время запроса подсказок. */}
                                <PullerLoader />
                                <PullerClose aria-label="Close" onClick={() => setOpened(false)} />
                            </>
                        }
                    >
                        <PullerInput
                            value={inputValue}
                            placeholder="Enter a city"
                            aria-label="City"
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                    </PullerHeader>
                    <PullerBody>
                        <PullerList aria-label="Suggestions">
                            {OPTIONS.map((option) => (
                                <PullerListItem
                                    key={option.id}
                                    id={option.id}
                                    onSelect={() => handleSelect(option.label)}
                                >
                                    {option.label}
                                </PullerListItem>
                            ))}
                        </PullerList>
                    </PullerBody>
                </Puller>
            </Portal>
        </div>
    );
};
