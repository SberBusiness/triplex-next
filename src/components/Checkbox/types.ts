import React from "react";

/** Свойства компонента Checkbox. */
export interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Признак частичного типа выбора. */
    bulk?: boolean;
}
