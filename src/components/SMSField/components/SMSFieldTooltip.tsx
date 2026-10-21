import React, { useContext, useEffect, useState } from "react";
import { uniqueId } from "lodash-es";
import { ETooltipAlign, ETooltipSize } from "@sberbusiness/triplex-next/components/Tooltip/enums";
import { Tooltip } from "@sberbusiness/triplex-next/components/Tooltip/Tooltip";
import { ITooltipProps } from "@sberbusiness/triplex-next/components/Tooltip/types";
import { TestProps } from "@sberbusiness/triplex-next/types/CoreTypes";
import { SMSFieldContext } from "../SMSFieldContext";

/** Свойства SMSField.Tooltip. */
export interface ISMSFieldTooltipProps
    extends Partial<Omit<ITooltipProps, "children" | "targetRef">>, Pick<ITooltipProps, "targetRef">, TestProps {
    /** Целевой элемент подсказки, обычно SMSField.Refresh. */
    children: React.ReactElement;
    /** Текст подсказки. */
    message: string;
}

/** Подсказка к кнопке SMSField.Refresh. Передаёт свой id в контекст SMSField для aria-describedby кнопки. */
export const SMSFieldTooltip: React.FC<ISMSFieldTooltipProps> = ({
    children,
    id,
    message,
    targetRef,
    ...restProps
}) => {
    const { setTooltipId } = useContext(SMSFieldContext);
    const [generatedId] = useState(() => uniqueId());
    const tooltipId = id ?? generatedId;

    useEffect(() => {
        setTooltipId(tooltipId);
    }, [tooltipId, setTooltipId]);

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
