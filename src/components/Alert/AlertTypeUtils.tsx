import { EAlertType } from "./EAlertType";

/** Получить класс по типу предупреждения. */
export const ALERT_TYPE_TO_CLASS_NAME_MAP = {
    [EAlertType.INFO]: (styles: Record<string, string>) => styles.alertTypeInfo,
    [EAlertType.WARNING]: (styles: Record<string, string>) => styles.alertTypeWarning,
    [EAlertType.ERROR]: (styles: Record<string, string>) => styles.alertTypeError,
    [EAlertType.SYSTEM]: (styles: Record<string, string>) => styles.alertTypeSystem,
    [EAlertType.FEATURE]: (styles: Record<string, string>) => styles.alertTypeFeature,
};
