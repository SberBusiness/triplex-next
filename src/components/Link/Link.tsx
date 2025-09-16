import React from "react";
import clsx from "clsx";
import styles from "./styles/Link.module.less";

/** Общие свойства компонента Link. */
interface ILinkCommonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Тело гиперссылки. */
    children: React.ReactNode;
    /** Рендер функция последующего контента. */
    contentAfter?: () => JSX.Element;
}

/** Гиперссылка. */
export const Link = React.forwardRef<HTMLAnchorElement, ILinkCommonProps>(
    ({ children, className, onBlur, onMouseDown, contentAfter, ...rest }, ref) => {
        /** Обработчик нажатия мыши. */
        const handleMouseDown = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onMouseDown?.(event);
        };

        /** Обработчик потери фокуса. */
        const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
            onBlur?.(event);
        };

        /** Рендерит как React Nodes. */
        const renderAsReactNode = (node: React.ReactNode) => {
            const childNode = node;
            const contentAfterNode = contentAfter ? <span className={styles.after}>{contentAfter()}</span> : null;

            return (
                <>
                    {childNode}
                    {contentAfterNode}
                </>
            );
        };

        const content = contentAfter ? renderAsReactNode(children) : children;

        return (
            <a
                role="link"
                {...rest}
                className={clsx(className, styles.link, "hoverable")}
                onBlur={handleBlur}
                onMouseDown={handleMouseDown}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {content}
            </a>
        );
    },
);

Link.displayName = "Link";
