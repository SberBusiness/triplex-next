import React from "react";
import clsx from "clsx";
import { MobileView } from "@sberbusiness/triplex-next/components/MobileView/MobileView";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { ETextSize, ELineType } from "@sberbusiness/triplex-next/components/Typography/enums";
import { ITooltipBodyProps } from "@sberbusiness/triplex-next/components/Tooltip/types";
import styles from "@sberbusiness/triplex-next/components/Tooltip/styles/TooltipDesktop.module.less";

/** Тело компонента Tooltip. */
export const TooltipBody = React.forwardRef<HTMLDivElement, ITooltipBodyProps>(({ className, ...rest }, ref) => {
    const classNames = clsx(styles.tooltipBody, className);

    return (
        <MobileView fallback={<div className={classNames} {...rest} ref={ref} />}>
            <Text className={classNames} size={ETextSize.B3} line={ELineType.NORMAL} tag="div" {...rest} ref={ref} />
        </MobileView>
    );
});

TooltipBody.displayName = "TooltipBody";
