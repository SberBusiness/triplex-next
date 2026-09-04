import React from "react";
import clsx from "clsx";
import styles from "../styles/MultiselectFieldDropdownFooter.module.less";

/** Свойства компонента MultiselectFieldDropdownFooter. */
export interface IMultiselectFieldDropdownFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Нижняя фиксированная область выпадающего блока мульти-списка — обычно кнопки подтверждения. Отделена разделителем. */
export const MultiselectFieldDropdownFooter: React.FC<IMultiselectFieldDropdownFooterProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <div className={clsx(styles.multiselectFieldFooter, className)} {...htmlDivAttributes}>
        {children}
    </div>
);
