import React from "react";
import { ConfirmClose } from "./components/ConfirmClose";
import { ConfirmContent } from "./components/ConfirmContent";
import { ConfirmControls } from "./components/ConfirmControls";
// import clsx from "clsx";
import { EIslandType, IIslandProps, Island } from "../Island";
// import styles from "./styles/Confirm.module.less";

/** Свойства компонента Confirm. */
export interface IConfirmProps extends IIslandProps {}

export interface IConfirmFC extends React.FC<IConfirmProps> {
    Close: typeof ConfirmClose;
    Content: typeof ConfirmContent;
    Controls: typeof ConfirmControls;
}

/** Компонент предупреждения, о закрытии лайтбокса / боковой панели лайтбокса. */
export const Confirm: IConfirmFC = ({ children, className, ...htmlDivAttributes }) => (
    <Island
        type={EIslandType.TYPE_2}
        // className={clsx(className, styles.confirm)}
        className={className}
        role="dialog"
        aria-modal="true"
        {...htmlDivAttributes}
    >
        <Island.Body>{children}</Island.Body>
    </Island>
);

Confirm.displayName = "Confirm";
Confirm.Close = ConfirmClose;
Confirm.Content = ConfirmContent;
Confirm.Controls = ConfirmControls;
