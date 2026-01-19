import { uniqueId } from "lodash-es";
import React, { useEffect, useContext } from "react";
import { SMSFieldContext } from "@sberbusiness/triplex-next/components/SMSField/SMSFieldContext";
import { ETooltipAlign, ETooltipSize } from "@sberbusiness/triplex-next/components/Tooltip/enums";
import { Tooltip } from "@sberbusiness/triplex-next/components/Tooltip/Tooltip";
import { ITooltipProps } from "@sberbusiness/triplex-next/components/Tooltip/types";
import { TestProps } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства SMSField.Tooltip. */
export interface ISMSFieldTooltipProps
    extends Partial<Omit<ITooltipProps, "children" | "targetRef">>,
        Pick<ITooltipProps, "targetRef">,
        TestProps {
    children: React.ReactElement;
    /** Текст подсказки. */
    message: string;
}

export const SMSFieldTooltip: React.FC<ISMSFieldTooltipProps> = ({
    children,
    id,
    message,
    targetRef,
    ...restProps
}) => {
    const { tooltipId, setTooltipId } = useContext(SMSFieldContext);

    useEffect(() => {
        if (id === undefined) {
            setTooltipId(uniqueId());
        } else if (id !== tooltipId) {
            setTooltipId(id);
        }
    }, [id]);

    return (
        <Tooltip
            alignTip={ETooltipAlign.START}
            disableAdaptiveMode
            id={tooltipId}
            size={ETooltipSize.SM}
            targetRef={targetRef}
            toggleType="hover"
            {...restProps}
        >
            <Tooltip.Body>{message}</Tooltip.Body>
            <Tooltip.Target>{children}</Tooltip.Target>
        </Tooltip>
    );
};

SMSFieldTooltip.displayName = "SMSFieldTooltip";
