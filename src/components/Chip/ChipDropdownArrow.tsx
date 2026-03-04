import React from "react";
import { CaretdownStrokeSrvIcon16, CaretdownStrokeSrvIcon20, CaretdownStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "./styles/ChipDropdownArrow.module.less";

/** Свойства компонента ChipDropdownArrow. */
export interface IChipDropdownArrowProps {
    rotated: boolean;
    size?: EComponentSize;
}

const SIZE_TO_DROPDOWN_ARROW_ICON_MAP: Record<EComponentSize, React.ReactNode> = {
    [EComponentSize.SM]: <CaretdownStrokeSrvIcon16 paletteIndex={5} />,
    [EComponentSize.MD]: <CaretdownStrokeSrvIcon20 paletteIndex={5} />,
    [EComponentSize.LG]: <CaretdownStrokeSrvIcon24 paletteIndex={5} />,
};

/** Стрелка выпадающего меню Chip. */
export const ChipDropdownArrow: React.FC<IChipDropdownArrowProps> = ({ rotated, size = EComponentSize.MD }) => (
    <span className={clsx(styles.chipDropdownArrow, { [styles.rotated]: rotated })}>
        {SIZE_TO_DROPDOWN_ARROW_ICON_MAP[size]}
    </span>
);

ChipDropdownArrow.displayName = "ChipDropdownArrow";
