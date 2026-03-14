import clsx from "clsx";
import React from "react";
import { Text, ETextSize } from "../../Typography";
import styles from "../styles/PaginationPageEllipsis.module.less";

/* Свойства компонента PaginationPageEllipsis. */
interface IPaginationPageEllipsis extends React.HTMLAttributes<HTMLSpanElement> {}

/* Объединение массива последовательных страниц для удобства производится в элемент многоточие.  */
export const PaginationPageEllipsis = React.forwardRef<HTMLSpanElement, IPaginationPageEllipsis>(
    ({ children, className, ...rest }, ref) => {
        return (
            <Text size={ETextSize.B3} className={clsx(styles.paginationPageEllipsis, className)} {...rest} ref={ref}>
                {children}
            </Text>
        );
    },
);

PaginationPageEllipsis.displayName = "PaginationPageEllipsis";
