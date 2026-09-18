import React from "react";
import { CheckboxTreeExtended, ICheckboxTreeExtendedProps } from "../CheckboxTreeExtended/CheckboxTreeExtended";
import { ICheckboxTreeExtendedCheckboxProvideProps } from "../CheckboxTreeExtended/components/CheckboxTreeExtendedNode";
import { ICheckboxTreeCheckboxData } from "./types";
import { checkChildrenCheckboxes, checkParentCheckboxes, traverseCheckboxes } from "./utils";
import { EComponentSize } from "../../enums/EComponentSize";

/** Свойства CheckboxTree. */
export interface ICheckboxTreeProps extends Omit<ICheckboxTreeExtendedProps, "children" | "onChange"> {
    /** Дерево строится из checkboxes — собственную разметку узлов передать нельзя. Для неё есть CheckboxTreeExtended. */
    children?: never;
    /** Набор чекбоксов. Дерево задаётся вложенностью children у элементов набора. */
    checkboxes: ICheckboxTreeCheckboxData[];
    /** Обработчик изменения чекбоксов. Получает новый массив с пересчитанными флагами checked и bulk. */
    onChange: (options: ICheckboxTreeCheckboxData[]) => void;
}

/**
 * Дерево чекбоксов.
 * Является оберткой над CheckboxTreeExtended: принимает плоское описание дерева и сам связывает состояние
 * родителей и потомков — выбор родителя выбирает всех потомков, выбор части потомков делает родителя частичным.
 *
 * ref указывает на корневой <ul role="tree">.
 */
export const CheckboxTree = React.forwardRef<HTMLUListElement, ICheckboxTreeProps>(
    ({ checkboxes, onChange, size = EComponentSize.MD, ...rest }, ref) => {
        const handleChange = (checkbox: ICheckboxTreeCheckboxData) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { checked } = event.target;

            // Клик по частично выбранному узлу выбирает его целиком, а не снимает выбор.
            checkbox.checked = checkbox.bulk ? true : checked;

            // Обновление флага checked дочерних чекбоксов, при изменении родителя.
            checkChildrenCheckboxes(checkbox);

            // Обновление флага checked и bulk всех чекбоксов снизу вверх.
            traverseCheckboxes(checkboxes, checkParentCheckboxes);

            onChange([...checkboxes]);
        };

        // Соседи по списку передаются узлу как prevNodeId/nextNodeId — по ним TreeView строит клавиатурную навигацию.
        const renderNodes = (nodes: ICheckboxTreeCheckboxData[]) =>
            nodes.map((checkbox, index) => renderNode(checkbox, nodes[index - 1], nodes[index + 1]));

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
                {checkbox.children && renderNodes(checkbox.children)}
            </CheckboxTreeExtended.Node>
        );

        return (
            <CheckboxTreeExtended size={size} {...rest} ref={ref}>
                {renderNodes(checkboxes)}
            </CheckboxTreeExtended>
        );
    },
);

CheckboxTree.displayName = "CheckboxTree";
