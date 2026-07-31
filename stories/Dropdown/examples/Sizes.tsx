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
    { id: "option-1", label: "Значение 1" },
    { id: "option-2", label: "Значение 2" },
    { id: "option-3", label: "Значение 3" },
];

const SIZES = Object.values(EComponentSize);

interface ISizeItemProps {
    size: EComponentSize;
}

const SizeItem = ({ size }: ISizeItemProps) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(true);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={size}
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
                size={size}
                direction={EDropdownDirection.BOTTOM}
                width={EDropdownWidth.MIN_TARGET}
            >
                <DropdownList dropdownOpened={opened} size={size}>
                    {OPTIONS.map((option) => (
                        <DropdownList.Item
                            key={option.id}
                            id={`${size}-${option.id}`}
                            onSelect={() => setOpened(false)}
                        >
                            {option.label}
                        </DropdownList.Item>
                    ))}
                </DropdownList>
            </Dropdown>
        </div>
    );
};

export const Sizes = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "180px" }}>
        {SIZES.map((size) => (
            <SizeItem key={size} size={size} />
        ))}
    </div>
);
