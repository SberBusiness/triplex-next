import React, { useState } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ETextSize,
    Puller,
    PullerBody,
    PullerClose,
    PullerHeader,
    PullerList,
    PullerListItem,
    Text,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "with-list-option-1", label: "Value 1" },
    { id: "with-list-option-2", label: "Value 2" },
    { id: "with-list-option-3", label: "Value 3", hasNotifications: true },
];

export const WithList = () => {
    const [opened, setOpened] = useState(false);
    const [selectedId, setSelectedId] = useState("with-list-option-2");

    const handleSelect = (id: string) => {
        setSelectedId(id);
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
            <Puller opened={opened} setOpened={setOpened} role="dialog" aria-labelledby="puller-with-list-title">
                <PullerHeader controlButtons={<PullerClose aria-label="Close" onClick={() => setOpened(false)} />}>
                    <Text id="puller-with-list-title" size={ETextSize.B1}>
                        Select a value
                    </Text>
                </PullerHeader>
                <PullerBody>
                    <PullerList loading aria-labelledby="puller-with-list-title">
                        {OPTIONS.map((option) => (
                            <PullerListItem
                                key={option.id}
                                id={option.id}
                                selected={option.id === selectedId}
                                showNotificationIcon={option.hasNotifications}
                                onSelect={() => handleSelect(option.id)}
                            >
                                {option.label}
                            </PullerListItem>
                        ))}
                    </PullerList>
                </PullerBody>
            </Puller>
        </div>
    );
};
