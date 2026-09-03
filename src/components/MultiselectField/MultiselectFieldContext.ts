import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Значение контекста MultiselectField. */
export interface IMultiselectFieldContext {
    /** Размер компонента. Наследуется выпадающим блоком и его содержимым. */
    size: EComponentSize;
    /**
     * Признак того, что выпадающий блок был открыт мышью.
     * Выпадающий блок по нему выключает возврат фокуса на поле при закрытии
     * и сбрасывает его в false, когда блок закрылся.
     */
    mouseUsedRef: React.MutableRefObject<boolean>;
}

/** Значение контекста по умолчанию — для частей, отрендеренных вне MultiselectField. */
export const initialMultiselectFieldContext: IMultiselectFieldContext = {
    size: EComponentSize.MD,
    mouseUsedRef: { current: false },
};

export const MultiselectFieldContext = React.createContext<IMultiselectFieldContext>(initialMultiselectFieldContext);
