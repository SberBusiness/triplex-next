import React from "react";
import clsx from "clsx";

/** Свойства компонента IslandWidgetHeaderContent. */
interface IIslandWidgetHeaderContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Обёртка содержимого шапки виджета.
 * Собственных стилей не несёт — раскладку задаёт родительская шапка, а оформление приходит через className.
 */
export const IslandWidgetHeaderContent: React.FC<IIslandWidgetHeaderContentProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div {...htmlDivAttributes} className={clsx(className)}>
        {children}
    </div>
);

IslandWidgetHeaderContent.displayName = "IslandWidgetHeaderContent";
