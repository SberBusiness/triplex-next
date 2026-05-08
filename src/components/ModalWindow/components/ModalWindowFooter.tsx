import React from "react";
import { FooterPage, IFooterPageTypeFirstProps } from "../../Page/components/FooterPage";
import { EFooterPageType } from "../../Page/components/enums";

export interface IModalWindowFooterProps extends Omit<IFooterPageTypeFirstProps, "children" | "type"> {
    /** Содержимое футера. Обычно — `ModalWindowFooter.Description` с группой кнопок. */
    children?: React.ReactNode;
}

/** Тип компонента футера со статическим субкомпонентом `Description`. */
export interface IModalWindowFooterPropsFC extends React.FC<IModalWindowFooterProps> {
    Description: typeof FooterPage.Description;
}

/**
 * Футер модального окна. Обёртка над `FooterPage` c фиксированным
 * `type=FIRST`. Через статическое поле `Description` пробрасывает
 * `FooterPage.Description` для размещения кнопок и подписей.
 */
export const ModalWindowFooter: IModalWindowFooterPropsFC = ({ children, ...rest }) => (
    <FooterPage {...rest} type={EFooterPageType.FIRST}>
        {children}
    </FooterPage>
);

ModalWindowFooter.Description = FooterPage.Description;
ModalWindowFooter.displayName = "ModalWindowFooter";
