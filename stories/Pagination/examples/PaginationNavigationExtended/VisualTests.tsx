import React from "react";
import { action } from "storybook/actions";
import {
    EPaginationNavigationIconDirection,
    PaginationNavigationButton,
    PaginationNavigationExtended,
    PaginationNavigationExtendedItem,
    PaginationPageButton,
} from "@sberbusiness/triplex-next";

const PAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 400 }}>
        <div>
            <div style={{ marginBottom: 8 }}>Одна страница, обе кнопки навигации disabled</div>
            <PaginationNavigationExtended aria-label="Одна страница">
                <PaginationNavigationExtendedItem>
                    <PaginationNavigationButton
                        direction={EPaginationNavigationIconDirection.BACK}
                        aria-label="Предыдущая страница"
                        disabled
                        onClick={action("onPreviousPageClick")}
                    />
                </PaginationNavigationExtendedItem>
                <PaginationNavigationExtendedItem>
                    <PaginationPageButton isCurrent aria-current="page" onClick={action("onPageClick")}>
                        1
                    </PaginationPageButton>
                </PaginationNavigationExtendedItem>
                <PaginationNavigationExtendedItem>
                    <PaginationNavigationButton
                        direction={EPaginationNavigationIconDirection.NEXT}
                        aria-label="Следующая страница"
                        disabled
                        onClick={action("onNextPageClick")}
                    />
                </PaginationNavigationExtendedItem>
            </PaginationNavigationExtended>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Пустой список</div>
            <PaginationNavigationExtended aria-label="Пустой список страниц" />
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Длинный список</div>
            <PaginationNavigationExtended aria-label="Двенадцать страниц">
                {PAGES.map((page) => (
                    <PaginationNavigationExtendedItem key={page}>
                        <PaginationPageButton
                            isCurrent={page === 6}
                            aria-current={page === 6 ? "page" : undefined}
                            onClick={action("onPageClick")}
                        >
                            {page}
                        </PaginationPageButton>
                    </PaginationNavigationExtendedItem>
                ))}
            </PaginationNavigationExtended>
        </div>
    </div>
);
