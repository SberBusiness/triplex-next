import React from "react";
import { IslandAccordionItem, IIslandAccordionItemProps } from "./components/IslandAccordionItem";
import clsx from "clsx";
import styles from "./styles/IslandAccordion.module.less";

export interface IIslandAccordionProps extends React.HTMLAttributes<HTMLUListElement> {}

export const IslandAccordion = Object.assign(
    React.forwardRef<HTMLUListElement, IIslandAccordionProps>(({ className, children, ...rest }, ref) => {
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
                key,
            });
        });

        const classNames = clsx(className, styles.islandAccordion);

        return (
            <ul {...rest} className={classNames} data-tx={process.env.npm_package_version} ref={ref}>
                {renderChildren}
            </ul>
        );
    }),
    {
        Item: IslandAccordionItem,
    },
);

IslandAccordion.displayName = "IslandAccordion";
