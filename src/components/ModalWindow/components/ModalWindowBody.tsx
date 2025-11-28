import React from "react";
import { Body, IBodyProps } from "../../Body/Body";
import clsx from "clsx";
import styles from "../styles/ModalWindowBody.module.less";

export interface IModalWindowBodyProps extends IBodyProps {}

export const ModalWindowBody: React.FC<IModalWindowBodyProps> = ({ children, className, ...bodyProps }) => (
    <Body className={clsx(styles.modalWindowBody, className)} {...bodyProps}>
        {children}
    </Body>
);
