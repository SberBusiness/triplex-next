import React from "react";
import { EComponentSize } from "../../enums";
import { EStepperStepType } from "./enums";

/** Свойства компонента StepperExtended. */
export interface IStepperExtendedProps extends React.HTMLAttributes<HTMLOListElement> {
    /** Размер. По умолчанию EComponentSize.LG. */
    size?: EComponentSize;
    /** Уникальный идентификатор выбранного шага. */
    selectedStepId?: string;
    /** Обработчик выбора шага. */
    onSelectStep: (id: string) => void;
    /** Ссылка на список шагов. */
    forwardedRef?: React.Ref<HTMLOListElement>;
}

/** Свойства шага в Stepper */
export interface IStepperStep extends IStepperStepProps {
    /** Название шага. Попадает в содержимое шага, остальные поля — в его HTML-атрибуты. */
    label?: React.ReactNode;
}

/** Свойства компонента Stepper. */
export interface IStepperProps extends Omit<IStepperExtendedProps, "children"> {
    /** Шаги. Порядок массива задаёт порядок отображения; шаги после выбранного считаются непройденными. */
    steps: Array<IStepperStep>;
}

/** Свойства компонента StepperStep. */
export interface IStepperStepProps extends React.LiHTMLAttributes<HTMLLIElement> {
    /** Уникальный идентификатор шага. Сопоставляется с selectedStepId и приходит в onSelectStep. */
    id: string;
    /** Шаг недоступен для выбора: не реагирует на клик, клавиатуру и выпадает из таб-порядка. */
    disabled?: boolean;
    /** Иконка, отображающая статус шага. */
    icon?: React.ReactNode;
    /** Ссылка на шаг. */
    forwardedRef?: React.Ref<HTMLLIElement>;
    /** Флаг непройденного шага. */
    isInActiveStep?: boolean;
    /** Тип шага. */
    type: EStepperStepType;
}
