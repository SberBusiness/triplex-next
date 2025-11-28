import { HeaderPage, IHeaderPageTypeFirstProps } from "../../Page/components/HeaderPage";
import React from "react";
import { EHeaderPageType } from "../../Page/components/enums";

export const ModalWindowHeader: React.FC<IHeaderPageTypeFirstProps> = (props) => (
    <HeaderPage {...props} type={EHeaderPageType.FIRST} />
);

ModalWindowHeader.displayName = "ModalWindowHeader";
