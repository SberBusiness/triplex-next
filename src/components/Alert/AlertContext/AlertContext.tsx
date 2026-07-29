import React from "react";
import { EAlertType } from "../EAlertType";
import { ALERT_TYPE_TO_CLASS_NAME_MAP } from "../AlertTypeUtils";
import { Text } from "../../Typography/Text";
import { ETextSize } from "../../Typography/enums";
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
    /** Тип предупреждения. */
    type: Exclude<EAlertType, EAlertType.FEATURE>;
    /** Отображаемая иконка. */
    renderIcon?: React.ReactNode;
    /** Текст предупреждения. */
    children?: React.ReactNode;
}

/** Маппинг типов предупреждений к иконкам по умолчанию. */
const TYPE_TO_DEFAULT_ICON_MAP: Record<Exclude<EAlertType, EAlertType.FEATURE>, React.ReactNode> = {
    [EAlertType.INFO]: <InfoStrokeStsIcon16 paletteIndex={3} />,
    [EAlertType.WARNING]: <WarningStrokeStsIcon16 paletteIndex={2} />,
    [EAlertType.ERROR]: <ErrorStrokeStsIcon16 paletteIndex={1} />,
    [EAlertType.SYSTEM]: <SystemStrokeStsIcon16 paletteIndex={4} />,
};

/**
 * Компонент контекстного предупреждения.
 * Рендерит live-region (`role="alert"`) с иконкой и текстом. Иконка выбирается по `type`,
 * её можно переопределить через `renderIcon`.
 */
export const AlertContext = React.forwardRef<HTMLSpanElement, IAlertContextProps>(
    ({ children, className, type, renderIcon, ...rest }, ref) => {
        return (
            <span
                role="alert"
                className={clsx(styles.alertContext, ALERT_TYPE_TO_CLASS_NAME_MAP[type](styles), className)}
                {...rest}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {renderIcon || TYPE_TO_DEFAULT_ICON_MAP[type]}
                <Text size={ETextSize.B4} className={styles.alertContextText}>
                    {children}
                </Text>
            </span>
        );
    },
);

AlertContext.displayName = "AlertContext";
