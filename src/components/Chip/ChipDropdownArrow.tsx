import React from "react";
import { CaretdownStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import styles from "./styles/ChipDropdownArrow.module.less";
import clsx from "clsx";

/** Свойства компонента ChipDropdownArrow. */
export interface IChipDropdownArrowProps {
    rotated: boolean;
}

/** Стрелка выпадающего меню Chip. */
export const ChipDropdownArrow: React.FC<IChipDropdownArrowProps> = ({ rotated }) => (
    <CaretdownStrokeSrvIcon20
        paletteIndex={0}
        className={clsx(styles.chipDropdownArrow, { [styles.rotated]: rotated })}
    />
);

ChipDropdownArrow.displayName = "ChipDropdownArrow";
