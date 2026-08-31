import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderTitle.module.less";

/** Свойства компонента HeaderTitleControls. */
export interface IHeaderTitleControlsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Кнопки действий. */
    children?: React.ReactNode;
}

/** Блок с кнопками действий HeaderTitle. Прижат вправо, не сжимается. */
export const HeaderTitleControls = React.forwardRef<HTMLDivElement, IHeaderTitleControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div
            className={clsx(styles.headerTitleControls, styles["global-HeaderTitleControls"], className)}
            {...rest}
            ref={ref}
        >
            {children}
        </div>
    ),
);

HeaderTitleControls.displayName = "HeaderTitleControls";
