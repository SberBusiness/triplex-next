import React from "react";
import { clsx } from "clsx";
import styles from "./styles/ChipPanel.module.less";
import { ChipPanelLinks } from "@sberbusiness/triplex-next/components/Table/ChipPanelLinks";
import { IChipPanelProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/**
 * Внутренние составляющие панели табличных фильтров.
 *
 * Явная аннотация снимает проверку лишних свойств у Object.assign, поэтому при добавлении
 * или удалении статики этот интерфейс нужно править синхронно: иначе новая статика окажется
 * в рантайме, но не попадёт в публичный тип, и TypeScript промолчит.
 */
export interface IChipPanelComposition extends React.ForwardRefExoticComponent<
    IChipPanelProps & React.RefAttributes<HTMLDivElement>
> {
    /** Блок со ссылками-действиями панели. */
    Links: typeof ChipPanelLinks;
}

/** Компонент ChipPanel. */
export const ChipPanel: IChipPanelComposition = Object.assign(
    React.forwardRef<HTMLDivElement, IChipPanelProps>(({ children, className, ...htmlDivAttributes }, ref) => (
        <div className={clsx(styles.chipPanel, className)} {...htmlDivAttributes} ref={ref}>
            {children}
        </div>
    )),
    {
        Links: ChipPanelLinks,
    },
);

ChipPanel.displayName = "ChipPanel";
