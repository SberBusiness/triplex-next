import React from "react";
import { ConfirmContentSubTitle } from "./ConfirmContentSubTitle";
import { ConfirmContentTitle } from "./ConfirmContentTitle";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

/** Свойства компонента ConfirmContent. */
export interface IConfirmContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface IConfirmContentFC extends React.FC<IConfirmContentProps> {
    Title: typeof ConfirmContentTitle;
    SubTitle: typeof ConfirmContentSubTitle;
}

export const ConfirmContent: IConfirmContentFC = ({ children, className, ...htmlDivAttributes }) => (
    <div className={clsx(className, styles.confirmContent)} {...htmlDivAttributes}>
        {children}
    </div>
);

ConfirmContent.displayName = "ConfirmContent";
ConfirmContent.Title = ConfirmContentTitle;
ConfirmContent.SubTitle = ConfirmContentSubTitle;
