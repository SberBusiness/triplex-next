import React from "react";

export interface IButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonBase = React.forwardRef<HTMLButtonElement, IButtonBaseProps>((props, ref) => {
    return <button type="button" {...props} data-tx={process.env.npm_package_version} ref={ref} />;
});

ButtonBase.displayName = "ButtonBase";
