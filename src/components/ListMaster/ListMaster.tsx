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

export interface IListMasterFC extends React.FC<IListMasterProps> {
    Body: typeof ListMasterBody;
    ChipGroup: typeof ListMasterChipGroup;
    Footer: typeof ListMasterFooter;
    FooterControls: typeof ListMasterFooterControls;
    FooterDescription: typeof ListMasterFooterDescription;
    Header: typeof ListMasterHeader;
    SelectionControls: typeof SelectionControls;
}

/** Компонент, оборачивающий список и фильтры. */
export const ListMaster: IListMasterFC = ({ children, className, ...rest }) => (
    <div className={className} {...rest} data-tx={process.env.npm_package_version}>
        {children}
    </div>
);

ListMaster.Body = ListMasterBody;
ListMaster.ChipGroup = ListMasterChipGroup;
ListMaster.Footer = ListMasterFooter;
ListMaster.FooterControls = ListMasterFooterControls;
ListMaster.FooterDescription = ListMasterFooterDescription;
ListMaster.Header = ListMasterHeader;
ListMaster.SelectionControls = SelectionControls;

ListMaster.displayName = "ListMaster";
