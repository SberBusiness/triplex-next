import React, { useState } from "react";
import {
    Dropdown,
    DropdownList,
    DropdownListItem,
    EComponentSize,
    EDropdownWidth,
    Suggest,
    TextField,
    useSuggestContext,
    type ISuggestOption,
} from "@sberbusiness/triplex-next";

const FRUITS: ISuggestOption[] = [
    { id: "1", label: "Apple" },
    { id: "2", label: "Banana" },
    { id: "3", label: "Cherry" },
    { id: "4", label: "Grapes" },
    { id: "5", label: "Melon" },
];

const SIZE = EComponentSize.LG;

/** Управляющий элемент. Значение поля ввода и состояние списка берутся из SuggestContext. */
const SuggestTarget = () => {
    const { inputValue, dropdownOpen, dropdownListId, setDropdownOpen, onFilter } = useSuggestContext();

    return (
        <TextField
            label="Fruit"
            size={SIZE}
            inputProps={{
                value: inputValue,
                placeholder: "Type to proceed",
                role: "combobox",
                "aria-expanded": dropdownOpen,
                "aria-controls": dropdownListId,
                onChange: (event) => {
                    onFilter(event.target.value);
                    setDropdownOpen(true);
                },
                onClick: () => setDropdownOpen(true),
            }}
        />
    );
};

/** Выпадающий список. dropdownRef обязателен: по нему Suggest отличает клик внутри списка от клика вне компонента. */
const SuggestDropdown = () => {
    const {
        value,
        options,
        noOptionsText,
        dropdownOpen,
        dropdownListId,
        suggestRef,
        dropdownRef,
        setDropdownOpen,
        closeDropdown,
        onSelect,
    } = useSuggestContext();

    return (
        <Dropdown
            ref={dropdownRef}
            size={SIZE}
            targetRef={suggestRef}
            width={EDropdownWidth.TARGET}
            opened={dropdownOpen}
            setOpened={(opened) => (opened ? setDropdownOpen(true) : closeDropdown())}
        >
            {options.length === 0 ? (
                // id остаётся на контейнере и в пустом состоянии — иначе aria-controls
                // управляющего элемента ссылается на несуществующий элемент.
                <div id={dropdownListId} style={{ padding: "12px 16px" }}>
                    {noOptionsText}
                </div>
            ) : (
                <DropdownList id={dropdownListId} size={SIZE} dropdownOpened={dropdownOpen}>
                    {options.map((option) => (
                        <DropdownListItem
                            key={option.id}
                            id={option.id}
                            selected={option.id === value?.id}
                            onSelect={() => onSelect(option)}
                        >
                            {option.label}
                        </DropdownListItem>
                    ))}
                </DropdownList>
            )}
        </Dropdown>
    );
};

export const Default = () => {
    const [value, setValue] = useState<ISuggestOption>();
    const [options, setOptions] = useState<ISuggestOption[]>(FRUITS);

    const handleFilter = (inputValue: string) =>
        setOptions(FRUITS.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase())));

    return (
        <div style={{ maxWidth: "300px" }}>
            <Suggest
                value={value}
                options={options}
                size={SIZE}
                noOptionsText="No matches found."
                onSelect={setValue}
                onFilter={handleFilter}
            >
                <SuggestTarget />
                <SuggestDropdown />
            </Suggest>
        </div>
    );
};
