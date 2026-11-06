import React, { useCallback } from "react";
import { ISuggestOption, useSuggestContext } from "../../Suggest";
import { IChipSuggestTargetProps } from "./types";
import { Chip } from "../Chip";
import { ChipClearButton } from "../ChipClearButton";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { isKey } from "../../../utils/keyboard";

/** Enter и Space на кнопке очистки не должны дополнительно переключать выпадающий список родительского Chip. */
const handleClearButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
        event.stopPropagation();
    }
};

const ChipSuggestTargetBase = <T extends ISuggestOption>(
    { onKeyDown, onClick, clearSelected, disabled, size, ...restProps }: IChipSuggestTargetProps<T>,
    ref: React.ForwardedRef<HTMLSpanElement>,
) => {
    const { value, dropdownOpen, setDropdownOpen } = useSuggestContext<T>();

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLSpanElement>) => {
            setDropdownOpen(!dropdownOpen);
            onClick?.(event);
        },
        [dropdownOpen, setDropdownOpen, onClick],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                setDropdownOpen(!dropdownOpen);
            }

            onKeyDown?.(event);
        },
        [dropdownOpen, setDropdownOpen, onKeyDown],
    );

    const handleClearButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();
            clearSelected?.();
        },
        [clearSelected],
    );

    const targetPostfix =
        value === undefined ? (
            <ChipDropdownArrow rotated={dropdownOpen} size={size} />
        ) : (
            <ChipClearButton
                onClick={handleClearButtonClick}
                onKeyDown={handleClearButtonKeyDown}
                disabled={disabled}
                size={size}
            />
        );

    return (
        <Chip
            selected={value !== undefined}
            aria-expanded={dropdownOpen}
            postfix={targetPostfix}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            disabled={disabled}
            size={size}
            {...restProps}
            ref={ref}
        />
    );
};

const ChipSuggestTargetWithRef = React.forwardRef(ChipSuggestTargetBase);

ChipSuggestTargetWithRef.displayName = "ChipSuggestTarget";

// forwardRef стирает generic-параметр опции; assertion восстанавливает публичную generic-сигнатуру.
/**
 * Target-элемент ChipSuggest: Chip, который открывает и закрывает выпадающий список.
 * Выбранное значение и видимость списка берёт из SuggestContext, поэтому рендерится только внутри Suggest.
 */
export const ChipSuggestTarget = ChipSuggestTargetWithRef as <T extends ISuggestOption>(
    props: IChipSuggestTargetProps<T> & React.RefAttributes<HTMLSpanElement>,
) => JSX.Element;
