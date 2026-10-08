import React, { useState } from "react";
import {
    EComponentSize,
    ETextSize,
    ISelectFieldOption,
    PaginationExtended,
    PaginationNavigation,
    SelectField,
    Text,
} from "@sberbusiness/triplex-next";

const PAGE_SIZE_OPTIONS: ISelectFieldOption[] = [
    { id: "25", value: "25", label: "25" },
    { id: "50", value: "50", label: "50" },
    { id: "100", value: "100", label: "100" },
];

const TOTAL_ITEMS = 125;

export const Example = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSizeOption, setPageSizeOption] = useState(PAGE_SIZE_OPTIONS[0]);
    const pageSize = Number(pageSizeOption.value);
    const totalPages = Math.ceil(TOTAL_ITEMS / pageSize);
    const firstItem = (currentPage - 1) * pageSize + 1;
    const lastItem = Math.min(currentPage * pageSize, TOTAL_ITEMS);

    const handlePageSizeChange = (option: ISelectFieldOption) => {
        setPageSizeOption(option);
        setCurrentPage(1);
    };

    return (
        <PaginationExtended aria-label="Пагинация списка документов" style={{ flexWrap: "wrap", gap: 24 }}>
            <Text size={ETextSize.B3} aria-live="polite">
                {firstItem}–{lastItem} из {TOTAL_ITEMS}
            </Text>
            <PaginationNavigation
                currentPage={currentPage}
                totalPages={totalPages}
                onCurrentPageChange={setCurrentPage}
                buttonPrevProps={{ "aria-label": "Предыдущая страница" }}
                buttonNextProps={{ "aria-label": "Следующая страница" }}
            />
            <div style={{ width: 180 }}>
                <SelectField
                    size={EComponentSize.SM}
                    value={pageSizeOption}
                    options={PAGE_SIZE_OPTIONS}
                    onChange={handlePageSizeChange}
                    targetProps={{ fieldLabel: "Записей на странице" }}
                    mobileTitle="Записей на странице"
                />
            </div>
        </PaginationExtended>
    );
};
