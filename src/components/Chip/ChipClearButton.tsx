import React from "react";
import clsx from "clsx";
import { CrossStrokeSrvIcon16, CrossStrokeSrvIcon20, CrossStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import { ButtonIcon, IButtonIconProps } from "../Button/ButtonIcon";
import styles from "./styles/ChipClearButton.module.less";

/** Свойства компонента ChipClearButton. */
export interface IChipClearButtonProps extends Omit<IButtonIconProps, "children"> {
    size?: EComponentSize;
}

const sizeToCrossIconMap = {
    [EComponentSize.SM]: <CrossStrokeSrvIcon16 paletteIndex={6} />,
    [EComponentSize.MD]: <CrossStrokeSrvIcon20 paletteIndex={6} />,
    [EComponentSize.LG]: <CrossStrokeSrvIcon24 paletteIndex={6} />,
};

/** Кнопка отмены выбора для Chip. */
export const ChipClearButton = React.forwardRef<HTMLButtonElement, IChipClearButtonProps>(
    ({ className, size = EComponentSize.MD, ...restProps }, ref) => (
        <ButtonIcon className={clsx(styles.chipClearButton, className)} {...restProps} ref={ref}>
            {sizeToCrossIconMap[size]}
        </ButtonIcon>
    ),
);

ChipClearButton.displayName = "ChipClearButton";
