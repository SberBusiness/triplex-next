import React, { useRef } from "react";
import { action } from "storybook/actions";
import {
    Button,
    ButtonDropdownExtended,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
    EDropdownWidth,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
    IButtonDropdownExtendedProps,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "opt-1", label: "Действие 1" },
    { id: "opt-2", label: "Действие 2" },
    { id: "opt-3", label: "Действие 3" },
];

type TPlaygroundProps = Pick<IButtonDropdownExtendedProps, "closeOnTab">;

export const Playground = ({ closeOnTab }: TPlaygroundProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => (
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

    const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => (
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
                        onSelect={() => {
                            action("onSelect")(option.id);
                            setOpened(false);
                        }}
                    >
                        {option.label}
                    </ButtonDropdownExtended.DropdownList.Item>
                ))}
            </ButtonDropdownExtended.DropdownList>
        </ButtonDropdownExtended.Dropdown>
    );

    return (
        <ButtonDropdownExtended
            renderButton={renderButton}
            renderDropdown={renderDropdown}
            dropdownRef={dropdownRef}
            closeOnTab={closeOnTab}
        />
    );
};
