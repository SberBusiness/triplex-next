import React from "react";
import { EAlertType } from "../EAlertType";
import { alertTypeToClassNameMap } from "../AlertTypeUtils";
import { Text } from "../../Typography/Text";
import { EFontType, ETextSize } from "../../Typography/enums";
import {
    InfoStrokeStsIcon16,
    WarningStrokeStsIcon16,
    ErrorStrokeStsIcon16,
    SystemStrokeStsIcon16,
} from "@sberbusiness/icons-next";
import clsx from "clsx";
import styles from "./styles/AlertContext.module.less";

/** Свойства компонента AlertContext. */
export interface IAlertContextProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Тип предупреждения (info/warning/error/system). */
    type: Exclude<EAlertType, EAlertType.FEATURE>;
    /** Отображаемая иконка. */
    renderIcon?: React.ReactNode;
}

const renderDefaultIcon = (type: Exclude<EAlertType, EAlertType.FEATURE>): JSX.Element => {
    switch (type) {
        case EAlertType.INFO:
            return <InfoStrokeStsIcon16 paletteIndex={3} />;
        case EAlertType.WARNING:
            return <WarningStrokeStsIcon16 paletteIndex={2} />;
        case EAlertType.ERROR:
            return <ErrorStrokeStsIcon16 paletteIndex={1} />;
        case EAlertType.SYSTEM:
            return <SystemStrokeStsIcon16 paletteIndex={4} />;
    }
};

/** Маппинг типов предупреждений к типам шрифтов. */
const alertTypeToFontTypeMap: Record<Exclude<EAlertType, EAlertType.FEATURE>, EFontType> = {
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
