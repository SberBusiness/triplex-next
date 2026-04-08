import React, { useState } from "react";
import {
    SuggestField,
    useMatchMedia,
    ISuggestFieldOption,
    EScreenWidth,
    EComponentSize,
    EFormFieldStatus,
} from "@sberbusiness/triplex-next";

interface IStatusItemProps {
    status: EFormFieldStatus;
}

const FOOD_NAMES = [
    "Mushroom",
    "Tomato",
    "Eggplant",
    "Grapes",
    "Melon",
    "Watermelon",
    "Tangerine",
    "Lemon",
    "Banana",
    "Pineapple",
    "Red Apple",
    "Green Apple",
    "Pear",
    "Peach",
    "Cherries",
    "Strawberry",
] as const;

const FOOD_OPTIONS: ISuggestFieldOption[] = FOOD_NAMES.map((item, index) => ({
    id: `suggest-field-option-${index}`,
    label: item,
}));

const useAdaptive = () =>
    useMatchMedia(`(max-width: ${EScreenWidth.SM_MAX})`, window.innerWidth <= parseInt(EScreenWidth.SM_MAX));

const getFilteredOptions = (query: string): ISuggestFieldOption[] =>
    FOOD_OPTIONS.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()));

const StatusItem = ({ status }: IStatusItemProps) => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(undefined);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [inputPristine, setInputPristine] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

    const adaptive = useAdaptive();

    const reset = (newOptions: typeof options) => {
        setOptions(newOptions);
        setInputPristine(true);
        setTooltipOpen(false);
    };

    const handleFilter = (inputValue: string) => {
        setInputPristine(false);

        if (inputValue.length === 0) {
            setOptions(FOOD_OPTIONS);
            setTooltipOpen(false);
        } else {
            const filteredOptions = getFilteredOptions(inputValue);

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0);
        }
    };

    const handleSelect = (nextValue: typeof value) => {
        setValue(nextValue);
        reset([]);
    };

    const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
        if (!adaptive) {
            reset([]);
        }
    };

    const handleInputMouseDown: React.MouseEventHandler<HTMLInputElement> = (event) => {
        if (options.length === 0) {
            const query = event.currentTarget.value;
            const filteredOptions = getFilteredOptions(inputPristine ? "" : query);

            setOptions(filteredOptions);
            setTooltipOpen(filteredOptions.length === 0 && query.length !== 0);
        } else if (adaptive) {
            reset(FOOD_OPTIONS);
        }
    };

    return (
        <SuggestField
            value={value}
            options={options}
            size={EComponentSize.LG}
            status={status}
            label={"Label"}
            placeholder={"Type to proceed"}
            tooltipHint={"No matches found."}
            tooltipOpen={tooltipOpen}
            onFilter={handleFilter}
            onSelect={handleSelect}
            inputProps={{
                onBlur: handleInputBlur,
                onMouseDown: handleInputMouseDown,
            }}
        />
    );
};

const STATUSES = Object.values(EFormFieldStatus);

export const StatusesExample = () => (
    <div style={{ maxWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {STATUSES.map((status) => (
            <StatusItem key={status} status={status} />
        ))}
    </div>
);
