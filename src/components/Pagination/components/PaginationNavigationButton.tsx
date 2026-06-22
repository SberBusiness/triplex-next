import React from "react";
import { ButtonIcon, IButtonIconProps } from "../../Button/ButtonIcon";
import { EButtonIconShape } from "../../Button/enums";
import { EPaginationNavigationIconDirection } from "../enums";
import { CaretleftStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import styles from "../styles/PaginationNavigationButton.module.less";

/** Свойства компонента PaginationNavigationButton. */
export interface IPaginationNavigationButtonProps extends Omit<IButtonIconProps, "shape" | "active" | "children"> {
    /** Кнопка навигации не принимает дочерние элементы — иконка определяется направлением. */
    children?: never;
    /** Направление кнопки навигации (предыдущая или следующая страница). */
    direction: EPaginationNavigationIconDirection;
}

/** Кнопка навигации пагинации (переход к предыдущей или следующей странице). */
export const PaginationNavigationButton = React.forwardRef<HTMLButtonElement, IPaginationNavigationButtonProps>(
    ({ direction, ...rest }, ref) => {
        const isDirectionBack = direction === EPaginationNavigationIconDirection.BACK;

        return (
            <ButtonIcon
                className={styles.paginationNavigationButton}
                shape={EButtonIconShape.SQUIRCLE}
                {...rest}
                ref={ref}
            >
                {isDirectionBack ? (
                    <CaretleftStrokeSrvIcon24 paletteIndex={5} />
                ) : (
                    <CaretleftStrokeSrvIcon24 paletteIndex={5} className={styles.directionIconNext} />
                )}
            </ButtonIcon>
        );
    },
);

PaginationNavigationButton.displayName = "PaginationNavigationButton";
