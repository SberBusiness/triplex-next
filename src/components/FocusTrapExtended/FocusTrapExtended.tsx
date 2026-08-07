import React, { useState, useRef } from "react";
import FocusTrap from "focus-trap-react";

/** Свойства компонента FocusTrapExtended. */
export interface IFocusTrapExtendedProps extends FocusTrap.Props {}

/**
 * Расширенная обёртка над `FocusTrap`, управляющая возвратом фокуса в зависимости от сценария закрытия.
 *
 * **Ключевые особенности:**
 * - По умолчанию обрабатывает внешний клик через `clickOutsideDeactivates` и переводит ловушку на паузу.
 * - Автоматически возвращает фокус на триггер при закрытии изнутри, но не перехватывает его при клике снаружи.
 * - Вместо полного уничтожения нативного инстанса ловушки при кликах снаружи, компонент переводит текущую ловушку на
 *   паузу. Это изолирует стек ловушек и предотвращает ложный перехват фокуса предыдущими ловушками фокуса (ниже по
 *   стеку).
 */
export const FocusTrapExtended: React.FC<IFocusTrapExtendedProps> = ({
    paused: externalPaused,
    focusTrapOptions,
    ...restProps
}) => {
    const [paused, setPaused] = useState(false);
    const outsideClickRef = useRef(false);

    return (
        <FocusTrap
            {...restProps}
            paused={externalPaused ?? paused}
            focusTrapOptions={{
                ...focusTrapOptions,
                onActivate: () => {
                    outsideClickRef.current = false;
                    // Сбрасываем паузу, так как при закрытии без unmount локальный стейт сохраняет true
                    setPaused(false);
                    focusTrapOptions?.onActivate?.();
                },
                clickOutsideDeactivates: (event) => {
                    if (focusTrapOptions?.clickOutsideDeactivates !== undefined) {
                        const deactivates =
                            typeof focusTrapOptions.clickOutsideDeactivates === "function"
                                ? focusTrapOptions.clickOutsideDeactivates(event)
                                : focusTrapOptions.clickOutsideDeactivates;

                        if (deactivates) {
                            // Фиксируем клик только если внешнее правило действительно разрешило деактивацию
                            outsideClickRef.current = true;
                        }
                        return deactivates;
                    }

                    outsideClickRef.current = true;
                    setPaused(true);
                    return false;
                },
                setReturnFocus: (node) => {
                    const outsideClick = outsideClickRef.current;
                    outsideClickRef.current = false;

                    if (focusTrapOptions?.setReturnFocus !== undefined) {
                        return typeof focusTrapOptions.setReturnFocus === "function"
                            ? focusTrapOptions.setReturnFocus(node)
                            : focusTrapOptions.setReturnFocus;
                    }

                    // Если клик был снаружи, возвращать фокус не нужно
                    if (outsideClick) {
                        return false;
                    }
                    return node;
                },
            }}
        />
    );
};
