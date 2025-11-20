import React from "react";
import {
    ICollapsableTreeNodeHeaderProvideProps,
    ICollapsableTreeNodeProps,
} from "../../CollapsableTree/components/CollapsableTreeNode";
import { CollapsableTree } from "../../CollapsableTree/CollapsableTree";
import { isStaticCheckboxTreeExtended } from "../isStaticCheckboxTreeExtended";
import clsx from "clsx";
import { CheckboxTreeExtendedArrow } from "./CheckboxTreeExtendedArrow";
import styles from "../styles/CheckboxTreeExtended.module.less";

/**
 * Свойства передаваемые CheckboxTreeExtendedNode в render-функцию чекбокса.
 *
 * @prop {boolean} [active] - Текущая нода является активной при перемещении с клавиатуры.
 * @prop {boolean} [opened] -  Текущая нода раскрыта.
 */
export interface ICheckboxTreeExtendedCheckboxProvideProps {
    active?: boolean;
    opened?: boolean;
}

/**
 * Свойства CheckboxTreeExtendedNode.
 */
interface ICheckboxTreeExtendedNodeProps
    extends Omit<ICollapsableTreeNodeProps, "children" | "renderBody" | "renderHeader"> {
    // Render-функция компонента чекбокс.
    checkbox: (props: ICheckboxTreeExtendedCheckboxProvideProps) => JSX.Element;
    // Массив нод CheckboxTreeNode, если имеются вложенные ноды.
    children?: React.ReactNode;
    // Id ноды.
    id: string;
}

/**
 * Нода CheckboxTreeExtendedNode.
 * Является оберткой CollapsableTree.Node.
 * Добавляет стили дерева чекбоксов.
 */
export class CheckboxTreeExtendedNode extends React.Component<ICheckboxTreeExtendedNodeProps> {
    public render(): JSX.Element {
        const { children, checkbox, opened, ...collapsableTreeNodeProps } = this.props;
        return (
            <CollapsableTree.Node
                className={styles.checkboxTreeExtendedNode}
                opened={isStaticCheckboxTreeExtended ? true : opened}
                renderHeader={this.renderHeader}
                renderBody={this.renderBody}
                {...collapsableTreeNodeProps}
            />
        );
    }

    private handleHeaderMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        // Прерывание всплытия при клике на сам контейнер. Чтобы checkbox не выделялся фокусом при клике сбоку от него.
        if (event.target === event.currentTarget) {
            event.preventDefault();
        }
    };

    private renderHeader = ({ activeNode, opened, toggle }: ICollapsableTreeNodeHeaderProvideProps) => {
        const { checkbox, children } = this.props;

        return (
            <div
                className={clsx(styles.checkboxTreeExtendedNodeHeader, { opened: opened })}
                onMouseDown={this.handleHeaderMouseDown}
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

    private renderBody = () => this.props.children;
}
