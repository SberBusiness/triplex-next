import React from "react";
import { MobileView } from "@sberbusiness/triplex-next";

export const MobileViewExample = () => (
    <MobileView fallback={<div>Десктоп: ширина экрана 768px и более</div>}>
        <div>Мобильный: ширина экрана менее 768px</div>
    </MobileView>
);
