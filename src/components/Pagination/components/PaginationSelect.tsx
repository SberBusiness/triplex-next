import React, { useRef } from "react";
import { uniqueId } from "lodash-es";
import clsx from "clsx";
import styles from "../styles/PaginationSelect.module.less";
import { ETextSize, Text } from "../../Typography";

/* Свойства компонента PaginationSelect. */
export interface IPaginationSelectProps {
    /* Текст лейбла пагинации. */
    paginationLabel: React.ReactNode;
    className?: string;
    /* Компонент скрыт. */
    hidden?: boolean;
    /* Доступные варианты количества элементов на странице. */
    options?: number[];
    /* Текущее выбранное количество элементов на странице. */
    value?: number;
    /* Колбэк при изменении выбранного количества элементов на странице. */
    onChange?: (value: number) => void;
}

/* Выбор количества элементов на странице. */
export const PaginationSelect = React.forwardRef<HTMLDivElement, IPaginationSelectProps>(
    ({ paginationLabel, className, hidden, options, value, onChange }, ref) => {
        const instanceId = useRef(`Pagination-${uniqueId()}`);
        const selectOptions = options && options.length > 0 ? options : [10, 20, 50, 100];

        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const nextValue = Number(event.target.value);
            if (Number.isNaN(nextValue)) {
                return;
            }
            onChange?.(nextValue);
        };

        return hidden ? null : (
            <div className={clsx(styles.paginationSelect, className)} ref={ref}>
                <Text size={ETextSize.B3} id={instanceId.current}>
                    {paginationLabel}
                </Text>
                <div className={styles.paginationSelectControl}>
                    <select
                        aria-labelledby={instanceId.current}
                        value={value !== undefined ? String(value) : undefined}
                        onChange={handleChange}
                    >
                        {selectOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    },
);

PaginationSelect.displayName = "PaginationSelect";
