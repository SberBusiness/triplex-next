import React, { useCallback } from "react";
import { Chip, IChipProps } from "../Chip";
import { ChipDropdownArrow } from "../ChipDropdownArrow";
import { ChipClearButton } from "../ChipClearButton";
import { isKey } from "../../../utils/keyboard";

/** Свойства компонента ChipSelectTarget. */
export interface IChipSelectTargetProps extends IChipProps {
    /** Сброс выбранного значения. Потребитель самостоятельно обновляет selected и children. */
    onClear: () => void;
    /** Управляемое состояние открытости списка. */
    opened: boolean;
    /** Запрос изменения открытости списка: по клику переключает её, Enter/Space открывают, Tab закрывает. */
    setOpened: (opened: boolean) => void;
}

/** Enter и Space на кнопке очистки не должны дополнительно переключать выпадающий список родительского Chip. */
const handleClearButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isKey(event.code, "ENTER") || isKey(event.code, "SPACE")) {
        event.stopPropagation();
    }
};

/** Target для ChipSelect: Chip со стрелкой или очисткой и управляемой открытостью списка. */
export const ChipSelectTarget = React.forwardRef<HTMLSpanElement, IChipSelectTargetProps>((props, ref) => {
    const { children, disabled, selected, onKeyDown, onClick, onClear, opened, setOpened, size, ...restProps } = props;

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

    const handleClearButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращение нажатия на родительский элемент Chip.
            event.stopPropagation();
            onClear();
        },
        [onClear],
    );

    const targetPostfix = selected ? (
        <ChipClearButton
            size={size}
            disabled={disabled}
            onClick={handleClearButtonClick}
            onKeyDown={handleClearButtonKeyDown}
        />
    ) : (
        <ChipDropdownArrow size={size} rotated={opened} />
    );

    return (
        <Chip
            postfix={targetPostfix}
            disabled={disabled}
            selected={selected}
            aria-expanded={opened}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            size={size}
            {...restProps}
            ref={ref}
        >
            {children}
        </Chip>
    );
});

ChipSelectTarget.displayName = "ChipSelectTarget";
