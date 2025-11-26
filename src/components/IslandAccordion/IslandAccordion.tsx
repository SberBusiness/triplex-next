import React from "react";
import { IslandAccordionItem } from "./components/IslandAccordionItem";
import { IslandAccordionContext } from "./IslandAccordionContext";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EIslandType, IIslandProps } from "../Island";
import clsx from "clsx";
import styles from "./styles/IslandAccordion.module.less";

export interface IIslandAccordionProps extends React.HTMLAttributes<HTMLUListElement>, Pick<IIslandProps, "type"> {
    size?: EComponentSize;
}

export const IslandAccordion = Object.assign(
    React.forwardRef<HTMLUListElement, IIslandAccordionProps>(
        ({ className, children, size = EComponentSize.MD, type = EIslandType.TYPE_1, ...rest }, ref) => {
            const classNames = clsx(className, styles.islandAccordion);

            return (
                <IslandAccordionContext.Provider value={{ size, type }}>
                    <ul {...rest} className={classNames} data-tx={process.env.npm_package_version} ref={ref}>
                        {children}
                    </ul>
                </IslandAccordionContext.Provider>
            );
        },
    ),
    {
        Item: IslandAccordionItem,
    },
);

IslandAccordion.displayName = "IslandAccordion";
