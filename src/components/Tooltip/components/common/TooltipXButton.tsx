import React, { useContext } from "react";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipDesktop.module.less";

/** Свойства компонента TooltipXButton. */
export interface ITooltipXButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Дочерние элементы. */
    children?: never;
}

/** Кнопка закрытия Tooltip. */
export const TooltipXButton: React.FC<ITooltipXButtonProps> = ({ onClick, ...rest }) => {
    const { setTooltipOpen } = useContext(TooltipContext);

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTooltipOpen(false);
        onClick?.(event);
    };

    return (
        <ButtonIcon className={styles.tooltipXButton} onClick={handleClick} {...rest}>
            <CrossStrokeSrvIcon16 paletteIndex={6} />
        </ButtonIcon>
    );
};
