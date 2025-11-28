import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { Body, IBodyProps } from "../../Body/Body";

/**
 * Свойства компонента тела модального окна.
 * @prop {React.ReactNode} children Children.
 */
export interface IModalWindowBodyProps extends IBodyProps {}

export const ModalWindowBody: React.FC<IModalWindowBodyProps> = ({ children, className, ...bodyProps }) => (
    <Body className={classnames("cssClass[modalWindowBody]", className)} {...bodyProps}>
        {children}
    </Body>
);
