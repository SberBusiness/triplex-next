import React from "react";
import { ConfirmClose } from "./components/ConfirmClose";
import { ConfirmContent } from "./components/ConfirmContent";
import { ConfirmControls } from "./components/ConfirmControls";
import clsx from "clsx";
import styles from "./styles/Confirm.module.less";
/** Свойства компонента Confirm. */
export interface IConfirmProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface IConfirmFC extends React.FC<IConfirmProps> {
    Close: typeof ConfirmClose;
    Content: typeof ConfirmContent;
    Controls: typeof ConfirmControls;
}

/** Компонент предупреждения, о закрытии лайтбокса / боковой панели лайтбокса. */
export const Confirm: IConfirmFC = ({ children, className, ...htmlDivAttributes }) => (
    <div className={clsx(className, styles.confirm)} role="dialog" aria-modal="true" {...htmlDivAttributes}>
        {children}
    </div>
);

Confirm.displayName = "Confirm";
Confirm.Close = ConfirmClose;
Confirm.Content = ConfirmContent;
Confirm.Controls = ConfirmControls;
