import React from "react";
import { ICardProps } from "@sberbusiness/triplex-next/components/Card/types";
import { CardContent } from "@sberbusiness/triplex-next/components/Card/components/CardContent/CardContent";
import { CardMedia } from "@sberbusiness/triplex-next/components/Card/components/CardMedia";
import {
    mapCardRoundingSizeToCssClass,
    mapCardThemeToCssClass,
} from "@sberbusiness/triplex-next/components/Card/utils";
import clsx from "clsx";
import cardStyles from "./styles/Card.module.less";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";

/** Внутренние составляющие статичной карточки. */
interface ICardStaticComposition {
    /** Контент карточки. */
    Content: typeof CardContent;
    /** Медийный элемент карточки. */
    Media: typeof CardMedia;
}

/** Компонент "Статичная карточка". */
export const CardStatic: React.FC<ICardProps> & ICardStaticComposition = ({
    children,
    className,
    roundingSize = ECardRoundingSize.MD,
    theme = ECardTheme.GENERAL,
    ...rest
}) => (
    <div
        className={clsx(
            cardStyles.card,
            mapCardThemeToCssClass[theme],
            mapCardRoundingSizeToCssClass[roundingSize],
            className,
        )}
        {...rest}
        data-tx={process.env.npm_package_version}
    >
        {children}
    </div>
);

CardStatic.Content = CardContent;
CardStatic.Media = CardMedia;
CardStatic.displayName = "CardStatic";
