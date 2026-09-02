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
];

const SIZE = EComponentSize.LG;

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

const SuggestDropdown = () => {
    const {
        value,
        options,
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
            size={SIZE}
            targetRef={suggestRef}
            width={EDropdownWidth.TARGET}
            opened={dropdownOpen}
            setOpened={(opened) => (opened ? setDropdownOpen(true) : closeDropdown())}
        >
            <DropdownList id={dropdownListId} size={SIZE} dropdownOpened={dropdownOpen} loading={dropdownListLoading}>
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
        </Dropdown>
    );
};

/**
 * Состояние dropdownListLoading отдельной visual-стори: два Suggest'а не могут быть
 * открыты одновременно — mousedown по второму компоненту закрывает список первого.
 */
export const VisualTestsDropdownListLoading = () => {
    const [value, setValue] = useState<ISuggestOption | undefined>(FRUITS[0]);

    return (
        <div style={{ width: "260px", paddingBottom: "320px" }}>
            <Suggest
                value={value}
                options={FRUITS}
                size={SIZE}
                noOptionsText="No matches found."
                dropdownListLoading
                onSelect={setValue}
                onFilter={() => undefined}
            >
                <SuggestTarget />
                <SuggestDropdown />
            </Suggest>
        </div>
    );
};
