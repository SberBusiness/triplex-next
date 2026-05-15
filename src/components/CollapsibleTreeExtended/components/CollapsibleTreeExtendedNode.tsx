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

/** Свойства, передаваемые CollapsibleTreeExtendedNode в рендер-функцию renderBody. */
export interface ICollapsibleTreeExtendedNodeBodyProvideProps
    extends
        Pick<IAccordionBodyProvideProps, "animating">,
        Pick<ITreeViewNodeProvideProps, "activeNode" | "hasChildNodes"> {
    /** Текущая нода раскрыта. */
    opened: boolean;
    /** Функция смены значения opened. */
    toggle: (opened: boolean) => void;
}

/** Свойства, передаваемые CollapsibleTreeExtendedNode в рендер-функцию renderHeader. */
export interface ICollapsibleTreeExtendedNodeHeaderProvideProps
    extends
        Pick<IAccordionHeaderProvideProps, "animating">,
        Pick<ITreeViewNodeProvideProps, "activeNode" | "hasChildNodes" | "isLastNode"> {
    /** Текущая нода раскрыта. */
    opened: boolean;
    /** Функция смены значения opened. */
    toggle: (opened: boolean) => void;
}

/** Свойства CollapsibleTreeExtendedNode. */
export interface ICollapsibleTreeExtendedNodeProps
    extends Omit<ITreeViewNodeProps, "children">, Pick<IAccordionBaseProps, "onToggle" | "toggle"> {
    children?: never;
    /** Рендер-функция раскрываемого содержимого ноды (обычно дочерние ноды). */
    renderBody: (props: ICollapsibleTreeExtendedNodeBodyProvideProps) => React.ReactNode;
    /** Рендер-функция видимой (не сворачиваемой) части ноды. */
    renderHeader: (props: ICollapsibleTreeExtendedNodeHeaderProvideProps) => React.ReactNode;
}

/**
 * Нода дерева CollapsibleTreeExtended.
 * Является оберткой TreeView.Node.
 * Сворачиваться/разворачиваться может только если есть дочерние ноды. Они передаются в renderBody.
 *
 * Поддерживает controlled и uncontrolled режим:
 * - если `opened` передан (`!== undefined`) — нода контролируемая, состояние раскрытия читается из props,
 *   а toggle делегируется в `props.toggle`;
 * - если `opened === undefined` — нода неконтролируемая, состояние раскрытия хранит TreeView через `setOpenedNode`.
 *
 * Режим вычисляется на каждом рендере, поэтому переход controlled ↔ uncontrolled во время жизни ноды поддерживается.
 */
export class CollapsibleTreeExtendedNode extends React.Component<ICollapsibleTreeExtendedNodeProps> {
    public static displayName = "CollapsibleTreeExtendedNode";

    public render(): JSX.Element {
        const { opened: openedProps, onToggle, renderBody, renderHeader, toggle, ...treeNodeProps } = this.props;
        const controlled = openedProps !== undefined;

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
     * Изменяет состояние ноды — раскрыта/свернута.
     * В controlled-режиме делегирует в `props.toggle`, в uncontrolled — переключает внутреннее состояние TreeView.
     * Эта функция передается дочерним компонентам и вызывается из них.
     */
    private toggle =
        ({ openedNode, setOpenedNode }: ITreeViewNodeProvideProps) =>
        (nextOpened: boolean) => {
            const { opened: openedProps, toggle } = this.props;
            const controlled = openedProps !== undefined;
            const opened = controlled ? openedProps : openedNode;

            if (opened === nextOpened) {
                return;
            }

            if (controlled) {
                toggle?.(nextOpened);
            } else {
                setOpenedNode(nextOpened);
            }
        };

    /** Рендер-функция для передачи дочерних нод. */
    private renderBody =
        (treeViewNodeProvideProps: ITreeViewNodeProvideProps) =>
        (accordionBodyProvideProps: IAccordionBodyProvideProps) => {
            const { activeNode, openedNode, hasChildNodes } = treeViewNodeProvideProps;
            const { animating } = accordionBodyProvideProps;
            const { opened: openedProps, renderBody } = this.props;
            const controlled = openedProps !== undefined;
            const opened = controlled ? openedProps : openedNode;

            const bodyProps: ICollapsibleTreeExtendedNodeBodyProvideProps = {
                activeNode,
                animating,
                hasChildNodes,
                opened,
                toggle: this.toggle(treeViewNodeProvideProps),
            };

            // Внутренние ноды оборачиваются дополнительным тегом.
            if (hasChildNodes) {
                return <TreeView.Group>{renderBody(bodyProps)}</TreeView.Group>;
            }

            return renderBody(bodyProps);
        };

    /** Рендер-функция не сворачиваемой части ноды. */
    private renderHeader =
        (treeViewNodeProvideProps: ITreeViewNodeProvideProps) =>
        (accordionHeaderProvideProps: IAccordionHeaderProvideProps) => {
            const { activeNode, openedNode, hasChildNodes, isLastNode } = treeViewNodeProvideProps;
            const { animating } = accordionHeaderProvideProps;
            const { opened: openedProps, renderHeader } = this.props;
            const controlled = openedProps !== undefined;
            const opened = controlled ? openedProps : openedNode;

            return renderHeader({
                activeNode,
                animating,
                hasChildNodes,
                isLastNode,
                opened,
                toggle: this.toggle(treeViewNodeProvideProps),
            });
        };
}
