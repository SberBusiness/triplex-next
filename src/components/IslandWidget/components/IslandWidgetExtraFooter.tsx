import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetExtraFooter.module.less";
import { ExpandAnimation } from "../../ExpandAnimation/ExpandAnimation";
import { IslandWidgetLayoutContext } from "../IslandWidgetLayoutContext";

/** Свойства компонента IslandWidgetExtraFooter. */
export interface IIslandWidgetExtraFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контролируемое состояние открытости. По умолчанию false. */
    open?: boolean;
}

/**
 * Дополнительный подвал виджета, раскрывающийся под карточкой.
 * Рендерится вне IslandWidget — внутри общего IslandWidgetWrapper, через который сообщает виджету о своём состоянии.
 */
export const IslandWidgetExtraFooter: React.FC<IIslandWidgetExtraFooterProps> = ({
    children,
    className,
    open = false,
    ...htmlDivAttributes
}) => {
    const { addOpenExtraFooter, removeOpenExtraFooter } = useContext(IslandWidgetLayoutContext);

    useEffect(() => {
        if (!open) {
            return;
        }

        // Регистрируемся в обёртке на всё время, пока подвал раскрыт. Cleanup срабатывает
        // и на закрытии, и на размонтировании — иначе виджет остаётся с тенью под убранным подвалом.
        addOpenExtraFooter();

        return removeOpenExtraFooter;
    }, [open, addOpenExtraFooter, removeOpenExtraFooter]);

    return (
        <div {...htmlDivAttributes} className={clsx(styles.islandWidgetExtraFooter, className)}>
            <ExpandAnimation expanded={open}>{children}</ExpandAnimation>
        </div>
    );
};

IslandWidgetExtraFooter.displayName = "IslandWidgetExtraFooter";
