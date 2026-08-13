import React from "react";
import clsx from "clsx";
import styles from "./styles/Body.module.less";

/** Свойства компонента Body. */
export interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Контент тела. */
    children?: React.ReactNode;
}

/**
 * Контейнер основного контента. Корневой элемент — flex-контейнер, внутренняя обёртка растягивает
 * контент на всю доступную ширину. Собственных отступов не задаёт — их добавляет потребитель
 * (например, `BodyPage`, доступный как `Page.Body`).
 */
export const Body = React.forwardRef<HTMLDivElement, IBodyProps>(({ children, className, ...rest }, ref) => (
    <div className={clsx(styles.body, className)} {...rest} data-tx={process.env.npm_package_version} ref={ref}>
        <div className={styles.bodyInner}>{children}</div>
    </div>
));

Body.displayName = "Body";
