import React, { useEffect, useRef } from "react";
import { CaretdownStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import styles from "../styles/CheckboxTreeExtended.module.less";

/** Свойства CheckboxTreeExtendedArrow. */
interface ICheckboxTreeExtendedArrowProps {
    /** Текущая нода является активной при перемещении с клавиатуры. */
    active: boolean;
    /** Текущая нода раскрыта. */
    opened: boolean;
    /** Функция смены значения opened. */
    toggle: (opened: boolean) => void;
}

/**
 * Стрелка раскрытия ветки CheckboxTreeExtended.
 */
export const CheckboxTreeExtendedArrow: React.FC<ICheckboxTreeExtendedArrowProps> = ({ active, opened, toggle }) => {
    const arrowNode = useRef<HTMLSpanElement | null>(null);
    const prevActive = useRef(active);

    // Триггер фокуса на стрелке при изменении флага активности при перемещении по дереву с клавиатуры.
    useEffect(() => {
        if (active && !prevActive.current) {
            arrowNode.current?.focus();
        }

        prevActive.current = active;
    }, [active]);

    const handleClick = () => {
        toggle(!opened);
    };

    /**
     * Обработчик нажатия клавиш.
     * Стрелка вправо - раскрыть, влево - свернуть.
     * Enter, space - изменить состояние на противоположное.
     */
    const handleKeyUp = (event: React.KeyboardEvent<HTMLSpanElement>) => {
        if (event.keyCode === EVENT_KEY_CODES.ARROW_RIGHT) {
            toggle(true);
        } else if (event.keyCode === EVENT_KEY_CODES.ARROW_LEFT) {
            toggle(false);
        } else if ([EVENT_KEY_CODES.ENTER, EVENT_KEY_CODES.SPACE].includes(event.keyCode)) {
            toggle(!opened);
        }
    };

    return (
        <span
            className={styles.caretIconWrapper}
            onClick={handleClick}
            onKeyUp={handleKeyUp}
            ref={arrowNode}
            role="button"
            tabIndex={-1}
        >
            <CaretdownStrokeSrvIcon16 paletteIndex={0} />
        </span>
    );
};

CheckboxTreeExtendedArrow.displayName = "CheckboxTreeExtendedArrow";
