import React from "react";
import { ButtonIcon, IButtonIconProps } from "../../Button/ButtonIcon";
import { EButtonIconShape } from "../../Button/enums";
import { EPaginationNavigationIconDirection } from "../enums";
import CaretleftStrokeSrvIcon24 from "@sberbusiness/icons-next/CaretleftStrokeSrvIcon24";
import styles from "../styles/PaginationNavigationButton.module.less";

/* Свойства компонента PaginationNavigationButton. */
export interface IPaginationNavigationButtonProps extends Omit<IButtonIconProps, "shape" | "active" | "children"> {
    children?: never;
    direction: EPaginationNavigationIconDirection;
}

/* Кнопки-навигация. */
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
