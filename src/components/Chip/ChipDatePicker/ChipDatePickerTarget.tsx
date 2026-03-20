import React, { useContext } from "react";
import { Chip, IChipProps } from "../Chip";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { ChipClearButton } from "../ChipClearButton";
import { DatePickerExtendedContext } from "../../DatePickerExtended/DatePickerExtendedContext";
import { isKey } from "../../../utils/keyboard";

export interface IChipDatePickerTargetProps extends IChipProps {
    onClear: () => void;
}

export const ChipDatePickerTarget = React.forwardRef<HTMLSpanElement, IChipDatePickerTargetProps>((props, ref) => {
    const { children, selected, onKeyDown, onClick, onClear, size, ...rest } = props;
    const { dropdownOpen, setDropdownOpen } = useContext(DatePickerExtendedContext);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
            event.preventDefault();
            setDropdownOpen(!dropdownOpen);
            onKeyDown?.(event);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        setDropdownOpen(!dropdownOpen);
        onClick?.(event);
    };

    const renderTargetPostfix = () => {
        if (selected) {
            return <ChipClearButton size={size} onClick={handleClearButtonClick} />;
        } else {
            return <ChipDropdownArrow size={size} rotated={dropdownOpen} />;
        }
    };

    const handleClearButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClear();
    };

    return (
        <Chip
            postfix={renderTargetPostfix()}
            selected={selected}
            aria-expanded={dropdownOpen}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            size={size}
            {...rest}
            ref={ref}
        >
            {children}
        </Chip>
    );
});

ChipDatePickerTarget.displayName = "ChipDatePickerTarget";
