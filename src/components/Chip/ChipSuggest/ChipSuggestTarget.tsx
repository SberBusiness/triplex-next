import React, { useCallback } from "react";
import { ISuggestOption, useSuggestContext } from "../../Suggest";
import { IChipSuggestTargetProps } from "./types";
import { Chip } from "../Chip";
import { ChipClearButton } from "../ChipClearButton";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { isKey } from "@sberbusiness/triplex-next/utils/keyboard";

const ChipSuggestTargetBase = <T extends ISuggestOption>(
    { onKeyDown, onClick, clearSelected, ...restProps }: IChipSuggestTargetProps<T>,
    ref: React.ForwardedRef<HTMLSpanElement>,
) => {
    const { value, dropdownOpen, setDropdownOpen } = useSuggestContext<T>();

    const handleTargetClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setDropdownOpen(!dropdownOpen);
            onClick?.(event);
        },
        [dropdownOpen, setDropdownOpen, onClick],
    );

    const handleTargetKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                setDropdownOpen(!dropdownOpen);
                onKeyDown?.(event);
            }
        },
        [dropdownOpen, setDropdownOpen, onKeyDown],
    );

    const handleClearButtonKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                event.preventDefault();
                event.stopPropagation();
                clearSelected?.();
            }
        },
        [clearSelected],
    );

    const handleClearButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();
            clearSelected?.();
        },
        [clearSelected],
    );

    const renderTargetPostfix = useCallback(() => {
        if (value === undefined) {
            return <ChipDropdownArrow rotated={dropdownOpen} />;
        } else {
            return <ChipClearButton onClick={handleClearButtonClick} onKeyDown={handleClearButtonKeyDown} />;
        }
    }, [value, dropdownOpen, handleClearButtonClick, handleClearButtonKeyDown]);

    return (
        <Chip
            selected={value !== undefined}
            aria-expanded={dropdownOpen}
            postfix={renderTargetPostfix()}
            onKeyDown={handleTargetKeyDown}
            onClick={handleTargetClick}
            {...restProps}
            ref={ref}
        />
    );
};

export const ChipSuggestTarget = React.forwardRef(ChipSuggestTargetBase) as <T extends ISuggestOption>(
    props: IChipSuggestTargetProps<T> & React.RefAttributes<HTMLSpanElement>,
) => JSX.Element;
