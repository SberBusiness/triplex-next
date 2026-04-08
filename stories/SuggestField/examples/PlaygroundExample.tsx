import React, { useState, useRef, useCallback } from "react";
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
import { PlaygroundArgs } from "../SuggestField.stories";

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

export const PlaygroundExample = ({
    withClearButton,
    withPrefix,
    withPostfix,
    withDescription,
    ...restArgs
}: PlaygroundArgs) => {
    const [value, setValue] = useState<ISuggestFieldOption | undefined>(undefined);
    const [options, setOptions] = useState<ISuggestFieldOption[]>([]);
    const [inputPristine, setInputPristine] = useState(true);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const adaptive = useAdaptive();

    const reset = useCallback((newOptions: typeof options) => {
        setOptions(newOptions);
        setInputPristine(true);
        setTooltipOpen(false);
    }, []);

    const handleFilter = useCallback((inputValue: string) => {
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
    }, []);

    const handleSelect = useCallback(
        (nextValue: typeof value) => {
            setValue(nextValue);
            reset([]);
        },
        [reset],
    );

    const handleInputBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(() => {
        if (!adaptive) {
            reset([]);
        }
    }, [adaptive, reset]);

    const handleInputMouseDown = useCallback<React.MouseEventHandler<HTMLInputElement>>(
        (event) => {
            if (options.length === 0) {
                const query = event.currentTarget.value;
                const filteredOptions = getFilteredOptions(inputPristine ? "" : query);

                setOptions(filteredOptions);
                setTooltipOpen(filteredOptions.length === 0 && query.length !== 0);
            } else if (adaptive) {
                reset(FOOD_OPTIONS);
            }
        },
        [options.length, inputPristine, adaptive, reset],
    );

    const handleClear = useCallback(() => {
        handleFilter("");
        inputRef.current?.focus();
    }, [handleFilter]);

    const renderPrefixInner = useCallback(() => {
        if (withPrefix) {
            return <DefaulticonStrokePrdIcon24 paletteIndex={5} />;
        }
    }, [withPrefix]);

    const renderPostfixInner = useCallback(() => {
        if (withPostfix) {
            return (
                <React.Fragment>
                    <DefaulticonStrokePrdIcon24 paletteIndex={5} />
                    <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>
                </React.Fragment>
            );
        }
    }, [withPostfix]);

    const renderDescriptionInner = useCallback(() => {
        if (withDescription) {
            return (
                <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                    (21) Description{" "}
                    <Link href="#" onClick={(event) => event.preventDefault()}>
                        Link text
                    </Link>
                </Text>
            );
        }
    }, [withDescription]);

    return (
        <div style={{ maxWidth: 300 }}>
            <SuggestField
                {...restArgs}
                value={value}
                options={options}
                tooltipOpen={tooltipOpen}
                onFilter={handleFilter}
                onSelect={handleSelect}
                onClear={withClearButton ? handleClear : undefined}
                inputProps={{
                    onBlur: handleInputBlur,
                    onMouseDown: handleInputMouseDown,
                    ref: inputRef,
                }}
                prefix={renderPrefixInner()}
                postfix={renderPostfixInner()}
                description={renderDescriptionInner()}
            />
        </div>
    );
};
