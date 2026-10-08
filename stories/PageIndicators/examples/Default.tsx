import React, { useState } from "react";
import { PageIndicators } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <PageIndicators
            count={5}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            aria-label="Страницы"
            indicatorProps={({ page }) => ({ "aria-label": `Страница ${page}` })}
        />
    );
};
