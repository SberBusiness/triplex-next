import { uniqueId } from "lodash-es";
import React, { useEffect, useContext } from "react";
import { SMSInputContext } from "@sberbusiness/triplex-next/components/SMSInput/SMSInputContext";
import { ETooltipAlign, ETooltipSize } from "@sberbusiness/triplex-next/components/Tooltip/enums";
import { Tooltip } from "@sberbusiness/triplex-next/components/Tooltip/Tooltip";
import { ITooltipProps } from "@sberbusiness/triplex-next/components/Tooltip/types";
import { TestProps } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства SMSInput.Tooltip. */
export interface ISMSInputTooltipProps
    extends Partial<Omit<ITooltipProps, "children" | "targetRef">>,
        Pick<ITooltipProps, "targetRef">,
        TestProps {
    children: React.ReactElement;
    /** Текст подсказки. */
    message: string;
}

export const SMSInputTooltip: React.FC<ISMSInputTooltipProps> = ({
    children,
    id,
    message,
    targetRef,
    ...restProps
}) => {
    const { tooltipId, setTooltipId } = useContext(SMSInputContext);

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

SMSInputTooltip.displayName = "SMSInputTooltip";
