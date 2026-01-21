/* eslint-disable react-hooks/refs */
import React, { useRef } from "react";
import { uniqueId } from "lodash-es";
import clsx from "clsx";
import styles from "../styles/PaginationSelect.module.less";
import { ETextSize, Text } from "../../Typography";
import { SelectField, ISelectFieldOption } from "../../SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/* Свойства компонента PaginationSelect. */
export interface IPaginationSelectProps {
    /** Текст лейбла пагинации. */
    paginationLabel: React.ReactNode;
    className?: string;
    /** Компонент скрыт. */
    hidden?: boolean;
    /** Доступные варианты количества элементов на странице. */
    options?: number[];
    /** Текущее выбранное количество элементов на странице. */
    value?: number;
    /** Колбэк при изменении выбранного количества элементов на странице. */
    onChange?: (value: number) => void;
}

/* Выбор количества элементов на странице. */
export const PaginationSelect = React.forwardRef<HTMLDivElement, IPaginationSelectProps>(
    ({ paginationLabel, className, hidden, options, value, onChange }, ref) => {
        const instanceId = useRef(`Pagination-${uniqueId()}`);
        const optionsList = options && options.length > 0 ? options : [10, 20, 50, 100];

        const selectOptions: ISelectFieldOption[] = optionsList.map((option) => ({
            id: String(option),
            value: String(option),
            label: option,
        }));

        const selectedValue =
            value !== undefined ? { id: String(value), value: String(value), label: value } : undefined;

        const handleChange = (option: ISelectFieldOption) => {
            onChange?.(Number(option.value));
        };

        return hidden ? null : (
            <div className={clsx(styles.paginationSelect, className)} ref={ref}>
                <Text size={ETextSize.B3} id={instanceId.current}>
                    {paginationLabel}
                </Text>
                <div className={styles.paginationSelectControl}>
                    <SelectField
                        size={EComponentSize.SM}
                        value={selectedValue}
                        mobileTitle={paginationLabel}
                        options={selectOptions}
                        onChange={handleChange}
                        targetProps={{
                            fieldLabel: "",
                        }}
                        aria-labelledby={instanceId.current}
                    />
                </div>
            </div>
        );
    },
);

PaginationSelect.displayName = "PaginationSelect";
