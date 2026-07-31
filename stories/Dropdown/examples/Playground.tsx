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
} from "@sberbusiness/triplex-next";

/** Свойства Playground-примера Dropdown. */
export interface IPlaygroundProps {
    /** Размер дропдауна. */
    size?: EComponentSize;
    /** Направление выпадающего меню. */
    direction?: EDropdownDirection;
    /** Выравнивание списка относительно управляющего элемента. */
    alignment?: EDropdownAlignment;
    /** Вариант расчёта ширины выпадающего списка. */
    width?: EDropdownWidth;
    /** Состояние загрузки списка. */
    loading?: boolean;
}

const OPTIONS = [
    { id: "playground-option-1", label: "Значение 1" },
    { id: "playground-option-2", label: "Значение 2" },
    { id: "playground-option-3", label: "Значение 3" },
];

export const Playground = ({ size = EComponentSize.MD, direction, alignment, width, loading }: IPlaygroundProps) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(true);

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "200px 0" }}>
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
                direction={direction}
                alignment={alignment}
                width={width}
                onOpen={action("onOpen")}
                onClose={action("onClose")}
            >
                <DropdownList loading={loading} dropdownOpened={opened} size={size}>
                    {OPTIONS.map((option) => (
                        <DropdownList.Item
                            key={option.id}
                            id={option.id}
                            onSelect={() => {
                                action("onSelect")(option.id);
                                setOpened(false);
                            }}
                        >
                            {option.label}
                        </DropdownList.Item>
                    ))}
                </DropdownList>
            </Dropdown>
        </div>
    );
};
