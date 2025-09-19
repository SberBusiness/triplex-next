import React from "react";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";
import { ListMasterChipGroup } from "@sber-business/triplex/components/ListMaster/components/ListMasterChipGroup";
import { ListMasterBody } from "@sber-business/triplex/components/ListMaster/components/ListMasterBody";
import { ListMasterFooter } from "@sber-business/triplex/components/ListMaster/components/ListMasterFooter";
import { ListMasterHeader } from "@sber-business/triplex/components/ListMaster/components/ListMasterHeader";
import { SelectionControls } from "@sber-business/triplex/components/ListMaster/components/SelectionControls";
import { ListMasterFooterControls } from "@sber-business/triplex/components/ListMaster/components/ListMasterFooterControls";
import { ListMasterFooterDescription } from "@sber-business/triplex/components/ListMaster/components/ListMasterFooterDescription";

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
    <div className={classnames("cssClass[listMaster]", className)} {...rest} data-tx={process.env.npm_package_version}>
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
