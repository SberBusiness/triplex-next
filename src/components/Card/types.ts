import React from "react";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";
export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Возможные размеры скругления карточки. */
    roundingSize?: ECardRoundingSize;
    /** Возможные темы оформления карточки. */
    theme: ECardTheme;
}

/** Свойства интерактивной карточки. */
export interface ICardActionProps extends ICardProps {
    /** Обработчик переключения выбора карточки. */
    onToggle?: (selected: boolean) => void;
    /** Контролируемое состояние выбрана/не выбрана. */
    selected?: boolean;
    /** Контролирующая функция состояние выбрана/не выбрана. */
    toggle?: (selected: boolean) => void;
}
