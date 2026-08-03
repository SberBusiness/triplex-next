import React, { useRef, useState } from "react";
import { action } from "storybook/actions";
import {
    Button,
    Dropdown,
    DropdownList,
    EButtonTheme,
    EComponentSize,
    EDropdownAlignment,
    EDropdownDirection,
    EDropdownWidth,
    ETextSize,
    Text,
} from "@sberbusiness/triplex-next";

const LONG_OPTIONS = Array.from({ length: 10 }, (_, index) => ({
    id: `visual-long-option-${index + 1}`,
    label: `Значение ${index + 1}`,
}));

const noop = () => {};

/** Длинный список: проверяет max-height, скролл и подсветку выбранного элемента. Раскрывается play-функцией. */
const TogglableLongList = () => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(false);

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
                Открыть список
            </Button>
            <Dropdown
                opened={opened}
                setOpened={setOpened}
                targetRef={targetRef}
                size={EComponentSize.MD}
                direction={EDropdownDirection.BOTTOM}
                alignment={EDropdownAlignment.LEFT}
                width={EDropdownWidth.MIN_TARGET}
            >
                <DropdownList dropdownOpened={opened} size={EComponentSize.MD}>
                    {LONG_OPTIONS.map((option, index) => (
                        <DropdownList.Item
                            key={option.id}
                            id={option.id}
                            selected={index === 1}
                            showNotificationIcon={index === 2}
                            onSelect={() => action("onSelect")(option.id)}
                        >
                            {option.label}
                        </DropdownList.Item>
                    ))}
                </DropdownList>
            </Dropdown>
        </div>
    );
};

/** Произвольный контент вместо списка: ширина по контенту, выравнивание по правому краю. */
const AlwaysOpenedCustomContent = () => {
    const targetRef = useRef<HTMLButtonElement>(null);

    return (
        <div>
            <Button
                theme={EButtonTheme.SECONDARY}
                size={EComponentSize.SM}
                aria-haspopup="dialog"
                aria-expanded
                ref={targetRef}
            >
                Фильтр
            </Button>
            <Dropdown
                opened
                setOpened={noop}
                targetRef={targetRef}
                size={EComponentSize.SM}
                direction={EDropdownDirection.BOTTOM}
                alignment={EDropdownAlignment.RIGHT}
                width={EDropdownWidth.CONTENT}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "12px", width: "160px" }}>
                    <Text tag="div" size={ETextSize.B3}>
                        Произвольный контент
                    </Text>
                    <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                        Применить
                    </Button>
                </div>
            </Dropdown>
        </div>
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", height: "320px" }}>
        <TogglableLongList />
        <AlwaysOpenedCustomContent />
    </div>
);
