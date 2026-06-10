import React, { useRef } from "react";
import { FocusTrap, FocusTrapProps } from "focus-trap-react";

/** Свойства компонента FocusTrapExtended. */
export interface IFocusTrapExtendedProps extends FocusTrapProps {}

/**
 * Обёртка над `FocusTrap`, которая управляет возвратом фокуса в зависимости от сценария закрытия.
 *
 * **Ключевые особенности:**
 * - По умолчанию активирует опцию `clickOutsideDeactivates`.
 * - Если ловушка фокуса закрывается изнутри, фокус автоматически возвращается на элемент, который её активировал.
 * - Если деактивация происходит из-за клика снаружи, фокус не перехватывается.
 */
export const FocusTrapExtended: React.FC<IFocusTrapExtendedProps> = ({ focusTrapOptions, ...restProps }) => {
    const outsideClickRef = useRef(false);

    return (
        <FocusTrap
            {...restProps}
            focusTrapOptions={{
                ...focusTrapOptions,
                clickOutsideDeactivates: (event) => {
                    if (typeof focusTrapOptions?.clickOutsideDeactivates === "function") {
                        const deactivates = focusTrapOptions.clickOutsideDeactivates(event);
                        if (deactivates) {
                            outsideClickRef.current = true;
                        }
                        return deactivates;
                    }

                    outsideClickRef.current = true;
                    return true;
                },
                setReturnFocus: (node) => {
                    const outsideClick = outsideClickRef.current;
                    outsideClickRef.current = false;

                    if (typeof focusTrapOptions?.setReturnFocus === "function") {
                        const userResult = focusTrapOptions.setReturnFocus(node);
                        // Если был внешний клик и пользователь вернул node, подавляем возврат.
                        return outsideClick && userResult === node ? false : userResult;
                    }

                    if (outsideClick) {
                        return false;
                    }

                    return node;
                },
            }}
        />
    );
};
