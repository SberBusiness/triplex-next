import React, { useContext } from "react";
import { Chip, IChipProps } from "../Chip";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { ChipClearButton, IChipClearButtonProps } from "../ChipClearButton";
import { DatePickerExtendedContext } from "../../DatePickerExtended/DatePickerExtendedContext";
import { isKey } from "../../../utils/keyboard";

/** Свойства компонента ChipMonthYearPickerTarget. */
export interface IChipMonthYearPickerTargetProps extends IChipProps {
    /** Обработчик очищения значения. */
    onClear: () => void;
    /** Свойства кнопки очищения значения, например aria-label. */
    clearButtonProps?: Omit<IChipClearButtonProps, "size" | "disabled" | "onClick" | "onKeyDown">;
}

/** Целевой элемент компонента ChipMonthYearPicker. */
export const ChipMonthYearPickerTarget = React.forwardRef<HTMLSpanElement, IChipMonthYearPickerTargetProps>(
    (props, ref) => {
        const { children, size, selected, disabled, onKeyDown, onClick, onClear, clearButtonProps, ...restProps } =
            props;
        const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);

        const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (!disabled && (isKey(event.code, "ENTER") || isKey(event.code, "SPACE"))) {
                event.preventDefault();
                setDropdownOpen(!dropdownOpen);
                onKeyDown?.(event);
            }
        };

        const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
            if (disabled) {
                return;
            }

            setDropdownOpen(!dropdownOpen);
            onClick?.(event);
        };

        /** Нажатие на кнопке очищения не должно всплывать в чип и открывать дропдаун. */
        const handleClearButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                event.stopPropagation();
            }
        };

        const handleClearButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onClear();
        };

        const renderTargetPostfix = () => {
            if (selected) {
                return (
                    <ChipClearButton
                        {...clearButtonProps}
                        size={size}
                        disabled={disabled}
                        onClick={handleClearButtonClick}
                        onKeyDown={handleClearButtonKeyDown}
                    />
                );
            } else {
                return <ChipDropdownArrow size={size} rotated={dropdownOpen} />;
            }
        };

        return (
            <Chip
                size={size}
                selected={selected}
                disabled={disabled}
                aria-expanded={dropdownOpen}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                postfix={renderTargetPostfix()}
                {...restProps}
                ref={ref}
            >
                {children}
            </Chip>
        );
    },
);

ChipMonthYearPickerTarget.displayName = "ChipMonthYearPickerTarget";
