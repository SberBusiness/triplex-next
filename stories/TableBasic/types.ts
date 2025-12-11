import { ISelectFieldOption } from "../../src";

export interface ITableFilters {
    counterparty: string;
    docNumber: string;
    counterpartyOption: ISelectFieldOption | undefined;
    statusOption: ISelectFieldOption | undefined;
}
