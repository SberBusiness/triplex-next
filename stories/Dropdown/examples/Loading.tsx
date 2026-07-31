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
    { id: "loading-option-1", label: "Значение 1" },
    { id: "loading-option-2", label: "Значение 2" },
];

export const Loading = () => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(true);

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
                <DropdownList loading dropdownOpened={opened} size={EComponentSize.MD}>
                    {OPTIONS.map((option) => (
                        <DropdownList.Item key={option.id} id={option.id} onSelect={() => setOpened(false)}>
                            {option.label}
                        </DropdownList.Item>
                    ))}
                </DropdownList>
            </Dropdown>
        </div>
    );
};
