import React from "react";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownFooter.module.less";

/** Свойства компонента MultiselectFieldDropdownFooter. */
interface IMultiselectFieldDropdownFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MultiselectFieldDropdownFooter: React.FC<IMultiselectFieldDropdownFooterProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(styles.multiselectFieldFooter, className)} {...htmlDivAttributes}>
        {children}
    </div>
);
