import { HeaderPage, IHeaderPageTypeFirstProps } from "../../Page/components/HeaderPage";
import React from "react";
import { EHeaderPageType } from "../../Page/components/enums";
import clsx from "clsx";
import styles from "../styles/ModalWindowHeader.module.less";

export const ModalWindowHeader: React.FC<IHeaderPageTypeFirstProps> = ({ className, ...rest }) => (
    <HeaderPage className={clsx(styles.modalWindowHeader, className)} {...rest} type={EHeaderPageType.FIRST} />
);

ModalWindowHeader.displayName = "ModalWindowHeader";
