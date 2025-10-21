import React, { useContext } from "react";
import { IColumnSettingsProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { MasterTableContext } from "@sberbusiness/triplex-next/components/Table/MasterTableContext";
import { ColumnSettingsSortableList } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/ColumnSettingsSortableList";
import { ColumnSettingsStaticList } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/ColumnSettingsStaticList";

/** Компонент, для настройки видимости колонок. */
export const ColumnSettings = Object.assign(
    React.forwardRef<HTMLDivElement, IColumnSettingsProps>(function ColumnSettings(
        { children, className, ...rest },
        ref,
    ) {
        const { columns } = useContext(MasterTableContext);

        return (
            <div className={className} {...rest} ref={ref}>
                {typeof children === "function" ? children({ columns }) : children}
            </div>
        );
    }),
    {
        SortableList: ColumnSettingsSortableList,
        StaticList: ColumnSettingsStaticList,
    },
);

ColumnSettings.displayName = "ColumnSettings";
