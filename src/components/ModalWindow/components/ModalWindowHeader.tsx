import { HeaderPage, IHeaderPageTypeFirstProps } from "../../Page/components/HeaderPage";
import React from "react";
import { EHeaderPageType } from "../../Page/components/enums";
import clsx from "clsx";
import styles from "../styles/ModalWindowHeader.module.less";

export interface IModalWindowHeaderProps extends Omit<IHeaderPageTypeFirstProps, "children" | "type"> {
    children?: React.ReactNode;
}

export interface IModalWindowHeaderPropsFC extends React.FC<IModalWindowHeaderProps> {
    Title: typeof HeaderPage.Title;
}

export const ModalWindowHeader: IModalWindowHeaderPropsFC = ({ className, children, ...rest }) => (
    <HeaderPage className={clsx(styles.modalWindowHeader, className)} {...rest} type={EHeaderPageType.FIRST}>
        {children}
    </HeaderPage>
);

ModalWindowHeader.Title = HeaderPage.Title;
ModalWindowHeader.displayName = "ModalWindowHeader";
