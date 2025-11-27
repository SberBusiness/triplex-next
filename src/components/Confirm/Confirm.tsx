import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { ConfirmClose } from "@sber-business/triplex/components/Confirm/components/ConfirmClose";
import { ConfirmContent } from "@sber-business/triplex/components/Confirm/components/ConfirmContent";
import { ConfirmControls } from "@sber-business/triplex/components/Confirm/components/ConfirmControls";

/** Свойства компонента Confirm. */
export interface IConfirmProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface IConfirmFC extends React.FC<IConfirmProps> {
    Close: typeof ConfirmClose;
    Content: typeof ConfirmContent;
    Controls: typeof ConfirmControls;
}

/** Компонент предупреждения, о закрытии лайтбокса / боковой панели лайтбокса. */
export const Confirm: IConfirmFC = ({ children, className, ...htmlDivAttributes }) => (
    <div className={classnames(className, "cssClass[confirm]")} role="dialog" aria-modal="true" {...htmlDivAttributes}>
        {children}
    </div>
);

Confirm.displayName = "Confirm";
Confirm.Close = ConfirmClose;
Confirm.Content = ConfirmContent;
Confirm.Controls = ConfirmControls;
