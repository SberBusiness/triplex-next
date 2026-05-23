import React, { useState, useRef, useCallback } from "react";
import clsx from "clsx";
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
import {
    DefaulticonStrokePrdIcon16,
    DefaulticonStrokePrdIcon20,
    DefaulticonStrokePrdIcon24,
} from "@sberbusiness/icons-next";

export interface PlaygroundArgs extends Pick<
    React.ComponentProps<typeof SuggestField>,
    | "size"
    | "status"
    | "inputProps"
    | "placeholder"
    | "label"
    | "tooltipHint"
    | "active"
    | "loading"
    | "dropdownListLoading"
    | "clearInputOnFocus"
> {
    withPrefix: boolean;
    withPostfix: boolean;
    withDescription: boolean;
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

const SIZE_TO_ICON_COMPONENT_MAP = {
    [EComponentSize.SM]: DefaulticonStrokePrdIcon16,
    [EComponentSize.MD]: DefaulticonStrokePrdIcon20,
    [EComponentSize.LG]: DefaulticonStrokePrdIcon24,
};

const STATUS_TO_DESCRIPTION_FONT_TYPE_MAP: Record<EFormFieldStatus, EFontType> = {
    [EFormFieldStatus.DEFAULT]: EFontType.SECONDARY,
    [EFormFieldStatus.DISABLED]: EFontType.SECONDARY,
    [EFormFieldStatus.ERROR]: EFontType.ERROR,
    [EFormFieldStatus.WARNING]: EFontType.WARNING,
};

const useAdaptive = () =>
    useMatchMedia(`(max-width: ${EScreenWidth.SM_MAX})`, window.innerWidth <= parseInt(EScreenWidth.SM_MAX));

const getFilteredOptions = (query: string): ISuggestFieldOption[] =>
    FOOD_OPTIONS.filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()));

export const PlaygroundExample = ({
    size = EComponentSize.LG,
    status = EFormFieldStatus.DEFAULT,
    inputProps,
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

    const PrefixIcon = SIZE_TO_ICON_COMPONENT_MAP[size];

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
        inputRef.current?.focus();
    }, []);

    const handleLinkClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>((event) => {
        event.preventDefault();
    }, []);

    return (
        <div style={{ maxWidth: 300 }}>
            <SuggestField
                {...restArgs}
                value={value}
                options={options}
                status={status}
                size={size}
                tooltipOpen={tooltipOpen}
                onFilter={handleFilter}
                onSelect={handleSelect}
                onClear={withPostfix ? handleClear : undefined}
                inputProps={{
                    ...inputProps,
                    onBlur: handleInputBlur,
                    onMouseDown: handleInputMouseDown,
                    ref: inputRef,
                }}
                prefix={
                    withPrefix && (
                        <div className={clsx("hoverable", { disabled: status === EFormFieldStatus.DISABLED })}>
                            <PrefixIcon style={{ display: "block" }} paletteIndex={5} />
                        </div>
                    )
                }
                postfix={withPostfix && <HelpBox tooltipSize={ETooltipSize.SM}>Helpful details appear here</HelpBox>}
                description={
                    withDescription && (
                        <Text tag="div" size={ETextSize.B4} type={STATUS_TO_DESCRIPTION_FONT_TYPE_MAP[status]}>
                            (21) Description{" "}
                            <Link href="#" onClick={handleLinkClick}>
                                Link text
                            </Link>
                        </Text>
                    )
                }
            />
        </div>
    );
};
