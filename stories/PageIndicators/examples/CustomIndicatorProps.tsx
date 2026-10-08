import React, { useState } from "react";
import { PageIndicators, TPageIndicatorPropsFactory } from "@sberbusiness/triplex-next";

const PAGES_COUNT = 5;

/** Свойства каждого индикатора вычисляются из его состояния: индекса, номера страницы и активности. */
const getIndicatorProps: TPageIndicatorPropsFactory = ({ index, page, selected }) => ({
    id: `page-tab-${index}`,
    "aria-label": `Страница ${page}`,
    "aria-controls": "page-panel",
    title: selected ? `Страница ${page} (текущая)` : `Страница ${page}`,
    // data-атрибуты удобны для e2e-тестов и аналитики.
    "data-page": page,
    "data-selected": selected,
});

export const CustomIndicatorProps = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <PageIndicators
                count={PAGES_COUNT}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                aria-label="Страницы"
                indicatorProps={getIndicatorProps}
            />
            <div id="page-panel" role="tabpanel" aria-labelledby={`page-tab-${activeIndex}`}>
                Содержимое страницы {activeIndex + 1} из {PAGES_COUNT}
            </div>
        </div>
    );
};
