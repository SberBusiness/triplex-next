import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ConfirmControls. */
export interface IConfirmControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ConfirmControls: React.FC<IConfirmControlsProps> = ({ children, className, ...htmlDivAttributes }) => (
    <div className={classnames("cssClass[confirmControls]", className)} {...htmlDivAttributes}>
        {children}
    </div>
);

ConfirmControls.displayName = "ConfirmControls";
