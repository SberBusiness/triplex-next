import React from "react";
import { MediaWidth, EScreenWidth } from "@sberbusiness/triplex-next";

export const MaxWidthExample = () => (
    <MediaWidth maxWidth={EScreenWidth.LG_MAX} fallback={<div>Fallback: ширина экрана более 1199px</div>}>
        <div>Контент виден на экранах шириной до 1199px включительно</div>
    </MediaWidth>
);
