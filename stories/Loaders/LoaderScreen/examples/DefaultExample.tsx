import React from "react";
import { LoaderScreen, EComponentSize } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <div style={{ position: "relative", height: "200px", width: "300px" }}>
        <LoaderScreen type="small" size={EComponentSize.MD} />
    </div>
);
