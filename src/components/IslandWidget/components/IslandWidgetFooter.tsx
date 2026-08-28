import React, { useContext } from "react";
import clsx from "clsx";
import { IslandWidgetContext } from "../IslandWidgetContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import { IslandWidgetFooterContent } from "./IslandWidgetFooterContent";
import { IslandWidgetFooterControls } from "./IslandWidgetFooterControls";
import styles from "../styles/IslandWidgetFooter.module.less";

/** Свойства компонента IslandWidgetFooter. */
export interface IIslandWidgetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

export type TIslandWidgetFooter = React.FC<IIslandWidgetFooterProps> & {
    Content: typeof IslandWidgetFooterContent;
    Controls: typeof IslandWidgetFooterControls;
};

export const IslandWidgetFooter: TIslandWidgetFooter = ({ children, className, ...htmlDivAttributes }) => {
    const { size } = useContext(IslandWidgetContext);

    return (
        <div
            {...htmlDivAttributes}
            className={clsx(styles.islandWidgetFooter, SIZE_TO_CLASS_NAME_MAP[size], className)}
        >
            {children}
        </div>
    );
};

IslandWidgetFooter.Content = IslandWidgetFooterContent;
IslandWidgetFooter.Controls = IslandWidgetFooterControls;
IslandWidgetFooter.displayName = "IslandWidgetFooter";
