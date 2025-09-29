import React from "react";
import clsx from "clsx";
import cardStyles from "../../../styles/Card.module.less";

/** Свойства CardContentHeader. */
interface ICardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Заголовок контента карточки. */
export const CardContentHeader: React.FC<ICardHeaderProps> = ({ children, className, ...rest }) => (
    <div className={clsx(cardStyles.cardContentHeader, className)} {...rest}>
        {children}
    </div>
);

CardContentHeader.displayName = "CardContentHeader";
