import React, { useState } from "react";
import { PageIndicators, EOrientation } from "@sberbusiness/triplex-next";

interface IOrientationItemProps {
    orientation: EOrientation;
}

const OrientationItem = ({ orientation }: IOrientationItemProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{orientation.toUpperCase()}</div>
            <PageIndicators
                count={5}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                orientation={orientation}
                aria-label="Страницы"
                indicatorProps={({ page }) => ({ "aria-label": `Страница ${page}` })}
            />
        </div>
    );
};

const ORIENTATIONS = Object.values(EOrientation);

export const Orientations = () => (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
        {ORIENTATIONS.map((orientation) => (
            <OrientationItem key={orientation} orientation={orientation} />
        ))}
    </div>
);
