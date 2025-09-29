import React from "react";
import clsx from "clsx";
import cardStyles from "../../../styles/Card.module.less";

/** Свойства компонента CardContentBody. */
interface ICardContentBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Тело контента карточки. */
export const CardContentBody: React.FC<ICardContentBodyProps> = ({ children, className, ...rest }) => (
    <div className={clsx(cardStyles.cardContentBody, className)} {...rest}>
        {children}
    </div>
);

CardContentBody.displayName = "CardContentBody";
