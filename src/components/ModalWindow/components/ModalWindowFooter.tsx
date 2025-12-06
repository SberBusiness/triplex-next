import React from "react";
import { FooterPage, IFooterPageTypeFirstProps } from "../../Page/components/FooterPage";
import { EFooterPageType } from "../../Page/components/enums";

export interface IModalWindowFooterProps extends Omit<IFooterPageTypeFirstProps, "children" | "type"> {
    children?: React.ReactNode;
}

export interface IModalWindowFooterPropsFC extends React.FC<IModalWindowFooterProps> {
    Description: typeof FooterPage.Description;
}

export const ModalWindowFooter: IModalWindowFooterPropsFC = ({ children, ...rest }) => (
    <FooterPage {...rest} type={EFooterPageType.FIRST}>
        {children}
    </FooterPage>
);

ModalWindowFooter.Description = FooterPage.Description;
ModalWindowFooter.displayName = "ModalWindowFooter";
