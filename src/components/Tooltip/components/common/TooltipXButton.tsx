import React, { useContext } from "react";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { TooltipContext } from "@sberbusiness/triplex-next/components/Tooltip/TootlipContext";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { ITooltipXButtonProps } from "@sberbusiness/triplex-next/components/Tooltip/types";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipDesktop.module.less";
import { SkinContext } from "../../../SkinProvider/SkinContext";

/** Кнопка закрытия Tooltip. */
export const TooltipXButton: React.FC<ITooltipXButtonProps> = ({ onClick, ...rest }) => {
    const { setTooltipOpen } = useContext(TooltipContext);
    const wordArt = useContext(SkinContext) === "wordart";

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setTooltipOpen(false);
        onClick?.(event);
    };

    return (
        <ButtonIcon className={styles.tooltipXButton} onClick={handleClick} {...rest}>
            <CrossStrokeSrvIcon16 paletteIndex={wordArt ? 5 : 6} />
        </ButtonIcon>
    );
};
