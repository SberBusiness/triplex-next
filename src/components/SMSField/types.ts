import React from "react";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TestProps } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства компонента SMSField. */
export interface ISMSFieldProps extends React.HTMLAttributes<HTMLDivElement>, TestProps {
    /** Состав поля: SMSField.Input, SMSField.Refresh, SMSField.Submit и SMSField.Tooltip. */
    children?: React.ReactNode;
    /** Текущее значение кода. Компонент управляемый: обновляйте code в onChangeCode. */
    code: string;
    /** Обработчик изменения кода через SMSField.Input. Получает строку, содержащую только цифры, или пустую строку. */
    onChangeCode: (code: string) => void;
    /** Обработчик отправки текущего кода кнопкой SMSField.Submit или клавишей Enter в SMSField.Input. */
    onSubmitCode: (code: string) => void;
    /** Размер поля и вложенных компонентов SMSField.Input, SMSField.Refresh и SMSField.Submit. */
    size: EComponentSize;
    /** Состояние вложенных элементов. DISABLED блокирует ввод и кнопки; WARNING не поддерживается. По умолчанию EFormFieldStatus.DEFAULT. */
    status?: Exclude<EFormFieldStatus, EFormFieldStatus.WARNING>;
}
