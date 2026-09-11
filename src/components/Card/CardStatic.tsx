import React from "react";
import clsx from "clsx";
import { CardContent } from "@sberbusiness/triplex-next/components/Card/components/CardContent/CardContent";
import { CardMedia } from "@sberbusiness/triplex-next/components/Card/components/CardMedia";
import { ECardRoundingSize, ECardTheme } from "@sberbusiness/triplex-next/components/Card/enums";
import { ICardProps } from "@sberbusiness/triplex-next/components/Card/types";
import {
    mapCardRoundingSizeToCssClass,
    mapCardThemeToCssClass,
} from "@sberbusiness/triplex-next/components/Card/utils";
import cardStyles from "./styles/Card.module.less";

/** Внутренние составляющие статичной карточки. */
interface ICardStaticComposition {
    /** Контент карточки. */
    Content: typeof CardContent;
    /** Медийный элемент карточки. */
    Media: typeof CardMedia;
}

const CardStaticRoot = React.forwardRef<HTMLDivElement, ICardProps>(
    ({ children, className, roundingSize = ECardRoundingSize.MD, theme = ECardTheme.GENERAL, ...rest }, ref) => (
        <div
            className={clsx(
                cardStyles.card,
                mapCardThemeToCssClass[theme],
                mapCardRoundingSizeToCssClass[roundingSize],
                className,
            )}
            {...rest}
            ref={ref}
            data-tx={process.env.npm_package_version}
        >
            {children}
        </div>
    ),
);

CardStaticRoot.displayName = "CardStatic";

/**
 * Компонент "Статичная карточка".
 * Информационный контейнер без состояния выбора и клавиатурной активации.
 * Содержимое собирается из составных частей CardStatic.Media и CardStatic.Content.
 */
export const CardStatic = Object.assign(CardStaticRoot, {
    Content: CardContent,
    Media: CardMedia,
} satisfies ICardStaticComposition);
