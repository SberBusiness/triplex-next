import React from "react";
import { Chip, IChipProps } from "./Chip";
import { IconWrapper } from "../IconWrapper";

export interface IChipIconProps extends Omit<IChipProps, "prefix" | "postfix"> {}

/**
 * Chip с иконкой.
 */
export const ChipIcon = React.forwardRef<HTMLSpanElement, IChipIconProps>(({ children, ...rest }, ref) => (
    <IconWrapper displayContents disabled={!!rest.disabled} active={!!rest.selected}>
        <Chip {...rest} prefix={children} postfix={<span />} ref={ref} />
    </IconWrapper>
));

ChipIcon.displayName = "ChipIcon";
