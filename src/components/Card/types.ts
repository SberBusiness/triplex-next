import React from "react";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";

/** Свойства компонента Card типа Secondary. */
export interface ICardGeneralProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Возможные размеры скругления карточки. */
    roundingSize?: ECardRoundingSize;
    theme: ECardTheme.GENERAL;
}

/** Свойства компонента Card типа Secondary. */
export interface ICardSecondaryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Возможные размеры скругления карточки. */
    roundingSize?: ECardRoundingSize;
    theme: ECardTheme.SECONDARY;
}

/** Свойства компонента Card. */
export type TCardProps = ICardGeneralProps | ICardSecondaryProps;
