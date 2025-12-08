import React from "react";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownHeader.module.less";

/** Свойства компонента MultiselectFieldDropdownHeader. */
interface IMultiselectFieldDropdownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectFieldDropdownHeader: React.FC<IMultiselectFieldDropdownHeaderProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(styles.multiselectFieldHeader, className)} {...htmlDivAttributes}>
        {children}
    </div>
);
