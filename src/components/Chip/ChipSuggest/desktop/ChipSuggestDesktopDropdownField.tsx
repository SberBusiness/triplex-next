import React, { useState, useRef, useCallback } from "react";
import { useSuggestContext } from "../../../Suggest/SuggestContext";
import { FormField, FormFieldLabel, FormFieldInput, FormFieldPostfix, FormFieldClear } from "../../../FormField";
import { EComponentSize } from "../../../../enums";
import { Tooltip, ETooltipSize } from "../../../Tooltip";
import { LoaderSmall, ELoaderSmallTheme } from "../../../Loader";
import styles from "../../styles/ChipSuggest.module.less";

export const ChipSuggestDesktopDropdownField: React.FC<React.PropsWithChildren> = ({ children }) => {
    const {
        inputValue,
        placeholder,
        noOptionsText,
        dropdownListId,
        activeDescendant,
        loading,
        tooltipOpen,
        clearInputOnFocus,
        onFilter,
    } = useSuggestContext();
    const [inputFocused, setInputFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClearClick = useCallback(() => onFilter(""), [onFilter]);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onFilter(event.target.value);
        },
        [onFilter],
    );

    const handleInputFocus = useCallback(() => {
        setInputFocused(true);
        if (inputValue.length !== 0 && clearInputOnFocus === true) {
            onFilter("");
        }
    }, [inputValue.length, clearInputOnFocus, onFilter]);

    const handleInputBlur = useCallback(() => setInputFocused(false), []);

    return (
        <FormField className={styles.chipSuggestInputWrapper} size={EComponentSize.SM}>
            <FormFieldLabel>{children}</FormFieldLabel>
            <Tooltip
                size={ETooltipSize.SM}
                isOpen={!!tooltipOpen && inputFocused}
                toggle={() => {}}
                targetRef={inputRef}
                disableAdaptiveMode
            >
                <Tooltip.Body>{noOptionsText}</Tooltip.Body>
                <Tooltip.Target>
                    <FormFieldInput
                        value={inputValue}
                        placeholder={placeholder}
                        aria-controls={dropdownListId}
                        aria-activedescendant={activeDescendant}
                        autoFocus={true}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                </Tooltip.Target>
            </Tooltip>
            <FormFieldPostfix>
                <FormFieldClear onClick={handleClearClick} />
                {loading && <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={EComponentSize.SM} />}
            </FormFieldPostfix>
        </FormField>
    );
};
