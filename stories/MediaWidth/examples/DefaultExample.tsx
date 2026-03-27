import React from "react";
import { MediaWidth, EScreenWidth } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <MediaWidth
        minWidth={EScreenWidth.MD_MIN}
        maxWidth={EScreenWidth.LG_MAX}
        fallback={<div>Fallback: ширина экрана за пределами диапазона 768px–1199px</div>}
    >
        <div>Контент виден только на экранах шириной от 768px до 1199px включительно</div>
    </MediaWidth>
);
