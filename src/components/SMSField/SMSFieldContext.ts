import React from "react";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

export interface ISMSFieldContext {
    /** Значение кода. */
    code: string;
    /** Отключённое состояние кнопки Submit. */
    disabledSubmit: boolean;
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
    /** Визуальное состояние компонента. */
    status: Exclude<EFormFieldStatus, EFormFieldStatus.WARNING>;
    /** Уникальный идентификатор Tooltip. */
    tooltipId?: string;
}

const contextInitial: ISMSFieldContext = {
    code: "",
    disabledSubmit: true,
    onChangeCode: () => {},
    onSubmitCode: () => {},
    setDisabledSubmit: () => {},
    setTooltipId: () => {},
    size: EComponentSize.LG,
    sizeClassName: "",
    status: EFormFieldStatus.DEFAULT,
    tooltipId: undefined,
};

export const SMSFieldContext = React.createContext(contextInitial);
