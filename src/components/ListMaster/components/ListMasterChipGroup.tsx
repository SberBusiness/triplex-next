import React from "react";
import { ChipGroup } from "@sberbusiness/triplex-next/components/ChipGroup/ChipGroup";
import clsx from "clsx";
import styles from "../styles/ListMasterChipGroup.module.less";

/** Свойства компонента ListMasterChipGroup. */
export interface IListMasterChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Обёртка над `ChipGroup` с фиксированным `oneLine={true}` и горизонтальными
 * отступами 16px — чтобы группа фильтров в ListMaster всегда помещалась в одну
 * строку с горизонтальной прокруткой.
 */
export const ListMasterChipGroup = React.forwardRef<HTMLDivElement, IListMasterChipGroupProps>(
    ({ children, className, ...rest }, ref) => (
        <ChipGroup className={clsx(styles.listMasterChipGroup, className)} oneLine {...rest} ref={ref}>
            {children}
        </ChipGroup>
    ),
);

ListMasterChipGroup.displayName = "ListMasterChipGroup";
