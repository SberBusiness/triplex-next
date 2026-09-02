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

const SIZES = Object.values(EComponentSize);

interface ISuggestPartProps {
    size: EComponentSize;
}

const SuggestTarget = ({ size }: ISuggestPartProps) => {
    const { inputValue, dropdownOpen, dropdownListId, setDropdownOpen, onFilter } = useSuggestContext();

    return (
        <TextField
            label="Fruit"
            size={size}
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

const SuggestDropdown = ({ size }: ISuggestPartProps) => {
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
            size={size}
            targetRef={suggestRef}
            width={EDropdownWidth.TARGET}
            opened={dropdownOpen}
            setOpened={(opened) => (opened ? setDropdownOpen(true) : closeDropdown())}
        >
            {options.length === 0 ? (
                <div style={{ padding: "12px 16px" }}>{noOptionsText}</div>
            ) : (
                <DropdownList id={dropdownListId} size={size} dropdownOpened={dropdownOpen}>
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

interface ISuggestCaseProps {
    size: EComponentSize;
    initialValue?: ISuggestOption;
    options?: ISuggestOption[];
}

const SuggestCase = ({ size, initialValue, options: initialOptions = FRUITS }: ISuggestCaseProps) => {
    const [value, setValue] = useState<ISuggestOption | undefined>(initialValue);
    const [options, setOptions] = useState<ISuggestOption[]>(initialOptions);

    const handleFilter = (inputValue: string) =>
        setOptions(initialOptions.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase())));

    return (
        <div style={{ width: "260px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{size.toUpperCase()}</div>
            <Suggest
                value={value}
                options={options}
                size={size}
                noOptionsText="No matches found."
                onSelect={setValue}
                onFilter={handleFilter}
            >
                <SuggestTarget size={size} />
                <SuggestDropdown size={size} />
            </Suggest>
        </div>
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "320px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "32px", flexWrap: "wrap" }}>
            {SIZES.map((size) => (
                <SuggestCase key={size} size={size} />
            ))}
            <SuggestCase size={EComponentSize.LG} initialValue={FRUITS[0]} />
            <SuggestCase size={EComponentSize.LG} options={[]} />
        </div>

        {/* Случай с открытым списком идёт последним — play-функция кликает по последнему combobox. */}
        <SuggestCase size={EComponentSize.LG} initialValue={FRUITS[2]} />
    </div>
);
