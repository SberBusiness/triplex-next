import React from "react";
import clsx from "clsx";
import { ITagColorProps } from "@sberbusiness/triplex-next/components/TagColor/types";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { ECaptionSize, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "./styles/TagColor.module.less";
import { ETagColorStatus } from "./enums";
import { Caption } from "@sberbusiness/triplex-next";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

const statusToClassNameMap = {
    [ETagColorStatus.DEFAULT]: styles.default,
    [ETagColorStatus.SUCCESS]: styles.success,
    [ETagColorStatus.INFO]: styles.info,
    [ETagColorStatus.WARNING]: styles.warning,
    [ETagColorStatus.ERROR]: styles.error,
};

const sizeToTextSizeMap = {
    [EComponentSize.SM]: ECaptionSize.C1,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B2,
};

/** Компонент, который используется для маркировки и классификации. */
export const TagColor: React.FC<ITagColorProps> = ({
    children,
    className,
    size,
    status = ETagColorStatus.DEFAULT,
    ...restProps
}) => {
    return (
        children && (
            <span
                className={clsx(styles.tagColor, sizeToClassNameMap[size], statusToClassNameMap[status], className)}
                {...restProps}
            >
                {size === EComponentSize.SM ? (
                    <Caption className={styles.content} size={sizeToTextSizeMap[size]}>
                        {children}
                    </Caption>
                ) : (
                    <Text className={styles.content} size={sizeToTextSizeMap[size]}>
                        {children}
                    </Text>
                )}
            </span>
        )
    );
};
