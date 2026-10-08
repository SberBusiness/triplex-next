import React from "react";
import { action } from "storybook/actions";
import { PageIndicators, EOrientation, TPageIndicatorPropsFactory } from "@sberbusiness/triplex-next";

const getIndicatorProps: TPageIndicatorPropsFactory = ({ page }) => ({ "aria-label": `Страница ${page}` });

const getDisabledIndicatorProps: TPageIndicatorPropsFactory = ({ page }) => ({
    "aria-label": `Страница ${page}`,
    disabled: true,
});

interface IVisualTestsItemProps {
    title: string;
    count: number;
    activeIndex: number;
    orientation?: EOrientation;
    indicatorProps?: TPageIndicatorPropsFactory;
}

const VisualTestsItem = ({
    title,
    count,
    activeIndex,
    orientation,
    indicatorProps = getIndicatorProps,
}: IVisualTestsItemProps) => (
    <div>
        <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{title}</div>
        <PageIndicators
            count={count}
            activeIndex={activeIndex}
            onChange={action("onChange")}
            orientation={orientation}
            aria-label={title}
            indicatorProps={indicatorProps}
        />
    </div>
);

/**
 * Статичные состояния для скриншот-регрессии. Первый ряд получает фокус
 * через `play` (Tab), поэтому он должен оставаться первым в DOM.
 */
export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <VisualTestsItem title="Focus" count={5} activeIndex={2} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
            <VisualTestsItem title="3 pages" count={3} activeIndex={0} />
            <VisualTestsItem title="5 pages, last active" count={5} activeIndex={4} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
            <VisualTestsItem title="12 pages, start" count={12} activeIndex={0} />
            <VisualTestsItem title="12 pages, middle" count={12} activeIndex={5} />
            <VisualTestsItem title="12 pages, end" count={12} activeIndex={11} />
        </div>
        <VisualTestsItem title="Disabled" count={12} activeIndex={5} indicatorProps={getDisabledIndicatorProps} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
            <VisualTestsItem title="Vertical, 5 pages" count={5} activeIndex={1} orientation={EOrientation.VERTICAL} />
            <VisualTestsItem
                title="Vertical, 12 pages, middle"
                count={12}
                activeIndex={5}
                orientation={EOrientation.VERTICAL}
            />
            <VisualTestsItem
                title="Vertical, 12 pages, end"
                count={12}
                activeIndex={11}
                orientation={EOrientation.VERTICAL}
            />
        </div>
    </div>
);
