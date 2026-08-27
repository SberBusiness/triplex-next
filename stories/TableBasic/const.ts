import { ISelectFieldOption } from "@sberbusiness/triplex-next";
import { ITableFilters } from "./types";

export const counterpartyExampleOptions: ISelectFieldOption[] = [
    { id: "0", value: "", label: "Не указан" },
    { id: "1", value: "ООО Ромашка", label: "ООО Ромашка" },
    { id: "2", value: "ИП Иванов Иван Иванович", label: "ИП Иванов Иван Иванович" },
];

export const statusExampleOptions: ISelectFieldOption[] = [
    { id: "0", value: "", label: "Не указан" },
    { id: "1", value: "Создан", label: "Создан" },
    { id: "2", value: "Подписан", label: "Подписан" },
    { id: "3", value: "Оплачен", label: "Оплачен" },
];

export const dataSetForTest = [
    {
        docNumber: "1350",
        recipient: {
            account: "40702 810 2 9045 8100009",
            name: "ИП Иванов Иван Иванович",
        },
        purpose: "Платёжное поручение ИП Иванов Иван Иванович за оказание услуг по акту №67834259-ТНГК2356-345",
        tax: "В том числе НДС 20%",
        sum: "9450.00",
        status: "Создан",
    },
    {
        docNumber: "1351",
        recipient: {
            account: "40702 810 2 0527 5520080",
            name: "ООО Ромашка",
        },
        purpose: "Платёжное поручение ООО Ромашка за оказание услуг по акту №67834259-ТНГК2356-345",
        tax: "В том числе НДС 20%",
        sum: "18914.00",
        status: "Создан",
    },
    {
        docNumber: "1352",
        recipient: {
            account: "40702 810 2 2581 6403700",
            name: "ИП Иванов Иван Иванович",
        },
        purpose: "Платёжное поручение ИП Иванов Иван Иванович за оказание услуг по акту №67834259-ТНГК2356-345",
        tax: "В том числе НДС 20%",
        sum: "28392.00",
        status: "Подписан",
    },
    {
        docNumber: "1353",
        recipient: {
            account: "40702 810 2 8302 7306400",
            name: "ООО Ромашка",
        },
        purpose: "Платёжное поручение ООО Ромашка за оказание услуг по акту №67834259-ТНГК2356-345",
        tax: "В том числе НДС 20%",
        sum: "37884.00",
        status: "Подписан",
    },
    {
        docNumber: "1354",
        recipient: {
            account: "40702 810 2 9947 8250050",
            name: "ИП Иванов Иван Иванович",
        },
        purpose: "Платёжное поручение ИП Иванов Иван Иванович за оказание услуг по акту №67834259-ТНГК2356-345",
        tax: "В том числе НДС 20%",
        sum: "47390.00",
        status: "Оплачен",
    },
    {
        docNumber: "1355",
        recipient: {
            account: "40702 810 2 0290 9100406",
            name: "ООО Ромашка",
        },
        purpose: "Платёжное поручение ООО Ромашка за оказание услуг по акту №67834259-ТНГК2356-345",
        tax: "В том числе НДС 20%",
        sum: "56910.00",
        status: "Оплачен",
    },
];

export const defaultTableFilters: ITableFilters = {
    counterparty: "",
    docNumber: "",
    counterpartyOption: undefined,
    statusOption: undefined,
};
