import React from "react";
import clsx from "clsx";
import styles from "../styles/ModalWindowBody.module.less";
import { IIslandProps, Island } from "../../Island/Island";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EIslandType } from "../../Island/enums";

export interface IModalWindowBodyProps extends IIslandProps {}

/**
 * Тело модального окна. Обёртка над `Island` с фиксированными `type` и `size`,
 * размечающая основной скроллируемый контент между `ModalWindowHeader` и
 * `ModalWindowFooter`.
 */
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

ModalWindowBody.displayName = "ModalWindowBody";
