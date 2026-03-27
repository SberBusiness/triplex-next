import React from "react";
import { MediaWidth } from "@sberbusiness/triplex-next";

export const FallbackExample = () => (
    <MediaWidth fallback={<div>Fallback отображается всегда, если не заданы minWidth и maxWidth</div>}>
        {null}
    </MediaWidth>
);
