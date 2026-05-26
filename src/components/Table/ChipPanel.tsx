import React from "react";
import { clsx } from "clsx";
import styles from "./styles/ChipPanel.module.less";
import { ChipPanelLinks } from "@sberbusiness/triplex-next/components/Table/ChipPanelLinks";
import { IChipPanelProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Внутренние составляющие панели табличных фильтров. */
export interface IChipPanelComposition extends React.FC<IChipPanelProps> {
    Links: typeof ChipPanelLinks;
}

/** Компонент ChipPanel. */
export const ChipPanel: IChipPanelComposition = ({ children, className, ...htmlDivAttributes }) => (
    <div className={clsx(styles.chipPanel, className)} {...htmlDivAttributes}>
        {children}
    </div>
);

ChipPanel.Links = ChipPanelLinks;
ChipPanel.displayName = "ChipPanel";
