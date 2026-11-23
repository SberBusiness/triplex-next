import React, { useRef, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownList,
    DropdownListContext,
    EButtonTheme,
    EComponentSize,
    EDropdownDirection,
    EDropdownWidth,
    useDropdownListKeyboard,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "loading-option-1", label: "Значение 1" },
    { id: "loading-option-2", label: "Значение 2" },
];

export const Loading = () => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(false);
    const { context, activeDescendant, handleKeyDown } = useDropdownListKeyboard();

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.MD}
                aria-haspopup="listbox"
                aria-expanded={opened}
                onClick={() => setOpened(!opened)}
                onKeyDown={handleKeyDown}
                aria-activedescendant={activeDescendant}
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
                <DropdownListContext.Provider value={context}>
                    <DropdownList loading dropdownOpened={opened} size={EComponentSize.MD}>
                        {OPTIONS.map((option) => (
                            <DropdownList.Item key={option.id} id={option.id} onSelect={() => setOpened(false)}>
                                {option.label}
                            </DropdownList.Item>
                        ))}
                    </DropdownList>
                </DropdownListContext.Provider>
            </Dropdown>
        </div>
    );
};
