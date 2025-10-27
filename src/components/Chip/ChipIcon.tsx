import React from "react";
import { Chip, IChipProps } from "@sber-business/triplex/components/Chip/index";

export interface IChipIconProps extends Omit<IChipProps, "prefix" | "postfix"> {}

/**
 * Chip с иконкой.
 */
export const ChipIcon = React.forwardRef<HTMLSpanElement, IChipIconProps>(({ children, ...rest }, ref) => (
    <Chip {...rest} prefix={children} postfix={""} ref={ref} />
));

ChipIcon.displayName = "ChipIcon";
