import React, { useState, useRef } from "react";
import {
    SuggestField,
    HelpBox,
    Text,
    Link,
    useMatchMedia,
    ISuggestFieldOption,
    EScreenWidth,
    EComponentSize,
    EFormFieldStatus,
    ETooltipSize,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

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

export const ProductionExample = () => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(undefined);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [inputPristine, setInputPristine] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const adaptive = useAdaptive();

    const reset = (newOptions: typeof options) => {
        setOptions(newOptions);
        setInputPristine(true);
        setTooltipOpen(false);
    };

    const handleFilter = (inputValue: string) => {
        setInputPristine(false);

        if (inputValue.length === 0) {
            setValue(undefined);
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

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
        inputRef.current?.focus();
    };

    const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
    };

    return (
        <div style={{ maxWidth: 300 }}>
            <SuggestField
                value={value}
                options={options}
                size={EComponentSize.LG}
                status={EFormFieldStatus.DEFAULT}
                label="Label"
                placeholder="Type to proceed"
                tooltipHint="No matches found."
                tooltipOpen={tooltipOpen}
                onFilter={handleFilter}
                onSelect={handleSelect}
                onClear={handleClear}
                inputProps={{
                    onBlur: handleInputBlur,
                    onMouseDown: handleInputMouseDown,
                    ref: inputRef,
                }}
                prefix={<DefaulticonStrokePrdIcon24 paletteIndex={5} />}
                postfix={
                    <React.Fragment>
                        <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                        <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                    </React.Fragment>
                }
                description={
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        (21) Description{" "}
                        <Link href="#" onClick={handleLinkClick}>
                            Link text
                        </Link>
                    </Text>
                }
            />
        </div>
    );
};
