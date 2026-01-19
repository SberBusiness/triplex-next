import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

export interface ISMSFieldContext {
    /** Значение кода. */
    code: string;
    /** Признак блокировки компонента. */
    disabled: boolean;
    /** Отключённое состояние кнопки Submit. */
    disabledSubmit: boolean;
    /** Признак наличия ошибки. */
    error: boolean;
    /** Обработчик изменения кода. */
    onChangeCode: (code: string) => void;
    /** Обработчик отправки кода. */
    onSubmitCode: (code: string) => void;
    /** Установить отключённое состояние кнопки Submit. */
    setDisabledSubmit: (disabled: boolean) => void;
    /** Установить уникальный идентификатор Tooltip. */
    setTooltipId: (id: string) => void;
    /** Размер поля. */
    size: EComponentSize;
    /** CSS класс размера. */
    sizeClassName: string;
    /** Уникальный идентификатор Tooltip. */
    tooltipId?: string;
}

const contextInitial: ISMSFieldContext = {
    code: "",
    disabled: false,
    disabledSubmit: true,
    error: false,
    onChangeCode: () => {},
    onSubmitCode: () => {},
    setDisabledSubmit: () => {},
    setTooltipId: () => {},
    size: EComponentSize.LG,
    sizeClassName: "",
    tooltipId: undefined,
};

export const SMSFieldContext = React.createContext(contextInitial);
