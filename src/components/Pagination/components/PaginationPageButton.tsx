import React from "react";
import clsx from "clsx";
import styles from "../styles/PaginationPageButton.module.less";

/* Свойства компонента PaginationPageButton. */
type TPaginationPageButtonProps = {
    isCurrent?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick: () => void;
};

/* Кнопки-страницы.  */
export const PaginationPageButton = React.forwardRef<HTMLButtonElement, TPaginationPageButtonProps>(
    ({ isCurrent = false, children, className, ...rest }, ref) => {
        return (
            <button
                className={clsx(
                    styles.paginationPageButton,
                    {
                        [styles.currentPage]: isCurrent,
                    },
                    className,
                )}
                aria-live={isCurrent ? "polite" : undefined}
                {...rest}
                ref={ref}
            >
                {children}
            </button>
        );
    },
);

PaginationPageButton.displayName = "PaginationPageButton";
