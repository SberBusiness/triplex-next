import React, { useContext } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetHeader.module.less";
import { IslandWidgetHeaderContent } from "./IslandWidgetHeaderContent";
import { IslandWidgetHeaderDescription } from "./IslandWidgetHeaderDescription";
import { CaretdownStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { IslandWidgetContext } from "../IslandWidgetContext";

/** Свойства компонента IslandWidgetHeader. */
export interface IIslandWidgetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export type TIslandWidgetHeader = React.FC<IIslandWidgetHeaderProps> & {
    Content: typeof IslandWidgetHeaderContent;
    Description: typeof IslandWidgetHeaderDescription;
};

export const IslandWidgetHeader: TIslandWidgetHeader = ({ children, className, ...htmlDivAttributes }) => {
    const { adaptive, disableAdaptiveCollapsing, open } = useContext(IslandWidgetContext);

    return (
        <div
            {...htmlDivAttributes}
            className={clsx(className, styles.islandWidgetHeader, {
                [styles.open]: open,
            })}
        >
            {children}
            {adaptive && !disableAdaptiveCollapsing && (
                <span className={clsx(styles.caretWrapper)}>
                    <CaretdownStrokeSrvIcon24 className={styles.caretIcon} aria-hidden="true" paletteIndex={5} />
                </span>
            )}
        </div>
    );
};

IslandWidgetHeader.Content = IslandWidgetHeaderContent;
IslandWidgetHeader.Description = IslandWidgetHeaderDescription;
IslandWidgetHeader.displayName = "IslandWidgetHeader";
