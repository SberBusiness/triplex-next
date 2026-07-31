import React, { useRef, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownList,
    EButtonTheme,
    EComponentSize,
    EDropdownDirection,
    EDropdownWidth,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "selected-option-1", label: "Значение 1" },
    { id: "selected-option-2", label: "Значение 2" },
    { id: "selected-option-3", label: "Значение 3" },
];

export const WithSelectedOption = () => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(true);
    const [selectedId, setSelectedId] = useState("selected-option-2");

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
                direction={EDropdownDirection.BOTTOM}
                width={EDropdownWidth.MIN_TARGET}
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
