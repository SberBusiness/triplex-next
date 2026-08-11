import React from "react";
import { MobileView } from "@sberbusiness/triplex-next";

export const Default = () => (
    <MobileView
        fallback={
            <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
                Десктопная версия: ширина окна браузера 768px и больше.
            </div>
        }
    >
        <div style={{ border: "1px dashed rgb(125, 131, 138)", borderRadius: "4px", padding: "16px" }}>
            Мобильная версия: ширина окна браузера меньше 768px.
        </div>
    </MobileView>
);
