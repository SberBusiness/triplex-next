import React, { useRef, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownList,
    EButtonTheme,
    EComponentSize,
    EDropdownWidth,
    ETextSize,
    PullerBody,
    PullerClose,
    PullerFooter,
    PullerHeader,
    PullerList,
    PullerListItem,
    Text,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "mobile-option-1", label: "Значение 1" },
    { id: "mobile-option-2", label: "Значение 2" },
    { id: "mobile-option-3", label: "Значение 3" },
];

export const MobileView = () => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();

    const handleSelect = (id: string) => {
        setSelectedId(id);
        setOpened(false);
    };

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-haspopup="listbox"
                aria-expanded={opened}
                onClick={() => setOpened(!opened)}
                ref={targetRef}
            >
                Button text
            </Button>
            <Dropdown
                opened={opened}
                setOpened={setOpened}
                targetRef={targetRef}
                size={EComponentSize.MD}
                width={EDropdownWidth.MIN_TARGET}
                pullerProps={{
                    children: (
                        <>
                            <PullerHeader
                                controlButtons={<PullerClose aria-label="Закрыть" onClick={() => setOpened(false)} />}
                            >
                                <Text size={ETextSize.B1}>Заголовок</Text>
                            </PullerHeader>
                            <PullerBody>
                                <PullerList>
                                    {OPTIONS.map((option) => (
                                        <PullerListItem
                                            key={option.id}
                                            id={`mobile-${option.id}`}
                                            selected={option.id === selectedId}
                                            onSelect={() => handleSelect(option.id)}
                                        >
                                            {option.label}
                                        </PullerListItem>
                                    ))}
                                </PullerList>
                            </PullerBody>
                            <PullerFooter>
                                <Button
                                    theme={EButtonTheme.SECONDARY}
                                    size={EComponentSize.MD}
                                    onClick={() => setOpened(false)}
                                >
                                    Button text
                                </Button>
                            </PullerFooter>
                        </>
                    ),
                }}
            >
                <DropdownList dropdownOpened={opened} size={EComponentSize.MD}>
                    {OPTIONS.map((option) => (
                        <DropdownList.Item
                            key={option.id}
                            id={option.id}
                            selected={option.id === selectedId}
                            onSelect={() => handleSelect(option.id)}
                        >
                            {option.label}
                        </DropdownList.Item>
                    ))}
                </DropdownList>
            </Dropdown>
        </div>
    );
};
