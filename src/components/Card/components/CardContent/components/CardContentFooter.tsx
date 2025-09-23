import React from "react";
import clsx from "clsx";
import cardStyles from "../../../styles/Card.module.less";

/** Свойства компонента CardContentFooter. */
interface ICardContentFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Подвал контента карточки. */
export const CardContentFooter: React.FC<ICardContentFooterProps> = ({ children, className, ...rest }) => (
    <div className={clsx(cardStyles.cardContentFooter, className)} {...rest}>
        {children}
    </div>
);

CardContentFooter.displayName = "CardContentFooter";
