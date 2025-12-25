import React, { useCallback, useContext } from "react";
import { Chip, IChipProps } from "../Chip";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { ChipClearButton } from "../ChipClearButton";
import { SelectExtendedFieldContext } from "../../SelectExtendedField/SelectExtendedContext";
import { isKey } from "../../../utils/keyboard";

export interface IChipSelectTargetProps extends IChipProps {
    onClear: () => void;
}

export const ChipSelectTarget = React.forwardRef<HTMLSpanElement, IChipSelectTargetProps>((props, ref) => {
    const { children, selected, onKeyDown, onClick, onClear, ...rest } = props;
    const { dropdownOpen, setDropdownOpen } = useContext(SelectExtendedFieldContext);

    const handleTargetKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (!dropdownOpen && (isKey(event.code, "ENTER") || isKey(event.code, "SPACE"))) {
                event.preventDefault();
                setDropdownOpen(!dropdownOpen);
            } else if (dropdownOpen && isKey(event.code, "TAB")) {
                setDropdownOpen(false);
            }

            onKeyDown?.(event);
        },
        [dropdownOpen, setDropdownOpen, onKeyDown],
    );

    const handleTargetClick = useCallback(
        (event: React.MouseEvent<HTMLSpanElement>) => {
            setDropdownOpen(!dropdownOpen);
            onClick?.(event);
        },
        [dropdownOpen, setDropdownOpen, onClick],
    );

    const handleClearButtonKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
                event.preventDefault();
                event.stopPropagation();
                onClear();
            }
        },
        [onClear],
    );

    const handleClearButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onClear();
        },
        [onClear],
    );

    const renderTargetPostfix = useCallback(() => {
        if (selected) {
            return <ChipClearButton onClick={handleClearButtonClick} onKeyDown={handleClearButtonKeyDown} />;
        } else {
            return <ChipDropdownArrow rotated={dropdownOpen} />;
        }
    }, [selected, dropdownOpen, handleClearButtonClick, handleClearButtonKeyDown]);

    return (
        <Chip
            postfix={renderTargetPostfix()}
            selected={selected}
            aria-expanded={dropdownOpen}
            onKeyDown={handleTargetKeyDown}
            onClick={handleTargetClick}
            {...rest}
            ref={ref}
        >
            {children}
        </Chip>
    );
});

ChipSelectTarget.displayName = "ChipSelectTarget";
