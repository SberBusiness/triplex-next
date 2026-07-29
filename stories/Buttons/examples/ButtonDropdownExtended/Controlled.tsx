import React, { useRef, useState } from "react";
import {
    Button,
    ButtonDropdownExtended,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
    EDropdownWidth,
    IButtonDropdownExtendedDropdownProvideProps,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "opt-1", label: "Действие 1" },
    { id: "opt-2", label: "Действие 2" },
    { id: "opt-3", label: "Действие 3" },
];

export const Controlled = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // opened должен быть определён уже на первом рендере — режим управления фиксируется на монтировании.
    const [opened, setOpened] = useState(false);

    const renderButton = () => (
        <Button
            theme={EButtonTheme.GENERAL}
            size={EComponentSize.MD}
            aria-haspopup="menu"
            aria-expanded={opened}
            onClick={() => setOpened(!opened)}
            ref={buttonRef}
        >
            Действия
        </Button>
    );

    const renderDropdown = ({ className }: IButtonDropdownExtendedDropdownProvideProps) => (
        <ButtonDropdownExtended.Dropdown
            className={className}
            size={EComponentSize.MD}
            width={EDropdownWidth.MIN_TARGET}
            alignment={EDropdownAlignment.LEFT}
            opened={opened}
            setOpened={setOpened}
            targetRef={buttonRef}
            ref={dropdownRef}
        >
            <ButtonDropdownExtended.DropdownList dropdownOpened={opened} size={EComponentSize.MD}>
                {OPTIONS.map((option) => (
                    <ButtonDropdownExtended.DropdownList.Item
                        key={option.id}
                        id={option.id}
                        onSelect={() => setOpened(false)}
                    >
                        {option.label}
                    </ButtonDropdownExtended.DropdownList.Item>
                ))}
            </ButtonDropdownExtended.DropdownList>
        </ButtonDropdownExtended.Dropdown>
    );

    return (
        <ButtonDropdownExtended
            opened={opened}
            setOpened={setOpened}
            renderButton={renderButton}
            renderDropdown={renderDropdown}
            dropdownRef={dropdownRef}
        />
    );
};
