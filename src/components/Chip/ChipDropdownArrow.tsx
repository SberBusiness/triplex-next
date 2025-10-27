import React from "react";
import { ChipscaretdownSrvxIcon24 } from "@sberbusiness/icons/ChipscaretdownSrvxIcon24";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента ChipDropdownArrow. */
export interface IChipDropdownArrowProps {
    rotated: boolean;
}

/** Стрелка выпадающего меню Chip. */
export const ChipDropdownArrow: React.FC<IChipDropdownArrowProps> = ({ rotated }) => (
    <ChipscaretdownSrvxIcon24
        className={classnames("cssClass[chipDropdownArrow]", { ["cssClass[rotated]"]: rotated })}
    />
);
