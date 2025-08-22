import React from "react";
import { EAlertType } from "./EAlertType";
import {
    InfoStsIcon16,
    WarningStsIcon16,
    ErrorStsIcon16,
    SystemStsIcon16,
    DefaulticonPrdIcon20,
} from "@sberbusiness/icons-next";

/** Получить иконку по типу предупреждения. */
export function renderDefaultIcon(type: EAlertType): JSX.Element {
    switch (type) {
        case EAlertType.INFO:
            return <InfoStrokeStsIcon16 paletteIndex={3} />;
        case EAlertType.WARNING:
            return <WarningStrokeStsIcon16 paletteIndex={2} />;
        case EAlertType.ERROR:
            return <ErrorStrokeStsIcon16 paletteIndex={1} />;
        case EAlertType.SYSTEM:
            return <SystemStsIcon16 />;
        case EAlertType.FEATURE:
            return <DefaulticonPrdIcon20 />;
    }
}

/** Получить класс по типу предупреждения. */
export const alertTypeToClassNameMap = {
    [EAlertType.INFO]: (styles: Record<string, string>) => styles.alertTypeInfo,
    [EAlertType.WARNING]: (styles: Record<string, string>) => styles.alertTypeWarning,
    [EAlertType.ERROR]: (styles: Record<string, string>) => styles.alertTypeError,
    [EAlertType.SYSTEM]: (styles: Record<string, string>) => styles.alertTypeSystem,
    [EAlertType.FEATURE]: (styles: Record<string, string>) => styles.alertTypeFeature,
};
