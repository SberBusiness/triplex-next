import React from "react";

/** Описание чекбокса компонента CheckboxTree. */
export interface ICheckboxTreeCheckboxData {
    id: string;
    label: React.ReactNode;
    checked: boolean;
    bulk?: boolean;
    children?: ICheckboxTreeCheckboxData[];
}
