import React from "react";
import { FooterPage, IFooterPageTypeFirstProps } from "../../Page/components/FooterPage";
import { EFooterPageType } from "../../Page/components/enums";

export const ModalWindowFooter: React.FC<IFooterPageTypeFirstProps> = (props) => (
    <FooterPage {...props} type={EFooterPageType.FIRST} />
);

ModalWindowFooter.displayName = "ModalWindowFooter";
