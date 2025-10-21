import React from "react";
import clsx from "clsx";
import styles from "./styles/Link.module.less";

/** Общие свойства компонента Link. */
export interface ILinkCommonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Тело гиперссылки. */
    children: React.ReactNode;
    /** Рендер функция предшествующего контента. */
    contentBefore?: () => React.ReactElement;
    /** Рендер функция последующего контента. */
    contentAfter?: () => React.ReactElement;
}

/** Гиперссылка. */
export const Link = React.forwardRef<HTMLAnchorElement, ILinkCommonProps>(
    ({ children, className, onBlur, onMouseDown, contentAfter, contentBefore, ...rest }, ref) => {
        /** Рендер функция предшествующего контента. */
        const renderContentBefore = () =>
            contentBefore ? (
                <>
                    {/* Zero-width space необходим для правильного выравнивания контента. */}
                    {"\u200B"}
                    {contentBefore()}
                </>
            ) : null;

        /** Рендер функция последующего контента. */
        const renderContentAfter = () => (contentAfter ? contentAfter() : null);

        const renderAsSimpleText = (text: string) => {
            const words = text.split(" ");

            if (words.length < 2 || (words.length < 3 && contentBefore && contentAfter)) {
                const className = clsx(styles.wordWithContent, {
                    [styles.after]: Boolean(contentAfter),
                    [styles.before]: Boolean(contentBefore),
                });
                return (
                    <span className={className}>
                        {renderContentBefore()}
                        {text}
                        {renderContentAfter()}
                    </span>
                );
            }

            const firstWord = words[0];
            const lastWord = words[words.length - 1];
            const restWords = words.slice(1, -1).join(" ");

            const classNameBefore = clsx(styles.wordWithContent, {
                [styles.before]: Boolean(contentBefore),
            });

            const firstNode = contentBefore ? (
                <span className={classNameBefore}>
                    {renderContentBefore()}
                    {firstWord}
                </span>
            ) : (
                firstWord
            );

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
                    {firstNode} {restWords} {lastNode}
                </>
            );
        };

        /** Рендерит как React Nodes. */
        const renderAsReactNode = (node: React.ReactNode) => {
            const firstNode = contentBefore ? contentBefore() : null;
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

        const content = contentBefore || contentAfter ? renderContent(children) : children;

        return (
            <a
                role="link"
                {...rest}
                className={clsx(className, styles.link, "hoverable")}
                onBlur={onBlur}
                onMouseDown={onMouseDown}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {content}
            </a>
        );
    },
);

Link.displayName = "Link";
