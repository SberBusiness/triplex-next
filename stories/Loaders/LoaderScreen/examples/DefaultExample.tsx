import React from "react";
import { LoaderScreen, ELoaderSmallTheme, EComponentSize } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ position: "relative", height: "200px", width: "300px" }}>
        <LoaderScreen type="small" theme={ELoaderSmallTheme.BRAND} size={EComponentSize.MD} />
    </div>
);
