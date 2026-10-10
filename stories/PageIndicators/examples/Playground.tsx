import React, { useState } from "react";
import { action } from "storybook/actions";
import { PageIndicators, IPageIndicatorsProps, EOrientation } from "@sberbusiness/triplex-next";

/** Аргументы Playground story. */
export interface IPlaygroundArgs extends Pick<IPageIndicatorsProps, "count" | "orientation"> {}

export const Playground = ({ count, orientation = EOrientation.HORIZONTAL }: IPlaygroundArgs) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // При уменьшении count через Controls активный индекс не должен выходить за границы.
    const safeActiveIndex = Math.max(0, Math.min(activeIndex, count - 1));

    const handleChange = (index: number) => {
        setActiveIndex(index);
        action("onChange")(index);
    };

    return (
        <PageIndicators
            count={count}
            activeIndex={safeActiveIndex}
            onChange={handleChange}
            orientation={orientation}
            aria-label="Страницы"
            indicatorProps={({ page }) => ({ "aria-label": `Страница ${page}` })}
        />
    );
};
