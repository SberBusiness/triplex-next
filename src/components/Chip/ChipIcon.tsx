import React from "react";
import { Chip, IChipProps } from "./Chip";

export interface IChipIconProps extends Omit<IChipProps, "prefix" | "postfix"> {}

/**
 * Chip с иконкой.
 */
export const ChipIcon = React.forwardRef<HTMLSpanElement, IChipIconProps>(({ children, ...rest }, ref) => (
    <Chip {...rest} prefix={children} postfix={<span />} ref={ref} />
));

ChipIcon.displayName = "ChipIcon";
