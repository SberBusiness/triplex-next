import React, { useRef, useState } from "react";
import {
    Button,
    Dropdown,
    DropdownList,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
    EDropdownDirection,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "option-1", label: "Значение с длинным названием" },
    { id: "option-2", label: "Значение 2" },
    { id: "option-3", label: "Значение 3" },
];

const ALIGNMENTS = Object.values(EDropdownAlignment);

interface IAlignmentItemProps {
    alignment: EDropdownAlignment;
}

const AlignmentItem = ({ alignment }: IAlignmentItemProps) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(true);

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{alignment.toUpperCase()}</div>
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
                alignment={alignment}
                direction={EDropdownDirection.BOTTOM}
            >
                <DropdownList dropdownOpened={opened} size={EComponentSize.MD}>
                    {OPTIONS.map((option) => (
                        <DropdownList.Item
                            key={option.id}
                            id={`${alignment}-${option.id}`}
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

export const Alignments = () => (
    // Отступ слева даёт место выпадающему меню при выравнивании по правому краю управляющего элемента.
    <div style={{ display: "flex", flexDirection: "column", gap: "180px", paddingLeft: "120px" }}>
        {ALIGNMENTS.map((alignment) => (
            <AlignmentItem key={alignment} alignment={alignment} />
        ))}
    </div>
);
