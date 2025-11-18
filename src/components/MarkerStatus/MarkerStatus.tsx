import React from "react";
import { Marker } from "../Marker";
import { EMarkerStatus } from "../Marker/enums";
import styles from "./styles/MarkerStatus.module.less";
import clsx from "clsx";
import { statusToClassNameMap } from "../Marker/utils";
import { ETextSize, ECaptionSize, Caption, Text, EFontType } from "../Typography";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";

export interface IMarkerStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Статус. */
    status: EMarkerStatus;
    /** Дополнительное описание под наименованием статуса. */
    description?: React.ReactNode;
    /** Размер. */
    size?: EComponentSize.MD | EComponentSize.LG;
}

const markerStatusSizeToTextSizeMap = {
    [EComponentSize.MD]: ETextSize.B4,
    [EComponentSize.LG]: ETextSize.B3,
};

const sizeToClassNameMap = createSizeToClassNameMap(styles);

export const MarkerStatus: React.FC<IMarkerStatusProps> = ({
    children,
    className,
    description,
    status,
    size = EComponentSize.MD,
    ...rest
}) => {
    const classNames = clsx(styles.markerStatus, sizeToClassNameMap[size], statusToClassNameMap[status], className);

    return (
        <div className={classNames} data-tx={process.env.npm_package_version} {...rest}>
            <div className={styles.markerContainer}>
                <Marker status={status} size={size} />
            </div>

            <div className={styles.contentContainer}>
                <Text size={markerStatusSizeToTextSizeMap[size]}>{children}</Text>

                {description &&
                    (size === EComponentSize.MD ? (
                        <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>
                            {description}
                        </Caption>
                    ) : (
                        <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                            {description}
                        </Text>
                    ))}
            </div>
        </div>
    );
};
