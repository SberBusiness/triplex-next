import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import clsx from "clsx";
import styles from "../styles/PaginationSelect.module.less";
import { ETextSize, Text } from "../../Typography";
import { SelectField, ISelectFieldProps } from "../../SelectField";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/* Свойства видимого компонента PaginationSelect. */
export interface IPaginationSelectProps
    extends Omit<ISelectFieldProps, "size" | "value">,
        Required<Pick<ISelectFieldProps, "value">> {
    /** Текст лейбла пагинации. */
    paginationLabel: React.ReactNode;
}

/* Выбор количества элементов на странице. */
export const PaginationSelect = React.forwardRef<HTMLDivElement, IPaginationSelectProps>(
    ({ paginationLabel, className, options, value, onChange }, ref) => {
        const [instanceId] = useState(() => `Pagination-${uniqueId()}`);

        return (
            <div className={clsx(styles.paginationSelect, className)} ref={ref}>
                <Text size={ETextSize.B3} id={instanceId}>
                    {paginationLabel}
                </Text>
                <div className={styles.paginationSelectControl}>
                    <SelectField
                        size={EComponentSize.SM}
                        value={value}
                        mobileTitle={paginationLabel}
                        options={options}
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
