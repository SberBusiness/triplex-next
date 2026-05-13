import React, { useContext } from "react";
import {
    ICollapsibleTreeExtendedNodeHeaderProvideProps,
    ICollapsibleTreeExtendedNodeProps,
} from "../../CollapsibleTreeExtended/components/CollapsibleTreeExtendedNode";
import { CollapsibleTreeExtended } from "../../CollapsibleTreeExtended/CollapsibleTreeExtended";
import { isStaticCheckboxTreeExtended } from "../isStaticCheckboxTreeExtended";
import clsx from "clsx";
import { CheckboxTreeExtendedArrow } from "./CheckboxTreeExtendedArrow";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import styles from "../styles/CheckboxTreeExtended.module.less";
import { CheckboxTreeExtendedContext } from "../CheckboxTreeExtendedContext";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Свойства передаваемые CheckboxTreeExtendedNode в render-функцию чекбокса. */
export interface ICheckboxTreeExtendedCheckboxProvideProps {
    // Текущая нода является активной при перемещении с клавиатуры.
    active?: boolean;
    // Текущая нода раскрыта.
    opened?: boolean;
}

/** Свойства CheckboxTreeExtendedNode. */
interface ICheckboxTreeExtendedNodeProps extends Omit<
    ICollapsibleTreeExtendedNodeProps,
    "children" | "renderBody" | "renderHeader"
> {
    // Render-функция компонента чекбокс.
    checkbox: (props: ICheckboxTreeExtendedCheckboxProvideProps) => JSX.Element;
    // Массив нод CheckboxTreeNode, если имеются вложенные ноды.
    children?: React.ReactNode;
    // Id ноды.
    id: string;
}

/**
 * Нода CheckboxTreeExtendedNode.
 * Является оберткой CollapsibleTreeExtended.Node.
 * Добавляет стили дерева чекбоксов.
 */
export const CheckboxTreeExtendedNode: React.FC<ICheckboxTreeExtendedNodeProps> = ({
    children,
    checkbox,
    opened,
    ...collapsibleTreeExtendedNodeProps
}) => {
    const { size } = useContext(CheckboxTreeExtendedContext);

    const handleHeaderMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        // Прерывание всплытия при клике на сам контейнер. Чтобы checkbox не выделялся фокусом при клике сбоку от него.
        if (event.target === event.currentTarget) {
            event.preventDefault();
        }
    };

    const renderHeader = ({ activeNode, opened, toggle }: ICollapsibleTreeExtendedNodeHeaderProvideProps) => {
        return (
            <div
                className={clsx(styles.checkboxTreeExtendedNodeHeader, sizeToClassNameMap[size], { opened: opened })}
                onMouseDown={handleHeaderMouseDown}
            >
                {!isStaticCheckboxTreeExtended && children && (
                    <CheckboxTreeExtendedArrow active={activeNode} toggle={toggle} opened={opened} />
                )}

                {/** Active передается для фокуса чекбокса при перемещении с клавиатуры. Если есть дочерние ноды, то active передается в CheckboxTreeExtendedArrow. */}
                {isStaticCheckboxTreeExtended
                    ? checkbox({ active: activeNode, opened: true })
                    : checkbox({ active: !children && activeNode, opened })}
            </div>
        );
    };

    const renderBody = () => children;

    return (
        <CollapsibleTreeExtended.Node
            className={styles.checkboxTreeExtendedNode}
            opened={isStaticCheckboxTreeExtended ? true : opened}
            renderHeader={renderHeader}
            renderBody={renderBody}
            {...collapsibleTreeExtendedNodeProps}
        />
    );
};
