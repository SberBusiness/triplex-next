import React from "react";
import { EAlertType } from "../EAlertType";
import { alertTypeToClassNameMap, renderDefaultIcon } from "../AlertTypeUtils";
import clsx from "clsx";
import styles from "./styles/AlertContext.module.less";
import { Text } from "../../Typography/Text";
import { EFontType, ETextSize } from "../../Typography/enums";

/** Свойства компонента AlertContext. */
export interface IAlertContextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Тип предупреждения (info/warning/error/system). */
    type: EAlertType;
    /** Отображаемая иконка. */
    renderIcon?: React.ReactNode;
}

/** Маппинг типов предупреждений к типам шрифтов. */
const alertTypeToFontTypeMap: Record<EAlertType, EFontType> = {
    [EAlertType.INFO]: EFontType.INFO,
    [EAlertType.WARNING]: EFontType.WARNING,
    [EAlertType.ERROR]: EFontType.ERROR,
    [EAlertType.SYSTEM]: EFontType.SECONDARY,
};

/** Компонент контекстного предупреждения. */
export const AlertContext = React.forwardRef<HTMLSpanElement, IAlertContextProps>(
    ({ children, className, type, renderIcon, ...rest }, ref) => {
        return (
            <span
                role="alert"
                className={clsx(styles.alertContext, alertTypeToClassNameMap[type](styles), className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {renderIcon || renderDefaultIcon(type)}
                <Text size={ETextSize.B4} type={alertTypeToFontTypeMap[type]} className={styles.alertContextText}>
                    {children}
                </Text>
            </span>
        );
    },
);

AlertContext.displayName = "AlertContext";
