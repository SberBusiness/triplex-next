import React, { useContext, useState } from "react";
import { uniqueId } from "lodash-es";
import clsx from "clsx";
import styles from "../styles/PaginationSelect.module.less";
import { ETextSize, Text } from "../../Typography";
import { SelectField, ISelectFieldProps } from "../../SelectField";
import { EFormFieldStatus } from "../../FormField/enums";
import { MasterTableContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента PaginationSelect. */
export interface IPaginationSelectProps
    extends Omit<ISelectFieldProps, "size" | "value">, Required<Pick<ISelectFieldProps, "value">> {
    /** Текст лейбла пагинации. */
    paginationLabel: React.ReactNode;
}

/** Выбор количества элементов на странице. */
export const PaginationSelect = React.forwardRef<HTMLDivElement, IPaginationSelectProps>(
    (
        {
            paginationLabel,
            className,
            options,
            value,
            onChange,
            status,
            targetProps,
            mobileTitle = paginationLabel,
            ...rest
        },
        ref,
    ) => {
        const [instanceId] = useState(() => `Pagination-${uniqueId()}`);
        const { loading } = useContext(MasterTableContext);

        return (
            <div className={clsx(styles.paginationSelect, className)} ref={ref}>
                <Text size={ETextSize.B3} id={instanceId}>
                    {paginationLabel}
                </Text>
                <div className={styles.paginationSelectControl}>
                    <SelectField
                        size={EComponentSize.SM}
                        value={value}
                        mobileTitle={mobileTitle}
                        options={options}
                        onChange={onChange}
                        status={loading ? EFormFieldStatus.DISABLED : status}
                        aria-labelledby={instanceId}
                        {...rest}
                        targetProps={{ fieldLabel: "", ...targetProps }}
                    />
                </div>
            </div>
        );
    },
);

PaginationSelect.displayName = "PaginationSelect";
