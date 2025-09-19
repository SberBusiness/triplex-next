import React from "react";
import clsx from "clsx";
import styles from "../../styles/HeaderTitle.module.less";

/** Свойства компонента HeaderTitleControls. */
export interface IHeaderTitleControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Блок с кнопками действий HeaderTitle. */
export const HeaderTitleControls = React.forwardRef<HTMLDivElement, IHeaderTitleControlsProps>(
    ({ children, className, ...rest }, ref) => (
        <div className={clsx(styles.headerTitleControls, className)} {...rest} ref={ref}>
            {children}
        </div>
    ),
);

HeaderTitleControls.displayName = "HeaderTitleControls";
