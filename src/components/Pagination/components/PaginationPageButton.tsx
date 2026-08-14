import React, { useContext } from "react";
import clsx from "clsx";
import { Text, ETextSize } from "../../Typography";
import { ButtonBase } from "../../Button/ButtonBase";
import { MasterTableContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import styles from "../styles/PaginationPageButton.module.less";

/** Свойства компонента PaginationPageButton. */
export interface IPaginationPageButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    /** Является ли страница текущей (активной). */
    isCurrent?: boolean;
    /** Номер страницы. */
    children: React.ReactNode;
    /** Обработчик клика по странице. */
    onClick: () => void;
}

/** Кнопка-страница пагинации. */
export const PaginationPageButton = React.forwardRef<HTMLButtonElement, IPaginationPageButtonProps>(
    ({ isCurrent = false, children, className, disabled, ...rest }, ref) => {
        const { loading } = useContext(MasterTableContext);

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
                disabled={loading || disabled}
                ref={ref}
            >
                <Text size={ETextSize.B3}>{children}</Text>
            </ButtonBase>
        );
    },
);

PaginationPageButton.displayName = "PaginationPageButton";
