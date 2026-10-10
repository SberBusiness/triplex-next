import React, { useState } from "react";
import { PageIndicators } from "@sberbusiness/triplex-next";

/**
 * Одновременно видно окно из 5 индикаторов. Если за окном есть ещё страницы,
 * крайние индикаторы окна уменьшаются; при переключении окно сдвигается за активным.
 */
export const ManyPages = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <PageIndicators
            count={12}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            aria-label="Страницы"
            indicatorProps={({ page }) => ({ "aria-label": `Страница ${page}` })}
        />
    );
};
