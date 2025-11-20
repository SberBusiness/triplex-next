import React from "react";
import clsx from "clsx";
import styles from "./styles/Body.module.less";

/** Свойства компонента Body. */
export interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Отступы сверху и снизу.
     * По-умолчанию 24px, в LightBox следует использовать 16px.
     */
    verticalMargin?: 24 | 16;
}

/**
 * Компонент Body, используется как один из детей(Header, Body и Footer) компонента Page.
 * Используется как контейнер для контента страницы. Имеет дефолтные отступы со всех сторон.
 */
export const Body = React.forwardRef<HTMLDivElement, IBodyProps>(
    ({ children, className, verticalMargin = 24, ...rest }, ref) => (
        <div
            className={clsx(styles.body, className, styles[`verticalMargin${verticalMargin}`])}
            {...rest}
            data-tx={process.env.npm_package_version}
            ref={ref}
        >
            <div className={styles.bodyInner}>{children}</div>
        </div>
    ),
);

Body.displayName = "Body";
