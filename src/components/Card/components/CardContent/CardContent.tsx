import React from "react";
import { CardContentBody } from "@sberbusiness/triplex-next/components/Card/components/CardContent/components/CardContentBody";
import { CardContentHeader } from "@sberbusiness/triplex-next/components/Card/components/CardContent/components/CardContentHeader";
import { CardContentFooter } from "@sberbusiness/triplex-next/components/Card/components/CardContent/components/CardContentFooter";
import { ECardContentPaddingSize } from "@sberbusiness/triplex-next/components/Card/enums";
import clsx from "clsx";
import cardStyles from "../../styles/Card.module.less";

/** Внутренние составляющие компонента CardContent. */
export interface ICardContentComposition {
    /** Тело карточки. */
    Body: typeof CardContentBody;
    /** Заголовок карточки. */
    Header: typeof CardContentHeader;
    /** Подвал карточки. */
    Footer: typeof CardContentFooter;
}

/** Соответствие размера внутреннего отступа карточки стилевому классу. */
const mapCardContentPaddingSizeToCssClass = {
    [ECardContentPaddingSize.MD]: cardStyles.paddingMD,
    [ECardContentPaddingSize.SM]: cardStyles.paddingSM,
};

/** Свойства компонента CardContent. */
export interface ICardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер внутреннего отступа контента карточки. */
    paddingSize?: ECardContentPaddingSize;
}

/** Контент карточки. */
export const CardContent: React.FC<ICardContentProps> & ICardContentComposition = ({
    children,
    className,
    paddingSize = ECardContentPaddingSize.MD,
    ...rest
}) => (
    <div
        className={clsx(cardStyles.cardContent, mapCardContentPaddingSizeToCssClass[paddingSize], className)}
        {...rest}
    >
        {children}
    </div>
);

CardContent.Body = CardContentBody;
CardContent.Header = CardContentHeader;
CardContent.Footer = CardContentFooter;
CardContent.displayName = "CardContent";
