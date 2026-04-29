import React from "react";
import { ListMasterChipGroup } from "@sberbusiness/triplex-next/components/ListMaster/components/ListMasterChipGroup";
import { ListMasterBody } from "@sberbusiness/triplex-next/components/ListMaster/components/ListMasterBody";
import { ListMasterFooter } from "@sberbusiness/triplex-next/components/ListMaster/components/ListMasterFooter";
import { ListMasterHeader } from "@sberbusiness/triplex-next/components/ListMaster/components/ListMasterHeader";
import { SelectionControls } from "@sberbusiness/triplex-next/components/ListMaster/components/SelectionControls";
import { ListMasterFooterControls } from "@sberbusiness/triplex-next/components/ListMaster/components/ListMasterFooterControls";
import { ListMasterFooterDescription } from "@sberbusiness/triplex-next/components/ListMaster/components/ListMasterFooterDescription";

/** Свойства компонента ListMaster. */
export interface IListMasterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Compound-компонент, оборачивающий список и фильтры. Содержит набор
 * статических подкомпонентов:
 *
 * - `ListMaster.Header` — sticky-шапка (обычно используется для selection controls)
 * - `ListMaster.Body` — основная область со списком и фильтрами
 * - `ListMaster.ChipGroup` — горизонтальная группа `Chip`-фильтров с одной строкой
 * - `ListMaster.Footer` — sticky-футер (агрегаты + действия по выбранным элементам)
 * - `ListMaster.FooterDescription` — текстовая часть футера (например, сумма выбранных)
 * - `ListMaster.FooterControls` — кнопки в футере
 * - `ListMaster.SelectionControls` — flex-контейнер
 */
export const ListMaster = Object.assign(
    React.forwardRef<HTMLDivElement, IListMasterProps>(function ListMaster({ children, className, ...rest }, ref) {
        return (
            <div className={className} {...rest} data-tx={process.env.npm_package_version} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Body: ListMasterBody,
        ChipGroup: ListMasterChipGroup,
        Footer: ListMasterFooter,
        FooterControls: ListMasterFooterControls,
        FooterDescription: ListMasterFooterDescription,
        Header: ListMasterHeader,
        SelectionControls: SelectionControls,
    },
);

ListMaster.displayName = "ListMaster";
