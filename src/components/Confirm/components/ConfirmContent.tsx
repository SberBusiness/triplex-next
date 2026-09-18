import React from "react";
import { ConfirmContentSubTitle } from "./ConfirmContentSubTitle";
import { ConfirmContentTitle } from "./ConfirmContentTitle";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

/** Свойства компонента ConfirmContent. */
export interface IConfirmContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Тип компонента "Содержимое предупреждения" со статическими субкомпонентами.
 *
 * Явная аннотация снимает проверку лишних свойств у Object.assign, поэтому при добавлении
 * или удалении статики этот интерфейс нужно править синхронно: иначе новая статика окажется
 * в рантайме, но не попадёт в публичный тип, и TypeScript промолчит.
 */
export interface IConfirmContentFC extends React.ForwardRefExoticComponent<
    IConfirmContentProps & React.RefAttributes<HTMLDivElement>
> {
    /** Заголовок предупреждения. */
    Title: typeof ConfirmContentTitle;
    /** Подзаголовок предупреждения. */
    SubTitle: typeof ConfirmContentSubTitle;
}

/**
 * Содержимое предупреждения — обёртка заголовка и подзаголовка.
 * Задаёт отступ до блока кнопок и место под кнопку закрытия справа.
 */
export const ConfirmContent: IConfirmContentFC = Object.assign(
    React.forwardRef<HTMLDivElement, IConfirmContentProps>(({ children, className, ...htmlDivAttributes }, ref) => (
        <div className={clsx(styles.confirmContent, className)} {...htmlDivAttributes} ref={ref}>
            {children}
        </div>
    )),
    {
        Title: ConfirmContentTitle,
        SubTitle: ConfirmContentSubTitle,
    },
);

ConfirmContent.displayName = "ConfirmContent";
