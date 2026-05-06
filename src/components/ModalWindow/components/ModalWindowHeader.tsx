import { HeaderPage, IHeaderPageTypeFirstProps } from "../../Page/components/HeaderPage";
import React from "react";
import { EHeaderPageType } from "../../Page/components/enums";
import clsx from "clsx";
import styles from "../styles/ModalWindowHeader.module.less";

export interface IModalWindowHeaderProps extends Omit<IHeaderPageTypeFirstProps, "children" | "type"> {
    /** Содержимое заголовка. Обычно — `ModalWindowHeader.Title` с заголовком и опциональной подсказкой. */
    children?: React.ReactNode;
}

/** Тип компонента заголовка со статическим субкомпонентом `Title`. */
export interface IModalWindowHeaderPropsFC extends React.FC<IModalWindowHeaderProps> {
    Title: typeof HeaderPage.Title;
}

/**
 * Заголовок модального окна. Обёртка над `HeaderPage` c фиксированным
 * `type=FIRST` и доп. отступом справа под кнопку закрытия. Через статическое
 * поле `Title` пробрасывает `HeaderPage.Title`.
 */
export const ModalWindowHeader: IModalWindowHeaderPropsFC = ({ className, children, ...rest }) => (
    <HeaderPage className={clsx(styles.modalWindowHeader, className)} {...rest} type={EHeaderPageType.FIRST}>
        {children}
    </HeaderPage>
);

ModalWindowHeader.Title = HeaderPage.Title;
ModalWindowHeader.displayName = "ModalWindowHeader";
