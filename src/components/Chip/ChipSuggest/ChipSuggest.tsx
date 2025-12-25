import React, { useRef } from "react";
import clsx from "clsx";
import { ISuggestOption, Suggest } from "../../Suggest";
import { IChipSuggestProps } from "./types";
import { ChipSuggestTarget } from "./ChipSuggestTarget";
import { ChipSuggestDropdown } from "./ChipSuggestDropdown";
import styles from "../styles/Chip.module.less";

const ChipSuggestBase = <T extends ISuggestOption = ISuggestOption>(
    { className, displayedValue, label, prefix, targetProps, dropdownProps, ...restProps }: IChipSuggestProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    const { value, size } = restProps;
    const suggestRef = useRef<HTMLDivElement | null>(null);
    const targetRef = useRef<HTMLSpanElement>(null);

    const setRef = (instance: HTMLDivElement | null) => {
        suggestRef.current = instance;

        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    return (
        <Suggest className={clsx(styles.chipGroupItem, className)} {...restProps} ref={setRef}>
            <ChipSuggestTarget size={size} {...targetProps} ref={targetRef}>
                {value ? (displayedValue ?? value.label) : label}
            </ChipSuggestTarget>
            <ChipSuggestDropdown size={size} targetRef={suggestRef} chipTargetRef={targetRef} {...dropdownProps}>
                {label}
            </ChipSuggestDropdown>
        </Suggest>
    );
};

/**
 * Компонент выбора одного значения из списка с возможностью фильтрации.
 * Выбранное значение отображается компонентом Chip.
 */
export const ChipSuggest = React.forwardRef(ChipSuggestBase) as <T extends ISuggestOption = ISuggestOption>(
    props: IChipSuggestProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element;
