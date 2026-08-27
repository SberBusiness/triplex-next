import { ISelectFieldOption } from "@sberbusiness/triplex-next";

export interface ITableFilters {
    counterparty: string;
    docNumber: string;
    counterpartyOption: ISelectFieldOption | undefined;
    statusOption: ISelectFieldOption | undefined;
}
