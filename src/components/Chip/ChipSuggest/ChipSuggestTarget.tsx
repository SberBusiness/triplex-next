import React, { useCallback } from "react";
import { ISuggestOption, useSuggestContext } from "../../Suggest";
import { IChipSuggestTargetProps } from "./types";
import { Chip } from "../Chip";
import { ChipClearButton } from "../ChipClearButton";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";

const ChipSuggestTargetBase = <T extends ISuggestOption>(
    { onKeyDown, onClick, clearSelected, size, ...restProps }: IChipSuggestTargetProps<T>,
    ref: React.ForwardedRef<HTMLSpanElement>,
) => {
    const { value, dropdownOpen, setDropdownOpen } = useSuggestContext<T>();

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setDropdownOpen(!dropdownOpen);
            onClick?.(event);
        },
        [dropdownOpen, setDropdownOpen, onClick],
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                setDropdownOpen(!dropdownOpen);
                onKeyDown?.(event);
            }
        },
        [dropdownOpen, setDropdownOpen, onKeyDown],
    );

    /** Enter и Space на кнопке очистки не должны дополнительно переключать выпадающий список родительского Chip. */
    const handleClearButtonKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
            event.stopPropagation();
        }
    }, []);

    const handleClearButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();
            clearSelected?.();
        },
        [clearSelected],
    );

    // Пока значение не выбрано — стрелка выпадающего списка, после выбора — кнопка очистки.
    const targetPostfix =
        value === undefined ? (
            <ChipDropdownArrow rotated={dropdownOpen} size={size} />
        ) : (
            <ChipClearButton onClick={handleClearButtonClick} onKeyDown={handleClearButtonKeyDown} size={size} />
        );

    return (
        <Chip
            selected={value !== undefined}
            aria-expanded={dropdownOpen}
            postfix={targetPostfix}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            size={size}
            {...restProps}
            ref={ref}
        />
    );
};

/**
 * Target-элемент ChipSuggest: Chip, который открывает и закрывает выпадающий список.
 * Выбранное значение и видимость списка берёт из SuggestContext, поэтому рендерится только внутри Suggest.
 */
export const ChipSuggestTarget = React.forwardRef(ChipSuggestTargetBase) as <T extends ISuggestOption>(
    props: IChipSuggestTargetProps<T> & React.RefAttributes<HTMLSpanElement>,
) => JSX.Element;
