import React from "react";
import { MediaWidth, EScreenWidth } from "@sberbusiness/triplex-next";

export const MinWidthExample = () => (
    <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={<div>Fallback: ширина экрана менее 768px</div>}>
        <div>Контент виден на экранах шириной 768px и более</div>
    </MediaWidth>
);
