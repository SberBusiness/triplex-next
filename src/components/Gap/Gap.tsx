import React from "react";

export type TGapSize = 4 | 8 | 12 | 16 | 24 | 32 | 64 | 128;

export interface IGapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    size: TGapSize;
}

export const Gap = React.forwardRef<HTMLDivElement, IGapProps>(({ style, size, ...restProps }, ref) => (
    <div style={{ height: `${size}px`, ...style }} role="presentation" {...restProps} ref={ref} />
));

Gap.displayName = "Gap";
