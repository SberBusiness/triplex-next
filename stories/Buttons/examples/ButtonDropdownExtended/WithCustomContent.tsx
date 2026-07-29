import React, { useRef, useState } from "react";
import {
    Button,
    ButtonDropdownExtended,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
    ETextSize,
    EDropdownWidth,
    IButtonDropdownExtendedDropdownProvideProps,
    Text,
} from "@sberbusiness/triplex-next";

export const WithCustomContent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);

    const renderButton = () => (
        <Button
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            aria-haspopup="dialog"
            aria-expanded={opened}
            onClick={() => setOpened(!opened)}
            ref={buttonRef}
        >
            Фильтр
        </Button>
    );

    const renderDropdown = ({ className }: IButtonDropdownExtendedDropdownProvideProps) => (
        <ButtonDropdownExtended.Dropdown
            className={className}
            size={EComponentSize.MD}
            width={EDropdownWidth.CONTENT}
            alignment={EDropdownAlignment.LEFT}
            opened={opened}
            setOpened={setOpened}
            targetRef={buttonRef}
            ref={dropdownRef}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8, width: 220 }}>
                <Text tag="div" size={ETextSize.B3}>
                    Здесь может быть любой контент: форма, фильтр или подсказка.
                </Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM} onClick={() => setOpened(false)}>
                    Применить
                </Button>
            </div>
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
