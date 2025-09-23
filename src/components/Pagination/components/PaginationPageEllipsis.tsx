import clsx from "clsx";
import React from "react";
import styles from "../styles/PaginationPageEllipsis.module.less";

/* Свойства компонента PaginationPageEllipsis. */
interface IPaginationPageEllipsis extends React.HTMLAttributes<HTMLSpanElement> {}

/* Объединение массива последовательных страниц для удобства производится в элемент многоточие.  */
export const PaginationPageEllipsis = React.forwardRef<HTMLSpanElement, IPaginationPageEllipsis>(
    ({ children, className, ...rest }, ref) => {
        return (
            <span className={clsx(styles.pageEllipsis, className)} {...rest} ref={ref}>
                {children}
            </span>
        );
    },
);

PaginationPageEllipsis.displayName = "PaginationPageEllipsis";
