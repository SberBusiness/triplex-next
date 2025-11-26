import React from "react";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownContent.module.less";

/** Свойства компонента MultiselectFieldDropdownContent. */
interface IMultiselectFieldDropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectFieldDropdownContent: React.FC<IMultiselectFieldDropdownContentProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(styles.multiselectFieldContentWrapper, className)} {...htmlDivAttributes}>
        <div tabIndex={-1} className={styles.multiselectFieldContent}>
            {children}
        </div>
    </div>
);
