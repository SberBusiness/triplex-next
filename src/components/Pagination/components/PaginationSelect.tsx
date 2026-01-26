import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import clsx from "clsx";
import styles from "../styles/PaginationSelect.module.less";
import { ETextSize, Text } from "../../Typography";
import { SelectField, ISelectFieldOption, ISelectFieldProps } from "../../SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/* Свойства компонента PaginationSelect. */
export interface IPaginationSelectProps extends Omit<ISelectFieldProps, "size"> {
    /** Текст лейбла пагинации. */
    paginationLabel: React.ReactNode;
    /** Компонент скрыт. */
    hidden?: boolean;
}

/* Выбор количества элементов на странице. */
export const PaginationSelect = React.forwardRef<HTMLDivElement, IPaginationSelectProps>(
    ({ paginationLabel, className, hidden, options, value, onChange }, ref) => {
        const [instanceId] = useState(() => `Pagination-${uniqueId()}`);
        const optionsList = options && options.length > 0 ? options : [10, 20, 50, 100];

        const selectOptions: ISelectFieldOption[] = optionsList.map((option) => ({
            id: String(option),
            value: String(option),
            label: String(option),
        }));

        const selectedValue =
            value !== undefined ? { id: String(value), value: String(value), label: String(value) } : undefined;

        return hidden ? null : (
            <div className={clsx(styles.paginationSelect, className)} ref={ref}>
                <Text size={ETextSize.B3} id={instanceId}>
                    {paginationLabel}
                </Text>
                <div className={styles.paginationSelectControl}>
                    <SelectField
                        size={EComponentSize.SM}
                        value={selectedValue}
                        mobileTitle={paginationLabel}
                        options={selectOptions}
                        onChange={onChange}
                        targetProps={{
                            fieldLabel: "",
                        }}
                        aria-labelledby={instanceId}
                    />
                </div>
            </div>
        );
    },
);

PaginationSelect.displayName = "PaginationSelect";
