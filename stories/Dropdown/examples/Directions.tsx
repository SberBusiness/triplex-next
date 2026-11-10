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
    { id: "option-1", label: "Значение 1" },
    { id: "option-2", label: "Значение 2" },
    { id: "option-3", label: "Значение 3" },
];

const DIRECTIONS = [EDropdownDirection.BOTTOM, EDropdownDirection.TOP];

interface IDirectionItemProps {
    direction: EDropdownDirection;
}

const DirectionItem = ({ direction }: IDirectionItemProps) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(false);
    const { context, activeDescendant, handleKeyDown } = useDropdownListKeyboard();

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{direction.toUpperCase()}</div>
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
                direction={direction}
                width={EDropdownWidth.MIN_TARGET}
            >
                <DropdownListContext.Provider value={context}>
                    <DropdownList dropdownOpened={opened} size={EComponentSize.MD}>
                        {OPTIONS.map((option) => (
                            <DropdownList.Item
                                key={option.id}
                                id={`${direction}-${option.id}`}
                                onSelect={() => setOpened(false)}
                            >
                                {option.label}
                            </DropdownList.Item>
                        ))}
                    </DropdownList>
                </DropdownListContext.Provider>
            </Dropdown>
        </div>
    );
};

export const Directions = () => (
    // Отступы резервируют место для выпадающего меню сверху и снизу от управляющего элемента.
    <div style={{ display: "flex", gap: "40px", padding: "200px 0" }}>
        {DIRECTIONS.map((direction) => (
            <DirectionItem key={direction} direction={direction} />
        ))}
    </div>
);
