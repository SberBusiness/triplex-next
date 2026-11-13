import React, { useContext } from "react";
import { IColumnSettingsProps } from "../../TableBasic/types";
import { MasterTableContext } from "../../MasterTableContext";
import { ColumnSettingsSortableList } from "./ColumnSettingsSortableList";
import { ColumnSettingsStaticList } from "./ColumnSettingsStaticList";

/**
 * Контейнер настроек колонок: выводит статическое содержимое или передаёт текущие columns из MasterTableContext
 * в render-функцию children. Видимость и порядок колонок меняет потребитель. ref указывает на корневой div.
 */
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
