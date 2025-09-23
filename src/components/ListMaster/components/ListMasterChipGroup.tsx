import React from "react";
// import { ChipGroup, IChipGroupProps } from "@sberbusiness/triplex-next/components/ChipGroup/ChipGroup";
import clsx from "clsx";
import styles from "../styles/ListMasterChipGroup.module.less";
/** Обертка над Chips, добавляющая горизонтальные отступы контейнеру. */
export const ListMasterChipGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...rest }, ref) => (
        // <ChipGroup className={clsx("cssClass[listMasterChipGroup]", className)} oneLine {...rest} ref={ref}>
        //     {children}
        // </ChipGroup>
        <div className={clsx(styles.listMasterChipGroup, className)} ref={ref}>{children}</div>
    )
);

ListMasterChipGroup.displayName = "ListMasterChips";
