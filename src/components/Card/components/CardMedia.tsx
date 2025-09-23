import React from "react";
import clsx from "clsx";
import cardStyles from "../styles/Card.module.less";

/** Свойства компонента CardMedia. */
export interface ICardMediaProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Медийный элемент карточки. */
export const CardMedia: React.FC<ICardMediaProps> = ({ children, className, ...attributes }) => {
    const classNames = clsx(cardStyles.cardMedia, className);

    return (
        <div className={classNames} {...attributes}>
            {children}
        </div>
    );
};

CardMedia.displayName = "CardMedia";
