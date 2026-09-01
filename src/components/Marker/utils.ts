import { EMarkerStatus } from "./enums";
import styles from "./styles/Marker.module.less";

/**
 * Соответствие статуса и css-класса, задающего цвет.
 * Используется в Marker и в MarkerStatus — второй вешает тот же класс на свой корневой элемент.
 * */
export const statusToClassNameMap = {
    [EMarkerStatus.SUCCESS]: styles.success,
    [EMarkerStatus.ERROR]: styles.error,
    [EMarkerStatus.WARNING]: styles.warning,
    [EMarkerStatus.WAITING]: styles.waiting,
} satisfies Record<EMarkerStatus, string>;
