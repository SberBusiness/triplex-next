import React from "react";
import { Marker } from "../Marker";
import { EMarkerStatus, EMarkerSize } from "../Marker/enums";
import styles from "./styles/MarkerStatus.module.less";
import clsx from "clsx";
import { sizeToClassNameMap, statusToClassNameMap } from "../Marker/utils";
import { ETextSize } from "../Typography/enums";
import { Text } from "../Typography/Text";

export interface IMarkerStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Статус. */
    status: EMarkerStatus;
    /** Дополнительное описание под наименованием статуса. */
    description?: React.ReactNode;
    /** Размер. */
    size?: EMarkerSize;
}

const markerStatusSizeToTextSizeMap = {
    [EMarkerSize.MD]: ETextSize.B4,
    [EMarkerSize.LG]: ETextSize.B3,
};

export const MarkerStatus: React.FC<IMarkerStatusProps> = ({
    children,
    className,
    description,
    status,
    size = EMarkerSize.MD,
}) => {
    const classNames = clsx(
        className,
        styles.markerStatus,
        sizeToClassNameMap[size](styles),
        statusToClassNameMap[status](styles),
    );

    return (
        <div className={classNames} data-tx={process.env.npm_package_version}>
            <div className={styles.markerContainer}>
                <Marker status={status} size={size} />
            </div>

            <Text size={markerStatusSizeToTextSizeMap[size]} className={styles.markerStatusText}>
                {children}
            </Text>

            {description && <div className={styles.markerStatusDescription}>{description}</div>}
        </div>
    );
};
