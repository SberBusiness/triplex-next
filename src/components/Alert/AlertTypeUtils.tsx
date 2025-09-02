import React from "react";
import { EAlertType } from "./EAlertType";
import { InfoStsIcon16, WarningStsIcon16, ErrorStsIcon16, SystemStsIcon16 } from "@sberbusiness/icons-next";

/** Получить иконку по типу предупреждения. */
export function renderDefaultIcon(type: EAlertType): JSX.Element {
    switch (type) {
        case EAlertType.INFO:
            return <InfoStsIcon16 />;
        case EAlertType.WARNING:
            return <WarningStsIcon16 />;
        case EAlertType.ERROR:
            return <ErrorStsIcon16 />;
        case EAlertType.SYSTEM:
            return <SystemStsIcon16 />;
    }
}

/** Получить класс по типу предупреждения. */
export const alertTypeToClassNameMap = {
    [EAlertType.INFO]: (styles: Record<string, string>) => styles.alertTypeInfo,
    [EAlertType.WARNING]: (styles: Record<string, string>) => styles.alertTypeWarning,
    [EAlertType.ERROR]: (styles: Record<string, string>) => styles.alertTypeError,
    [EAlertType.SYSTEM]: (styles: Record<string, string>) => styles.alertTypeSystem,
};
