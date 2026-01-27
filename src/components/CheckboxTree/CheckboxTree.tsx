import React from "react";
import { CheckboxTreeExtended, ICheckboxTreeExtendedProps } from "../CheckboxTreeExtended/CheckboxTreeExtended";
import { ICheckboxTreeExtendedCheckboxProvideProps } from "../CheckboxTreeExtended/components/CheckboxTreeExtendedNode";
import { ICheckboxTreeCheckboxData } from "./types";
import { checkChildrenCheckboxes, checkParentCheckboxes, traverseCheckboxes } from "./utils";
import { EComponentSize } from "../../enums/EComponentSize";

/** Свойства CheckboxTree. */
export interface ICheckboxTreeProps extends Omit<ICheckboxTreeExtendedProps, "children" | "onChange"> {
    children?: never;
    /** Набор чекбоксов. */
    checkboxes: ICheckboxTreeCheckboxData[];
    /** Обработчик изменения чекбоксов. */
    onChange: (options: ICheckboxTreeCheckboxData[]) => void;
}

/**
 * Дерево чекбоксов.
 * Является оберткой над CheckboxTreeExtended.
 */
export const CheckboxTree: React.FC<ICheckboxTreeProps> = ({ checkboxes, onChange, size = EComponentSize.MD }) => {
    const handleChange = (checkbox: ICheckboxTreeCheckboxData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;

        checkbox.checked = checkbox.bulk ? true : checked;

        // Обновление флага checked дочерних чекбоксов, при изменении родителя.
        checkChildrenCheckboxes(checkbox);

        // Обновление флага checked и bulk всех чекбоксов снизу вверх.
        traverseCheckboxes(checkboxes, checkParentCheckboxes);

        onChange([...checkboxes]);
    };

    const renderNode = (
        checkbox: ICheckboxTreeCheckboxData,
        prevCheckbox?: ICheckboxTreeCheckboxData,
        nextCheckbox?: ICheckboxTreeCheckboxData,
    ) => (
        <CheckboxTreeExtended.Node
            id={checkbox.id}
            key={checkbox.id}
            checkbox={(props: ICheckboxTreeExtendedCheckboxProvideProps) => (
                <CheckboxTreeExtended.Checkbox
                    {...props}
                    onChange={handleChange(checkbox)}
                    bulk={checkbox.bulk}
                    checked={checkbox.checked}
                >
                    {checkbox.label}
                </CheckboxTreeExtended.Checkbox>
            )}
            prevNodeId={prevCheckbox?.id}
            nextNodeId={nextCheckbox?.id}
        >
            {checkbox.children &&
                checkbox.children.map((child, index) =>
                    renderNode(child, checkbox.children?.[index - 1], checkbox.children?.[index + 1]),
                )}
        </CheckboxTreeExtended.Node>
    );

    return (
        <CheckboxTreeExtended size={size}>
            {checkboxes.map((checkbox, index) => renderNode(checkbox, checkboxes[index - 1], checkboxes[index + 1]))}
        </CheckboxTreeExtended>
    );
};

CheckboxTree.displayName = "CheckboxTree";
