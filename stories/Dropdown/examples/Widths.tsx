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

const WIDTHS = Object.values(EDropdownWidth);

interface IWidthItemProps {
    width: EDropdownWidth;
}

const WidthItem = ({ width }: IWidthItemProps) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(true);

    return (
        <div style={{ width: "280px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{width.toUpperCase()}</div>
            <Button
                block
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
                width={width}
                direction={EDropdownDirection.BOTTOM}
            >
                <DropdownList dropdownOpened={opened} size={EComponentSize.MD}>
                    {OPTIONS.map((option) => (
                        <DropdownList.Item
                            key={option.id}
                            id={`${width}-${option.id}`}
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

export const Widths = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "180px" }}>
        {WIDTHS.map((width) => (
            <WidthItem key={width} width={width} />
        ))}
    </div>
);
