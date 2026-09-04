import React from "react";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownHeader.module.less";

/** Свойства компонента MultiselectFieldDropdownHeader. */
export interface IMultiselectFieldDropdownHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Верхняя фиксированная область выпадающего блока мульти-списка — обычно поле фильтра. */
export const MultiselectFieldDropdownHeader: React.FC<IMultiselectFieldDropdownHeaderProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(styles.multiselectFieldHeader, className)} {...htmlDivAttributes}>
        {children}
    </div>
);
