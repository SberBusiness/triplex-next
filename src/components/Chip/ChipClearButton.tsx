import React from "react";
import { ResetoptionSrvxIcon24 } from "@sberbusiness/icons/ResetoptionSrvxIcon24";

export interface IChipClearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: never;
}

/**
 * Кнопка отмены выбора для Chip.
 */
export const ChipClearButton = React.forwardRef<HTMLButtonElement, IChipClearButtonProps>((props, ref) => (
    <button className="cssClass[chipClearButton]" type="button" {...props} ref={ref}>
        <ResetoptionSrvxIcon24 />
    </button>
));

ChipClearButton.displayName = "ChipClearButton";
