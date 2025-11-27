import React from "react";
import { CaretdownStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import styles from "./styles/ChipDropdownArrow.module.less";

/** Свойства компонента ChipDropdownArrow. */
export interface IChipDropdownArrowProps {
    rotated: boolean;
}

/** Стрелка выпадающего меню Chip. */
export const ChipDropdownArrow: React.FC<IChipDropdownArrowProps> = ({ rotated }) => (
    <CaretdownStrokeSrvIcon20
        className={clsx(styles.chipDropdownArrow, { [styles.rotated]: rotated })}
        paletteIndex={5}
    />
);

ChipDropdownArrow.displayName = "ChipDropdownArrow";
