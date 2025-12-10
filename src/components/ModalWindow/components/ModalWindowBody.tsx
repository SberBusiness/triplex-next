import React from "react";
import clsx from "clsx";
import styles from "../styles/ModalWindowBody.module.less";
import { IIslandProps, Island } from "../../Island/Island";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EIslandType } from "../../Island/enums";

export interface IModalWindowBodyProps extends IIslandProps {}

export const ModalWindowBody: React.FC<IModalWindowBodyProps> = ({ children, className, ...islandProps }) => (
    <Island
        className={clsx(styles.modalWindowBody, className)}
        type={EIslandType.TYPE_1}
        size={EComponentSize.MD}
        {...islandProps}
    >
        {children}
    </Island>
);
