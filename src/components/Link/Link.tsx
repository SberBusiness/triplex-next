import React from "react";
import clsx from "clsx";
import { getSafeRel } from "@sberbusiness/triplex-next/utils/html/anchorSecurity";
import { IconWrapper } from "../IconWrapper";
import styles from "./styles/Link.module.less";

/** Общие свойства компонента Link. */
export interface ILinkCommonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Тело гиперссылки. */
    children: React.ReactNode;
    /** Рендер-функция контента перед телом гиперссылки. Для строкового children приклеивается к первому слову. */
    contentBefore?: () => React.ReactElement;
    /** Рендер-функция контента после тела гиперссылки. Для строкового children приклеивается к последнему слову. */
    contentAfter?: () => React.ReactElement;
}

/** Гиперссылка. */
export const Link = React.forwardRef<HTMLAnchorElement, ILinkCommonProps>(
    ({ children, className, contentAfter, contentBefore, target, rel, ...rest }, ref) => {
        const renderContentBefore = () =>
            contentBefore ? (
                <>
                    {/* Zero-width space необходим для правильного выравнивания контента. */}
                    {"\u200B"}
                    {contentBefore()}
                </>
            ) : null;

        const renderContentAfter = () => (contentAfter ? contentAfter() : null);

        /**
         * Рендерит строковый children, приклеивая contentBefore к первому слову, а contentAfter — к последнему.
         * Слово вместе с контентом оборачивается в неразрывный inline-flex, чтобы контент не отрывался от слова
         * при переносе строки.
         */
        const renderAsSimpleText = (text: string) => {
            const words = text.split(" ");
            // Слов не хватает, чтобы развести contentBefore и contentAfter по разным словам, — текст идёт одним блоком.
            const isSingleBlock =
                words.length < 2 || (words.length < 3 && Boolean(contentBefore) && Boolean(contentAfter));

            if (isSingleBlock) {
                return (
                    <span
                        className={clsx(styles.wordWithContent, {
                            [styles.before]: Boolean(contentBefore),
                            [styles.after]: Boolean(contentAfter),
                        })}
                    >
                        {renderContentBefore()}
                        {text}
                        {renderContentAfter()}
                    </span>
                );
            }

            const firstWord = words[0];
            const lastWord = words[words.length - 1];
            const middleWords = words.slice(1, -1).join(" ");

            const firstNode = contentBefore ? (
                <span className={clsx(styles.wordWithContent, styles.before)}>
                    {renderContentBefore()}
                    {firstWord}
                </span>
            ) : (
                firstWord
            );

            const lastNode = contentAfter ? (
                <span className={clsx(styles.wordWithContent, styles.after)}>
                    {lastWord}
                    {renderContentAfter()}
                </span>
            ) : (
                lastWord
            );

            return (
                <>
                    {firstNode} {middleWords} {lastNode}
                </>
            );
        };

        /** Рендерит нестроковый children, размещая contentBefore и contentAfter по краям. */
        const renderAsReactNode = () => (
            <>
                {contentBefore ? contentBefore() : null}
                {children}
                {contentAfter ? contentAfter() : null}
            </>
        );

        const renderChildren = () => {
            if (!contentBefore && !contentAfter) {
                return children;
            }

            return typeof children === "string" ? renderAsSimpleText(children) : renderAsReactNode();
        };

        return (
            <a
                role="link"
                {...rest}
                target={target}
                // Защита от reverse tabnabbing при target="_blank".
                rel={getSafeRel(target, rel)}
                className={clsx(styles.link, className)}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                <IconWrapper displayContents>{renderChildren()}</IconWrapper>
            </a>
        );
    },
);

Link.displayName = "Link";
