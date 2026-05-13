import React from "react";
import { ITreeViewNodeProps, ITreeViewNodeProvideProps } from "../../TreeView/components/TreeViewNode";
import {
    IAccordionBaseProps,
    IAccordionBodyProvideProps,
    IAccordionHeaderProvideProps,
} from "../../AccordionBase/types";
import { TreeView } from "../../TreeView/TreeView";
import { AccordionBase } from "../../AccordionBase/protected/AccordionBase";
import clsx from "clsx";
import styles from "../styles/CollapsibleTreeExtended.module.less";

/**
 * Свойства, передаваемые CollapsibleTreeExtendedNode в рендер-функцию renderBody.
 *
 * activeNode - Текущая нода является активной при перемещении с клавиатуры.
 * animating - В текущий момент происходит анимация открытия/закрытия.
 * hasChildNodes - Текущая нода имеет дочерние ноды.
 */
export interface ICollapsibleTreeExtendedNodeBodyProvideProps
    extends
        Pick<IAccordionBodyProvideProps, "animating">,
        Pick<ITreeViewNodeProvideProps, "activeNode" | "hasChildNodes"> {
    // Текущая нода раскрыта.
    opened: boolean;
    // Функция смены значения opened.
    toggle: (opened: boolean) => void;
}

/**
 * Свойства, передаваемые CollapsibleTreeExtendedNode в рендер-функцию renderHeader.
 *
 * activeNode - Текущая нода является активной при перемещении с клавиатуры.
 * animating - В текущий момент происходит анимация открытия/закрытия.
 * hasChildNodes - Текущая нода имеет дочерние ноды.
 * isLastNode - Текущая нода является последней в дереве.
 */
export interface ICollapsibleTreeExtendedNodeHeaderProvideProps
    extends
        Pick<IAccordionHeaderProvideProps, "animating">,
        Pick<ITreeViewNodeProvideProps, "activeNode" | "hasChildNodes" | "isLastNode"> {
    // Текущая нода раскрыта.
    opened: boolean;
    // Функция смены значения opened.
    toggle: (opened: boolean) => void;
}

/**
 * Свойства CollapsibleTreeExtendedNode.
 *
 * toggle - Функция смены значения opened.
 * onToggle - Функция, вызываемая после окончания анимации открытия/закрытия.
 */
export interface ICollapsibleTreeExtendedNodeProps
    extends Omit<ITreeViewNodeProps, "children">, Pick<IAccordionBaseProps, "onToggle" | "toggle"> {
    children?: never;
    // Render-функция дочерних нод.
    renderBody: (props: ICollapsibleTreeExtendedNodeBodyProvideProps) => React.ReactNode;
    // Render-функция не сворачиваемой части ноды.
    renderHeader: (props: ICollapsibleTreeExtendedNodeHeaderProvideProps) => JSX.Element;
}

/**
 * Состояние CollapsibleTreeExtendedNode.
 *
 * @param {boolean} controlled - Флаг, означающий, что состояние opened передается снаружи.
 */
interface ICollapsibleTreeExtendedNodeState {
    controlled: boolean;
}

/**
 * Нода дерева CollapsibleTreeExtended.
 * Является оберткой TreeView.Node.
 * Сворачиваться/разворачиваться может только если есть дочерние ноды. Они передаются в renderBody.
 */
export class CollapsibleTreeExtendedNode extends React.Component<
    ICollapsibleTreeExtendedNodeProps,
    ICollapsibleTreeExtendedNodeState
> {
    public static displayName = "CollapsibleTreeExtendedNode";

    state = {
        controlled: typeof this.props.opened !== "undefined",
    };

    public render(): JSX.Element {
        const { opened: openedProps, onToggle, renderBody, renderHeader, toggle, ...treeNodeProps } = this.props;
        const { controlled } = this.state;

        return (
            <TreeView.Node opened={openedProps} {...treeNodeProps}>
                {(treeViewNodeProps) => {
                    const opened = controlled ? openedProps : treeViewNodeProps.openedNode;
                    return (
                        <AccordionBase
                            expandAnimationClassName={clsx(styles.collapsibleTreeExtendedNodeContent, {
                                collapsed: !opened,
                            })}
                            renderBody={this.renderBody(treeViewNodeProps)}
                            renderHeader={this.renderHeader(treeViewNodeProps)}
                            isOpen={opened}
                            onToggle={onToggle}
                        />
                    );
                }}
            </TreeView.Node>
        );
    }

    /**
     * Изменяет состояние ноды - раскрыта/свернута.
     * Эта функция передается дочерним компонентам и вызывается из них.
     */
    private toggle =
        ({ openedNode, setOpenedNode }: ITreeViewNodeProvideProps) =>
        (nextOpened: boolean) => {
            const { controlled } = this.state;
            const { opened: openedProps, toggle } = this.props;
            const opened = controlled ? openedProps : openedNode;

            if (opened !== nextOpened) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                controlled ? toggle?.(nextOpened) : setOpenedNode(nextOpened);
            }
        };

    /** Render-функция для передачи дочерних нод. */
    private renderBody =
        (treeViewNodeProvideProps: ITreeViewNodeProvideProps) =>
        (accordionBodyProvideProps: IAccordionBodyProvideProps) => {
            const { activeNode, openedNode, hasChildNodes } = treeViewNodeProvideProps;
            const { animating } = accordionBodyProvideProps;
            const { opened: openedProps, renderBody } = this.props;
            const { controlled } = this.state;

            // Внутренние ноды оборачиваются дополнительным тегом.
            if (treeViewNodeProvideProps.hasChildNodes) {
                return (
                    <TreeView.Group>
                        {renderBody({
                            activeNode,
                            animating,
                            hasChildNodes,
                            opened: controlled ? openedProps! : openedNode,
                            toggle: this.toggle(treeViewNodeProvideProps),
                        })}
                    </TreeView.Group>
                );
            }

            return renderBody({
                activeNode,
                animating,
                hasChildNodes,
                opened: controlled ? openedProps! : openedNode,
                toggle: this.toggle(treeViewNodeProvideProps),
            });
        };

    /** Render-функция не сворачиваемой части ноды. */
    private renderHeader =
        (treeViewNodeProvideProps: ITreeViewNodeProvideProps) =>
        (accordionHeaderProvideProps: IAccordionHeaderProvideProps) => {
            const { activeNode, openedNode, hasChildNodes, isLastNode } = treeViewNodeProvideProps;
            const { animating } = accordionHeaderProvideProps;
            const { opened: openedProps, renderHeader } = this.props;
            const { controlled } = this.state;

            return renderHeader({
                activeNode,
                animating,
                hasChildNodes,
                isLastNode,
                opened: controlled ? openedProps! : openedNode,
                toggle: this.toggle(treeViewNodeProvideProps),
            });
        };
}
