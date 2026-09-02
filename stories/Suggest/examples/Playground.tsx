import React, { useState } from "react";
import { action } from "storybook/actions";
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
    type ISuggestProps,
} from "@sberbusiness/triplex-next";

/** Props, которыми управляет Playground. Остальные задаются композицией примера. */
export type TPlaygroundArgs = Pick<
    ISuggestProps,
    "size" | "placeholder" | "noOptionsText" | "clearInputOnFocus" | "dropdownListLoading"
>;

const FRUITS: ISuggestOption[] = [
    { id: "1", label: "Apple" },
    { id: "2", label: "Banana" },
    { id: "3", label: "Cherry" },
    { id: "4", label: "Grapes" },
    { id: "5", label: "Melon" },
];

interface ISuggestPartProps {
    size: EComponentSize;
}

const SuggestTarget = ({ size }: ISuggestPartProps) => {
    const { inputValue, placeholder, clearInputOnFocus, dropdownOpen, dropdownListId, setDropdownOpen, onFilter } =
        useSuggestContext();

    return (
        <TextField
            label="Fruit"
            size={size}
            inputProps={{
                value: inputValue,
                placeholder,
                role: "combobox",
                "aria-expanded": dropdownOpen,
                "aria-controls": dropdownListId,
                onChange: (event) => {
                    onFilter(event.target.value);
                    setDropdownOpen(true);
                },
                onClick: () => setDropdownOpen(true),
                onFocus: () => {
                    if (clearInputOnFocus && inputValue.length !== 0) {
                        onFilter("");
                    }
                },
            }}
        />
    );
};

const SuggestDropdown = ({ size }: ISuggestPartProps) => {
    const {
        value,
        options,
        noOptionsText,
        dropdownOpen,
        dropdownListId,
        dropdownListLoading,
        suggestRef,
        dropdownRef,
        setDropdownOpen,
        closeDropdown,
        onSelect,
    } = useSuggestContext();

    return (
        <Dropdown
            ref={dropdownRef}
            size={size}
            targetRef={suggestRef}
            width={EDropdownWidth.TARGET}
            opened={dropdownOpen}
            setOpened={(opened) => (opened ? setDropdownOpen(true) : closeDropdown())}
        >
            {options.length === 0 && !dropdownListLoading ? (
                // id остаётся на контейнере и в пустом состоянии — иначе aria-controls
                // управляющего элемента ссылается на несуществующий элемент.
                <div id={dropdownListId} style={{ padding: "12px 16px" }}>
                    {noOptionsText}
                </div>
            ) : (
                <DropdownList
                    id={dropdownListId}
                    size={size}
                    dropdownOpened={dropdownOpen}
                    loading={dropdownListLoading}
                >
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

export const Playground = (args: TPlaygroundArgs) => {
    const [value, setValue] = useState<ISuggestOption>();
    const [options, setOptions] = useState<ISuggestOption[]>(FRUITS);

    const handleSelect = (selectedValue: ISuggestOption | undefined) => {
        setValue(selectedValue);
        action("onSelect")(selectedValue);
    };

    const handleFilter = (inputValue: string) => {
        setOptions(FRUITS.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase())));
        action("onFilter")(inputValue);
    };

    return (
        <div style={{ maxWidth: "300px" }}>
            <Suggest {...args} value={value} options={options} onSelect={handleSelect} onFilter={handleFilter}>
                <SuggestTarget size={args.size} />
                <SuggestDropdown size={args.size} />
            </Suggest>
        </div>
    );
};
