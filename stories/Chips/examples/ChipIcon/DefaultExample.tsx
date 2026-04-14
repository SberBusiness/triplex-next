import React, { useState } from "react";
import { ChipIcon } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export const DefaultExample = () => {
    const [selected, setSelected] = useState(false);

    return (
        <ChipIcon selected={selected} onClick={() => setSelected((s) => !s)}>
            <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
        </ChipIcon>
    );
};
