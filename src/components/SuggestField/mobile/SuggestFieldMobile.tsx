import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { ISuggestFieldMobileProps } from "@sberbusiness/triplex-next/components/SuggestField/mobile/types";
import { ISuggestFieldOption } from "@sberbusiness/triplex-next/components/SuggestField/types";
import { SuggestFieldMobileTarget } from "@sberbusiness/triplex-next/components/SuggestField/mobile/SuggestFieldMobileTarget";
import { SuggestFieldMobileDropdown } from "@sberbusiness/triplex-next/components/SuggestField/mobile/SuggestFieldMobileDropdown";
import styles from "../styles/SuggestFieldMobile.module.less";

/**
 * Мобильный SuggestField.
 * Отображает поле ввода (target). При получении полем ввода фокуса - отображает мобильный Dropdown.
 */
export function SuggestFieldMobile<T extends ISuggestFieldOption = ISuggestFieldOption>({
    className,
    value,
    options,
    size,
    status,
    label,
    placeholder,
    dropdownHint,
    loading,
    dropdownListLoading,
    clearInputOnFocus,
    onFilter,
    onSelect,
    onScrollEnd,
    onTargetInputFocus,
    onTargetInputBlur,
    renderTarget,
    renderTargetInput,
    renderTargetLabel,
    renderTargetPrefix,
    renderTargetPostfix,
    ...restProps
}: ISuggestFieldMobileProps<T>) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    // Предыдущее состояние dropdownOpened.
    const prevDropdownOpen = useRef(false);
    const Target = renderTarget === undefined ? SuggestFieldMobileTarget : renderTarget;

    useEffect(() => {
        // Дропдаун закрылся.
        if (prevDropdownOpen.current && !dropdownOpen && ref.current) {
            // Обратный скролл к инпуту т.к. при открытии Dropdown в iOS страница скроллится вверх.
            ref.current.scrollIntoView({ block: "center" });
        }
        prevDropdownOpen.current = dropdownOpen;
    }, [dropdownOpen]);

    const handleClear = () => onSelect(undefined);

    const handleTargetInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setDropdownOpen(true);
        onTargetInputFocus?.(event);
    };

    return (
        <div className={clsx(styles.suggestFieldMobile, className)} {...restProps} ref={ref}>
            <Target
                size={size}
                status={status}
                inputValue={value ? value.label : ""}
                label={label}
                placeholder={placeholder}
                loading={loading}
                onClear={handleClear}
                onInputFocus={handleTargetInputFocus}
                onInputBlur={onTargetInputBlur}
                renderInput={renderTargetInput}
                renderLabel={renderTargetLabel}
                renderPrefix={renderTargetPrefix}
                renderPostfix={renderTargetPostfix}
            />
            <SuggestFieldMobileDropdown
                value={value}
                options={options}
                placeholder={placeholder}
                dropdownHint={dropdownHint}
                opened={dropdownOpen}
                loading={loading}
                dropdownListLoading={dropdownListLoading}
                clearInputOnFocus={clearInputOnFocus}
                setOpened={setDropdownOpen}
                onFilter={onFilter}
                onSelect={onSelect}
                onScrollEnd={onScrollEnd}
            />
        </div>
    );
}
