import React from "react";
import { IslandAccordionItem } from "./components/IslandAccordionItem";
import clsx from "clsx";
import styles from "./styles/IslandAccordion.module.less";

export interface IIslandAccordionProps extends React.HTMLAttributes<HTMLUListElement> {}

export const IslandAccordion = Object.assign(
    React.forwardRef<HTMLUListElement, IIslandAccordionProps>(({ className, children, ...rest }, ref) => {
        const childArray = React.Children.toArray(children);

        const classNames = clsx(className, styles.islandAccordion);

        return (
            <ul {...rest} className={classNames} data-tx={process.env.npm_package_version} ref={ref}>
                {childArray}
            </ul>
        );
    }),
    {
        Item: IslandAccordionItem,
    },
);

IslandAccordion.displayName = "IslandAccordion";
