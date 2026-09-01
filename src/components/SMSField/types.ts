import React from "react";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TestProps } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства компонента SMSField. */
export interface ISMSFieldProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Значение кода. */
    code: string;
    /** Обработчик изменения кода. */
    onChangeCode: (code: string) => void;
    /** Обработчик отправки кода. */
    onSubmitCode: (code: string) => void;
    /** Размер поля. */
    size: EComponentSize;
    /** Визуальное состояние компонента. По умолчанию EFormFieldStatus.DEFAULT. */
    status?: Exclude<EFormFieldStatus, EFormFieldStatus.WARNING>;
}
