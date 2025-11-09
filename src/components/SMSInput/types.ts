import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TestProps } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства компонента SMSInput. */
export interface ISMSInputProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Значение кода. */
    code: string;
    /** Признак блокировки компонента. */
    disabled?: boolean;
    /** Признак наличия ошибки. */
    error?: boolean;
    /** Обработчик изменения кода. */
    onChangeCode: (code: string) => void;
    /** Обработчик отправки кода. */
    onSubmitCode: (code: string) => void;
    /** Размер поля. */
    size: EComponentSize;
}
