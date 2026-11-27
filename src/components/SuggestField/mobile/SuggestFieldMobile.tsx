import React, { useState, useRef, useCallback } from "react";
import { ISuggestFieldMobileProps } from "./types";
import { ISuggestFieldOption } from "../types";
import { EComponentSize } from "../../../enums";
import { SuggestFieldMobileDropdown } from "./SuggestFieldMobileDropdown";
import { TextFieldBase } from "../../TextField/TextFieldBase";
import { DataTestId } from "../../../consts/DataTestId";
import { FormFieldInput, FormFieldClear } from "../../FormField";
import { LoaderSmall, ELoaderSmallTheme } from "../../Loader";
import { useDropdownOpenCallbacks } from "../../Dropdown/useDropdownOpenCallbacks";
import { isKey } from "../../../utils/keyboard";

/**
 * Мобильный SuggestField.
 * Отображает поле ввода (target). При фокусе, тапе или ArrowDown / ArrowUp на поле ввода
 * отображает мобильный Dropdown.
 */
export const SuggestFieldMobile = <T extends ISuggestFieldOption = ISuggestFieldOption>({
    value,
    options,
    size = EComponentSize.LG,
    placeholder,
    "data-test-id": dataTestId,
    postfix,
    tooltipHint,
    loading,
    tooltipOpen,
    dropdownListLoading,
    clearInputOnFocus,
    onFilter,
    onSelect,
    onClear,
    onScrollEnd,
    renderInput,
    inputProps,
    // Из настроек выпадающего списка мобильному варианту нужны только pullerProps и колбэки открытия,
    // остальное в restProps ушло бы в DOM.
    dropdownProps: { pullerProps, onOpen: onDropdownOpen, onClose: onDropdownClose } = {},
    ...restProps
}: ISuggestFieldMobileProps<T>) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const Input = renderInput ?? FormFieldInput;

    // Стабильность не нужна: useDropdownOpenCallbacks вызывает колбэки только на смену opened.
    const handleDropdownClose = () => {
        // Обратный скролл к инпуту т.к. при открытии дропдауна в iOS страница скроллится вверх.
        ref.current?.scrollIntoView({ block: "center" });
        onDropdownClose?.();
    };

    useDropdownOpenCallbacks(dropdownOpen, onDropdownOpen, handleDropdownClose);

    // Ловушка шторки при закрытии возвращает фокус в поле: этот фокус шторку снова не открывает.
    // Флаг поднят между onDeactivate и onPostDeactivate: focus-trap-react возвращает фокус между ними,
    // на следующем тике после закрытия.
    const returningFocusRef = useRef(false);
    const pullerFocusTrapOptions = pullerProps?.focusTrapProps?.focusTrapOptions;

    const handleInputFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
        (event) => {
            if (!returningFocusRef.current) {
                setDropdownOpen(true);
            }

            inputProps.onFocus?.(event);
        },
        [inputProps],
    );

    // После закрытия фокус остаётся в поле, и повторный тап не вызывает focus — шторку открывает click.
    const handleInputClick = useCallback<React.MouseEventHandler<HTMLInputElement>>(
        (event) => {
            setDropdownOpen(true);
            inputProps.onClick?.(event);
        },
        [inputProps],
    );

    // Клавиатурный аналог handleInputClick. preventDefault — чтобы стрелки не прокручивали страницу.
    const handleInputKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
        (event) => {
            if (isKey(event.key, "ARROW_DOWN") || isKey(event.key, "ARROW_UP")) {
                event.preventDefault();
                setDropdownOpen(true);
            }

            inputProps.onKeyDown?.(event);
        },
        [inputProps],
    );

    const handleClear = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            if (value !== undefined) {
                onSelect(undefined);

                // Поле-триггер показывает label значения, поэтому «поле не пустое» здесь равно «label не пустой».
                if (value.label.length !== 0) {
                    onFilter("");
                }
            }

            onClear?.(event);
        },
        [value, onSelect, onFilter, onClear],
    );

    return (
        <TextFieldBase
            data-test-id={dataTestId}
            size={size}
            postfix={
                <React.Fragment>
                    {onClear !== undefined && <FormFieldClear onClick={handleClear} />}
                    {loading && <LoaderSmall theme={ELoaderSmallTheme.BRAND} size={size} />}
                    {postfix}
                </React.Fragment>
            }
            {...restProps}
            ref={ref}
        >
            <Input
                value={value?.label ?? ""}
                placeholder={placeholder}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={dropdownOpen}
                data-test-id={dataTestId && `${dataTestId}${DataTestId.Suggest.input}`}
                {...inputProps}
                readOnly={true}
                onFocus={handleInputFocus}
                onClick={handleInputClick}
                onKeyDown={handleInputKeyDown}
            />
            <SuggestFieldMobileDropdown
                {...pullerProps}
                focusTrapProps={{
                    ...pullerProps?.focusTrapProps,
                    focusTrapOptions: {
                        ...pullerFocusTrapOptions,
                        onDeactivate: () => {
                            returningFocusRef.current = true;
                            pullerFocusTrapOptions?.onDeactivate?.();
                        },
                        onPostDeactivate: () => {
                            returningFocusRef.current = false;
                            pullerFocusTrapOptions?.onPostDeactivate?.();
                        },
                    },
                }}
                value={value}
                options={options}
                placeholder={placeholder}
                tooltipHint={tooltipHint}
                opened={dropdownOpen}
                loading={loading}
                tooltipOpen={tooltipOpen}
                dropdownListLoading={dropdownListLoading}
                clearInputOnFocus={clearInputOnFocus}
                setOpened={setDropdownOpen}
                onFilter={onFilter}
                onSelect={onSelect}
                onScrollEnd={onScrollEnd}
            />
        </TextFieldBase>
    );
};
