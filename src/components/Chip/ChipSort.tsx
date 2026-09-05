import React, { useRef } from "react";
import clsx from "clsx";
import { isEqual, uniqueId } from "lodash-es";
import { SortStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ChipIcon } from "./ChipIcon";
import { IChipSelectProps } from "./ChipSelect/ChipSelect";
import { IconWrapper } from "../IconWrapper";
import {
    ISelectExtendedFieldDefaultOption,
    ISelectExtendedFieldDropdownProvideProps,
    ISelectExtendedFieldTargetProvideProps,
    SelectExtendedField,
} from "../SelectExtendedField";
import { SelectExtendedFieldDropdownDefault } from "../SelectExtendedField/components/SelectExtendedFieldDropdownDefault";
import { isKey } from "../../utils/keyboard";
import styles from "./styles/Chip.module.less";

/** Индекс палитры иконки сортировки в обычном состоянии. */
const ICON_PALETTE_INDEX_DEFAULT = 5;
/** Индекс палитры иконки сортировки, когда чипс подсвечен как изменённый. */
const ICON_PALETTE_INDEX_SELECTED = 6;

/** Свойства компонента ChipSort. */
export interface IChipSortProps extends Omit<IChipSelectProps, "targetProps" | "clearSelected" | "defaultValue"> {
    /** Дефолтное значение, если текущее значение равно дефолтному, элемент не будет подсвечен как измененный. */
    defaultValue?: ISelectExtendedFieldDefaultOption;
}

/**
 * ChipSelect с иконкой выбора сортировки.
 *
 * Выбранное значение не отображается текстом: target — это ChipIcon с иконкой сортировки,
 * которая подсвечивается, только когда текущее значение отличается от defaultValue.
 * Открывается по клику и по Enter/Space, target связан со списком через aria-controls.
 */
export const ChipSort = React.forwardRef<HTMLDivElement, IChipSortProps>(
    ({ className, defaultValue, disabled, label, onChange, options, value, size, type, ...restProps }, ref) => {
        // Id списка дропдауна. Через него target связывается со списком по aria-controls.
        const instanceId = useRef(uniqueId());
        // Чипс подсвечен, только если значение выбрано и отличается от дефолтного:
        // сортировка по умолчанию — это не изменение фильтра, подсвечивать нечего.
        const selected = value != null && !isEqual(defaultValue, value);

        const renderTarget = ({ opened, setOpened }: ISelectExtendedFieldTargetProvideProps) => {
            const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
                // Закрытием списка занимается SelectExtendedField, здесь только открытие.
                if (!opened && (isKey(event.code, "ENTER") || isKey(event.code, "SPACE"))) {
                    event.preventDefault();
                    setOpened(true);
                }
            };

            return (
                <ChipIcon
                    disabled={disabled}
                    selected={selected}
                    onClick={() => setOpened(!opened)}
                    onKeyDown={handleKeyDown}
                    size={size}
                    type={type}
                    role="combobox"
                    aria-expanded={opened}
                    aria-controls={instanceId.current}
                    ref={ref}
                >
                    <IconWrapper active={opened} disabled={disabled} displayContents>
                        <SortStrokeSrvIcon24
                            paletteIndex={selected ? ICON_PALETTE_INDEX_SELECTED : ICON_PALETTE_INDEX_DEFAULT}
                        />
                    </IconWrapper>
                </ChipIcon>
            );
        };

        const renderDropdown = (props: ISelectExtendedFieldDropdownProvideProps) => (
            <SelectExtendedFieldDropdownDefault
                {...props}
                size={size}
                mobileTitle={label}
                onChange={onChange}
                options={options}
                value={value}
                listId={instanceId.current}
            />
        );

        return (
            <SelectExtendedField
                className={clsx(styles.chipGroupItem, className)}
                renderTarget={renderTarget}
                {...restProps}
            >
                {renderDropdown}
            </SelectExtendedField>
        );
    },
);

ChipSort.displayName = "ChipSort";
