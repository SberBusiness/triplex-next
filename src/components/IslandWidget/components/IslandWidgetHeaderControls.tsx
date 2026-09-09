import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetHeader.module.less";

/** Свойства компонента IslandWidgetHeaderControls. */
interface IIslandWidgetHeaderControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Блок управления в шапке виджета.
 * Гасит всплытие клика, чтобы взаимодействие с контролами не сворачивало виджет в адаптиве.
 */
export const IslandWidgetHeaderControls: React.FC<IIslandWidgetHeaderControlsProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => {
    const classNames = clsx(styles.islandWidgetHeaderControls, className);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div {...htmlDivAttributes} className={classNames} onClick={handleClick}>
            {children}
        </div>
    );
};

IslandWidgetHeaderControls.displayName = "IslandWidgetHeaderControls";
