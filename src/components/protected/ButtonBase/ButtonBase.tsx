import React from "react";

/** Свойства компонента ButtonBase. */
export interface IButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/** База для кнопок. */
export const ButtonBase = React.forwardRef<HTMLButtonElement, IButtonBaseProps>((props, ref) => {
    return <button type="button" {...props} ref={ref} />;
});

ButtonBase.displayName = "ButtonBase";
