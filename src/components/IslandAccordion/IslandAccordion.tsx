import React from "react";
import { IslandAccordionItem, IIslandAccordionItemProps } from "./components/IslandAccordionItem";
import clsx from "clsx";
import styles from "./styles/IslandAccordion.module.less";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import { glueFunctions } from "../../utils/glueFunctions";

export interface IIslandAccordionProps extends React.HTMLAttributes<HTMLUListElement> {
    /** Обработчик открытия/закрытия вкладки. */
    onToggle?: (newOpened: boolean, id: string) => void;
    /** Обработчик удаления вкладки. */
    onRemove?: (id: string) => void;
    /** Размер компонента. */
    size?: EComponentSize;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const IslandAccordion = Object.assign(
    React.forwardRef<HTMLUListElement, IIslandAccordionProps>(
        ({ className, onRemove, onToggle, children, size = EComponentSize.MD, ...rest }, ref) => {
            const childArray = React.Children.toArray(children);

            const renderChildren = childArray.map((child, index) => {
                if (!React.isValidElement<IIslandAccordionItemProps>(child)) {
                    return child;
                }

                const id = child.props.id ?? index.toString();
                const key = child.props.id ?? index;
                const num = child.props.num ?? index + 1;

                return React.cloneElement(child, {
                    id,
                    num,
                    onToggle: glueFunctions(child.props.onToggle, onToggle),
                    onRemove: glueFunctions(child.props.onRemove, onRemove),
                    key,
                    size,
                });
            });

            const classNames = clsx(className, styles.islandAccordion, sizeToClassNameMap[size]);

            return (
                <ul {...rest} className={classNames} data-tx={process.env.npm_package_version} ref={ref}>
                    {renderChildren}
                </ul>
            );
        },
    ),
    {
        Item: IslandAccordionItem,
    },
);

IslandAccordion.displayName = "IslandAccordion";
