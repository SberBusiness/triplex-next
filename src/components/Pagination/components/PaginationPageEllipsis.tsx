import clsx from "clsx";
import React from "react";
import { Text, ETextSize } from "../../Typography";
import styles from "../styles/PaginationPageEllipsis.module.less";

/** Свойства компонента PaginationPageEllipsis. */
interface IPaginationPageEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** Многоточие, заменяющее группу последовательных скрытых страниц в навигации. */
export const PaginationPageEllipsis = React.forwardRef<HTMLSpanElement, IPaginationPageEllipsisProps>(
    ({ children, className, ...rest }, ref) => {
        return (
            <Text size={ETextSize.B3} className={clsx(styles.paginationPageEllipsis, className)} {...rest} ref={ref}>
                {children}
            </Text>
        );
    },
);

PaginationPageEllipsis.displayName = "PaginationPageEllipsis";
