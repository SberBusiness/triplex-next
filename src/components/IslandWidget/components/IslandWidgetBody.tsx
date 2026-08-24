import React, { useContext } from "react";
import clsx from "clsx";
import { IslandWidgetContext } from "../IslandWidgetContext";
import { createSizeToClassNameMap } from "../../../utils/classNameMaps";
import styles from "../styles/IslandWidgetBody.module.less";

/** Свойства компонента IslandWidgetBody. */
export interface IIslandWidgetBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

export const IslandWidgetBody: React.FC<IIslandWidgetBodyProps> = ({ children, className, ...htmlDivAttributes }) => {
    const { size } = useContext(IslandWidgetContext);

    return (
        <div {...htmlDivAttributes} className={clsx(styles.islandWidgetBody, SIZE_TO_CLASS_NAME_MAP[size], className)}>
            {children}
        </div>
    );
};

IslandWidgetBody.displayName = "IslandWidgetBody";
