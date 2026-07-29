import React from "react";
import clsx from "clsx";
import { Text, ETextSize } from "../../Typography";
import { ButtonBase } from "../../Button/ButtonBase";
import styles from "../styles/PaginationPageButton.module.less";

/** Свойства компонента PaginationPageButton. */
type TPaginationPageButtonProps = {
    /** Является ли страница текущей (активной). */
    isCurrent?: boolean;
    /** Дополнительный CSS-класс. */
    className?: string;
    /** Номер страницы. */
    children: React.ReactNode;
    /** Обработчик клика по странице. */
    onClick: () => void;
};

/** Кнопка-страница пагинации. */
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
