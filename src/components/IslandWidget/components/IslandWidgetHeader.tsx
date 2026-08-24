import React, { useContext } from "react";
import clsx from "clsx";
import { IslandWidgetHeaderControls } from "./IslandWidgetHeaderControls";
import { IslandWidgetHeaderDescription } from "./IslandWidgetHeaderDescription";
import { IslandWidgetHeaderTitle } from "./IslandWidgetHeaderTitle";
import { CaretdownStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { IslandWidgetContext } from "../IslandWidgetContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import styles from "../styles/IslandWidgetHeader.module.less";

/** Свойства компонента IslandWidgetHeader. */
export interface IIslandWidgetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export type TIslandWidgetHeader = React.FC<IIslandWidgetHeaderProps> & {
    Title: typeof IslandWidgetHeaderTitle;
    Controls: typeof IslandWidgetHeaderControls;
    Description: typeof IslandWidgetHeaderDescription;
};

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

export const IslandWidgetHeader: TIslandWidgetHeader = ({ children, className, ...htmlDivAttributes }) => {
    const { adaptive, disableAdaptiveCollapsing, open, size } = useContext(IslandWidgetContext);

    return (
        <div
            {...htmlDivAttributes}
            className={clsx(styles.islandWidgetHeader, SIZE_TO_CLASS_NAME_MAP[size], className, {
                [styles.open]: open,
                [styles.disableAdaptiveCollapsing]: adaptive && disableAdaptiveCollapsing,
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

IslandWidgetHeader.Title = IslandWidgetHeaderTitle;
IslandWidgetHeader.Controls = IslandWidgetHeaderControls;
IslandWidgetHeader.Description = IslandWidgetHeaderDescription;
IslandWidgetHeader.displayName = "IslandWidgetHeader";
