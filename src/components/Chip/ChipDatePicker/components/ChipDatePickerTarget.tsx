import React, { useContext, useRef } from "react";
import { Chip, IChipProps } from "../../Chip";
import { ChipDropdownArrow } from "../../ChipDropdownArrow";
import { ChipClearButton } from "../../ChipClearButton";
import { DatePickerExtendedContext } from "../../../DatePickerExtended/DatePickerExtendedContext";
import { isKey } from "../../../../utils/keyboard";

/** Свойства компонента ChipDatePickerTarget. */
export interface IChipDatePickerTargetProps extends IChipProps {
    /** Функция, вызывающаяся при клике по ChipClearButton. */
    onClear: () => void;
}

/** Управляющий элемент компонента ChipDatePicker. */
export const ChipDatePickerTarget = React.forwardRef<HTMLSpanElement, IChipDatePickerTargetProps>((props, ref) => {
    const { children, selected, onKeyDown, onClick, onClear, ...rest } = props;
    const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);
    const chipRef = useRef<HTMLSpanElement | null>(null);

    /** Обработчик нажатия клавиши. */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        const key = event.code || event.keyCode;

        if (isKey(key, "ENTER") || isKey(key, "SPACE")) {
            event.preventDefault();
            setDropdownOpen(!dropdownOpen);
        }

        onKeyDown?.(event);
    };

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        setDropdownOpen(!dropdownOpen);

        onClick?.(event);
    };

    /** Рендер постфикса. */
    const renderPostfix = () => {
        if (selected) {
            return <ChipClearButton onKeyDown={handleClearButtonKeyDown} onClick={handleClearButtonClick} />;
        } else {
            return <ChipDropdownArrow rotated={dropdownOpen} />;
        }
    };

    /** Обработчик нажатия клавиши ChipClearButton. */
    const handleClearButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        event.stopPropagation();
    };

    /** Обработчик клика ChipClearButton. */
    const handleClearButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        chipRef.current!.focus();
        onClear();
    };

    /** Функция установки ссылки. */
    const setRef = (instance: HTMLInputElement | null) => {
        chipRef.current = instance;
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <Chip
            postfix={renderPostfix()}
            selected={selected}
            aria-expanded={dropdownOpen}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            {...rest}
            ref={setRef}
        >
            {children}
        </Chip>
    );
});

ChipDatePickerTarget.displayName = "ChipDatePickerTarget";
