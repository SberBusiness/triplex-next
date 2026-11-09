import React from "react";
import clsx from "clsx";
import { ITreeViewNodeProps, ITreeViewNodeProvideProps } from "../../TreeView/components/TreeViewNode";
import {
    IAccordionBaseProps,
    IAccordionBodyProvideProps,
    IAccordionHeaderProvideProps,
} from "../../AccordionBase/types";
import { TreeView } from "../../TreeView/TreeView";
import { AccordionBase } from "../../AccordionBase/protected/AccordionBase";
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
    /** Содержимое задаётся через renderBody; children не поддерживается. */
    children?: never;
    /** Рендер-функция раскрываемого содержимого ноды (обычно дочерние ноды). */
    renderBody: (props: ICollapsibleTreeExtendedNodeBodyProvideProps) => React.ReactNode;
    /** Рендер-функция видимой (не сворачиваемой) части ноды. */
    renderHeader: (props: ICollapsibleTreeExtendedNodeHeaderProvideProps) => React.ReactNode;
}

/**
 * Нода дерева CollapsibleTreeExtended.
 * Является оберткой TreeView.Node.
 * Раскрываемое содержимое задаётся через renderBody; зарегистрированные дочерние ноды оборачиваются в TreeView.Group.
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
        const { opened: openedProp, onToggle, renderBody, renderHeader, toggle, ...treeNodeProps } = this.props;

        return (
            <TreeView.Node opened={openedProp} {...treeNodeProps}>
                {({ activeNode, hasChildNodes, isLastNode, openedNode, setOpenedNode }) => {
                    // Controlled-состояние из props, иначе — состояние текущей ноды TreeView.
                    const opened = openedProp !== undefined ? openedProp : openedNode;
                    // Общие provide-props для renderBody и renderHeader.
                    const nodeProps = { activeNode, hasChildNodes, opened, toggle: this.createToggle(setOpenedNode) };

                    return (
                        <AccordionBase
                            expandAnimationClassName={clsx(styles.collapsibleTreeExtendedNodeContent, {
                                collapsed: !opened,
                            })}
                            renderBody={({ animating }) => {
                                const body = renderBody({ ...nodeProps, animating });
                                // Внутренние ноды оборачиваются дополнительным тегом.
                                return hasChildNodes ? <TreeView.Group>{body}</TreeView.Group> : body;
                            }}
                            renderHeader={({ animating }) => renderHeader({ ...nodeProps, animating, isLastNode })}
                            isOpen={opened}
                            onToggle={onToggle}
                        />
                    );
                }}
            </TreeView.Node>
        );
    }

    /**
     * Создаёт функцию смены состояния ноды — раскрыта/свернута.
     * В controlled-режиме делегирует в `props.toggle`, в uncontrolled — переключает внутреннее состояние TreeView.
     */
    private createToggle(
        setOpenedNode: ITreeViewNodeProvideProps["setOpenedNode"],
    ): ICollapsibleTreeExtendedNodeHeaderProvideProps["toggle"] {
        return (nextOpened) => {
            const { opened, toggle } = this.props;

            if (opened === undefined) {
                setOpenedNode(nextOpened);
            } else {
                // props.opened до перерендера устаревший — не сравниваем.
                toggle?.(nextOpened);
            }
        };
    }
}
