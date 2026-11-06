import React from "react";
import { isKey } from "../../utils/keyboard";
import { IButtonDropdownExtendedButtonProvideProps } from "./ButtonDropdownExtended";

/** Состояние открытости, которое ButtonDropdownExtended передаёт кнопке. */
type TButtonDropdownOpenedState = Pick<IButtonDropdownExtendedButtonProvideProps, "opened" | "setOpened">;

/**
 * Создаёт обработчик keydown кнопки выпадающего меню.
 * Space переключает открытость, ArrowUp / ArrowDown открывают закрытое меню; у всех трёх клавиш вызывается
 * preventDefault.
 */
export const createButtonDropdownKeyDownHandler =
    ({ opened, setOpened }: TButtonDropdownOpenedState) =>
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
        // Сравнивается event.code: event.key пробела — " ", он не входит в EVENT_KEYS.SPACE.
        const key: string | number = event.code || event.keyCode;

        if (isKey(key, "SPACE") || isKey(key, "ARROW_UP") || isKey(key, "ARROW_DOWN")) {
            event.preventDefault();
        }
        if (isKey(key, "SPACE")) {
            // preventDefault отменяет нативную click-активацию кнопки по пробелу — переключение выполняется явно.
            // На открытом меню пробел всплывает дальше и выбирает активный пункт: его onSelect тоже закрывает меню.
            setOpened(!opened);
        } else if (!opened && (isKey(key, "ARROW_UP") || isKey(key, "ARROW_DOWN"))) {
            setOpened(true);
        }
    };
