import React from "react";
import clsx from "clsx";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import { Marker } from "../Marker";
import { EMarkerStatus } from "../Marker/enums";
import { statusToClassNameMap } from "../Marker/utils";
import { ETextSize, ECaptionSize, Caption, Text, EFontType } from "../Typography";
import styles from "./styles/MarkerStatus.module.less";

/** Свойства компонента MarkerStatus. */
export interface IMarkerStatusProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Статус. Задаёт цвет маркера. */
    status: EMarkerStatus;
    /** Наименование статуса. */
    children?: React.ReactNode;
    /** Дополнительное описание под наименованием статуса. */
    description?: React.ReactNode;
    /** Размер. По умолчанию EComponentSize.MD. */
    size?: EComponentSize.MD | EComponentSize.LG;
}

/** Соответствие размера компонента размеру текста наименования статуса. */
const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize.MD | EComponentSize.LG, ETextSize> = {
    [EComponentSize.MD]: ETextSize.B4,
    [EComponentSize.LG]: ETextSize.B3,
};

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Статус: цветной маркер, наименование статуса и необязательное описание под ним. */
export const MarkerStatus = React.forwardRef<HTMLDivElement, IMarkerStatusProps>(
    ({ children, className, description, status, size = EComponentSize.MD, ...restProps }, ref) => {
        const classNames = clsx(
            styles.markerStatus,
            SIZE_TO_CLASS_NAME_MAP[size],
            statusToClassNameMap[status],
            className,
        );

        return (
            <div className={classNames} {...restProps} data-tx={process.env.npm_package_version} ref={ref}>
                <div className={styles.markerContainer}>
                    <Marker status={status} size={size} />
                </div>

                <div className={styles.contentContainer}>
                    <Text size={SIZE_TO_TEXT_SIZE_MAP[size]}>{children}</Text>

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
    },
);

MarkerStatus.displayName = "MarkerStatus";
