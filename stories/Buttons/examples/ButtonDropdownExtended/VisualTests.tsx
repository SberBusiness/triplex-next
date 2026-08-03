import React, { useRef } from "react";
import { action } from "storybook/actions";
import {
    Button,
    ButtonDropdownExtended,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
    EDropdownWidth,
    ETextSize,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
    Text,
} from "@sberbusiness/triplex-next";

const OPTIONS = [
    { id: "opt-1", label: "Действие 1" },
    { id: "opt-2", label: "Действие 2" },
    { id: "opt-3", label: "Действие 3" },
    { id: "opt-4", label: "Действие 4" },
    { id: "opt-5", label: "Действие 5" },
];

const noop = () => {};

/**
 * Произвольный контент в выпадающем блоке: ширина CONTENT, выравнивание LEFT.
 * Контролируемый режим с no-op setOpened — блок остаётся раскрытым для скриншота
 * даже после клика по соседнему триггеру.
 */
const AlwaysOpenedCustomContent = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const renderButton = () => (
        <Button
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            aria-haspopup="dialog"
            aria-expanded
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
            opened
            setOpened={noop}
            targetRef={buttonRef}
            ref={dropdownRef}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 8, width: 180 }}>
                <Text tag="div" size={ETextSize.B3}>
                    Произвольный контент
                </Text>
                <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                    Применить
                </Button>
            </div>
        </ButtonDropdownExtended.Dropdown>
    );

    return (
        <ButtonDropdownExtended
            opened
            setOpened={noop}
            renderButton={renderButton}
            renderDropdown={renderDropdown}
            dropdownRef={dropdownRef}
        />
    );
};

/** Список действий: ширина MIN_TARGET, выравнивание RIGHT. Раскрывается play-функцией. */
const TogglableList = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => (
        <Button
            theme={EButtonTheme.GENERAL}
            size={EComponentSize.LG}
            aria-haspopup="menu"
            aria-expanded={opened}
            onClick={() => setOpened(!opened)}
            ref={buttonRef}
        >
            Открыть список
        </Button>
    );

    const renderDropdown = ({ opened, setOpened, className }: IButtonDropdownExtendedDropdownProvideProps) => (
        <ButtonDropdownExtended.Dropdown
            className={className}
            size={EComponentSize.LG}
            width={EDropdownWidth.MIN_TARGET}
            alignment={EDropdownAlignment.RIGHT}
            opened={opened}
            setOpened={setOpened}
            targetRef={buttonRef}
            ref={dropdownRef}
        >
            <ButtonDropdownExtended.DropdownList dropdownOpened={opened} size={EComponentSize.LG}>
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
            closeOnTab
            renderButton={renderButton}
            renderDropdown={renderDropdown}
            dropdownRef={dropdownRef}
        />
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", justifyContent: "space-between", width: 480, height: 360 }}>
        <AlwaysOpenedCustomContent />
        <TogglableList />
    </div>
);
