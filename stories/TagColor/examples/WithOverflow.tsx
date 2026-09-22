import React from "react";
import { TagColor, EComponentSize } from "@sberbusiness/triplex-next";

export const WithOverflow = () => (
    <div style={{ maxWidth: 400 }}>
        <TagColor size={EComponentSize.LG}>Very long tag text that should be truncated with ellipsis</TagColor>
    </div>
);
