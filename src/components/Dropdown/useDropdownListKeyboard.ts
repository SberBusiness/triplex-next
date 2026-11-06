import { useCallback, useMemo, useRef, useState } from "react";
import { IDropdownListContext, TDropdownListKeyDownHandler } from "./DropdownListContext";

/** Результат хука useDropdownListKeyboard. */
export interface IDropdownListKeyboard {
    /** Значение DropdownListContext.Provider, внутри которого рендерится DropdownList. */
    context: IDropdownListContext;
    /** Идентификатор активного элемента списка. Для aria-activedescendant управляющего элемента. */
    activeDescendant: string | undefined;
    /**
     * Обработчик keydown управляющего элемента: передаёт клавишу открытому списку.
     * Возвращает true, если список её обработал (навигация стрелками или выбор активного элемента),
     * у такого события уже вызван preventDefault. Пока список закрыт, возвращает false.
     */
    handleKeyDown: TDropdownListKeyDownHandler;
}

/**
 * Клавиатурная связка управляющего элемента с DropdownList.
 * Фокус остаётся на управляющем элементе (паттерн aria-activedescendant), поэтому клавиши списку передаёт он:
 * из своего onKeyDown вызывает handleKeyDown.
 */
export const useDropdownListKeyboard = (): IDropdownListKeyboard => {
    const [activeDescendant, setActiveDescendant] = useState<string>();
    const keyDownHandlerRef = useRef<TDropdownListKeyDownHandler>();

    const registerKeyDownHandler = useCallback((handler: TDropdownListKeyDownHandler) => {
        keyDownHandlerRef.current = handler;

        // Снимается только свой обработчик: иначе размонтирование одного списка отключило бы другой под тем же провайдером.
        return () => {
            if (keyDownHandlerRef.current === handler) {
                keyDownHandlerRef.current = undefined;
            }
        };
    }, []);

    const handleKeyDown = useCallback<TDropdownListKeyDownHandler>(
        (event) => keyDownHandlerRef.current?.(event) ?? false,
        [],
    );

    const context = useMemo(
        () => ({ activeDescendant, setActiveDescendant, registerKeyDownHandler }),
        [activeDescendant, registerKeyDownHandler],
    );

    return { context, activeDescendant, handleKeyDown };
};
