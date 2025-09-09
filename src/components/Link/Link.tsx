import React, { useState } from "react";
import clsx from "clsx";
import { ELinkSize } from "./enums";
import styles from "./styles/Link.module.less";

/** Общие свойства компонента Link. */
interface ILinkCommonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Размер текста. */
    size: ELinkSize;
    /** Тело гиперссылки. */
    children: React.ReactNode;
    /** Рендер функция последующего контента. */
    contentAfter?: () => JSX.Element;
}

/** Гиперссылка. */
export const Link = React.forwardRef<HTMLAnchorElement, ILinkCommonProps>(
    ({ children, className, size, onBlur, onMouseDown, contentAfter, ...rest }, ref) => {
        const [focusedByClick, setFocusedByClick] = useState(false);

        /** Обработчик нажатия мыши. */
        const handleMouseDown = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onMouseDown?.(event);
            setFocusedByClick(true);
        };

        /** Обработчик потери фокуса. */
        const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
            onBlur?.(event);
            if (event.target !== document.activeElement) {
                setFocusedByClick(false);
            }
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

            const firstWord = words[0];
            const lastWord = words[words.length - 1];
            const restWords = words.slice(1, -1).join(" ");

            const firstNode = firstWord;

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
                className={clsx(className, styles.link, "hoverable", {
                    [styles.focusVisible]: !focusedByClick,
                    [styles.lg]: size === ELinkSize.LG,
                    [styles.sm]: size === ELinkSize.SM,
                    [styles.text]: true,
                })}
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
