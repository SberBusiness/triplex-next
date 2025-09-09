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

        /** Рендер функция последующего контента. */
        const renderContentAfter = () => (contentAfter ? contentAfter() : null);

        /** Рендерит как простой текст. */
        const renderAsSimpleText = (text: string) => {
            const words = text.split(" ");

            if (words.length < 2 || (words.length < 3 && contentAfter)) {
                const className = clsx(styles.wordWithContent, {
                    [styles.after]: Boolean(contentAfter),
                });
                return (
                    <span className={className}>
                        {text}
                        {renderContentAfter()}
                    </span>
                );
            }

            const firstWord = words.slice(0, -1).join(" ");
            const lastWord = words[words.length - 1];

            const classNameAfter = clsx(styles.wordWithContent, {
                [styles.after]: Boolean(contentAfter),
            });

            const lastNode = contentAfter ? (
                <span className={classNameAfter}>
                    {lastWord}
                    {renderContentAfter()}
                </span>
            ) : (
                lastWord
            );

            return (
                <>
                    {firstWord} {lastNode}
                </>
            );
        };

        /** Рендерит как React Nodes. */
        const renderAsReactNode = (node: React.ReactNode) => {
            const firstNode = null;
            const lastNode = contentAfter ? contentAfter() : null;
            return (
                <>
                    {firstNode}
                    {node}
                    {lastNode}
                </>
            );
        };

        const renderContent = (children: React.ReactNode) =>
            typeof children === "string" ? renderAsSimpleText(children) : renderAsReactNode(children);

        const content = contentAfter ? renderContent(children) : children;

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
