import React, { useCallback, useRef } from "react";
import clsx from "clsx";
import { ISuggestOption, Suggest } from "../../Suggest";
import { IChipSuggestProps } from "./types";
import { ChipSuggestTarget } from "./ChipSuggestTarget";
import { ChipSuggestDropdown } from "./ChipSuggestDropdown";
import { setForwardedRef } from "./utils";
import styles from "../styles/Chip.module.less";

const ChipSuggestBase = <T extends ISuggestOption = ISuggestOption>(
    {
        className,
        type,
        displayedValue,
        label,
        targetProps,
        dropdownProps,
        // prefix приходит из React.HTMLAttributes как RDFa-атрибут и намеренно не попадает
        // в restProps: ChipSuggest его не поддерживает (ChipSuggestTarget задаёт только postfix),
        // поэтому проп отбрасывается, а не уезжает на корневой div.
        prefix: _prefix,
        ...restProps
    }: IChipSuggestProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
) => {
    // value и size остаются в restProps: их читает Suggest и раздаёт через контекст.
    const { value, size } = restProps;
    const suggestRef = useRef<HTMLDivElement | null>(null);
    const targetRef = useRef<HTMLSpanElement>(null);

    const setRef = useCallback(
        (instance: HTMLDivElement | null) => {
            suggestRef.current = instance;
            setForwardedRef(ref, instance);
        },
        [ref],
    );

    return (
        <Suggest className={clsx(styles.chipGroupItem, className)} {...restProps} ref={setRef}>
            <ChipSuggestTarget size={size} {...targetProps} type={type} ref={targetRef}>
                {value ? (displayedValue ?? value.label) : label}
            </ChipSuggestTarget>
            <ChipSuggestDropdown size={size} targetRef={suggestRef} {...dropdownProps}>
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
