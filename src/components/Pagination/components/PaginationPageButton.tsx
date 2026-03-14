import React from "react";
import clsx from "clsx";
import { Text, ETextSize } from "../../Typography";
import { ButtonBase } from "../../Button";
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
            <ButtonBase
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
                <Text size={ETextSize.B3}>{children}</Text>
            </ButtonBase>
        );
    },
);

PaginationPageButton.displayName = "PaginationPageButton";
