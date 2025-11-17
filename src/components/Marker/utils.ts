import { EMarkerStatus } from "./enums";
import styles from "./styles/Marker.module.less";

export const statusToClassNameMap = {
    [EMarkerStatus.SUCCESS]: styles.success,
    [EMarkerStatus.ERROR]: styles.error,
    [EMarkerStatus.WARNING]: styles.warning,
    [EMarkerStatus.WAITING]: styles.waiting,
};
