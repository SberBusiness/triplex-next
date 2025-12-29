import React, { useCallback } from "react";
import { Chip, IChipProps } from "../Chip";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { ChipClearButton } from "../ChipClearButton";
import { isKey } from "../../../utils/keyboard";

export interface IChipSelectTargetProps extends IChipProps {
    onClear: () => void;
    opened: boolean;
    setOpened: (opened: boolean) => void;
}

export const ChipSelectTarget = React.forwardRef<HTMLSpanElement, IChipSelectTargetProps>((props, ref) => {
    const { children, selected, onKeyDown, onClick, onClear, opened, setOpened, ...rest } = props;

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (!opened && (isKey(event.code, "ENTER") || isKey(event.code, "SPACE"))) {
                event.preventDefault();
                setOpened(true);
            } else if (opened && isKey(event.code, "TAB")) {
                setOpened(false);
            }

            onKeyDown?.(event);
        },
        [opened, setOpened, onKeyDown],
    );

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLSpanElement>) => {
            setOpened(!opened);
            onClick?.(event);
        },
        [opened, setOpened, onClick],
    );

    const handleClearButtonKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
            event.stopPropagation();
        }
    }, []);

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
            return <ChipDropdownArrow rotated={opened} />;
        }
    }, [selected, opened, handleClearButtonClick, handleClearButtonKeyDown]);

    return (
        <Chip
            postfix={renderTargetPostfix()}
            selected={selected}
            aria-expanded={opened}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            {...rest}
            ref={ref}
        >
            {children}
        </Chip>
    );
});

ChipSelectTarget.displayName = "ChipSelectTarget";
