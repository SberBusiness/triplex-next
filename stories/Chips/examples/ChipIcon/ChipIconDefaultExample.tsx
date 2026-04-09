import React, { useState } from "react";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { ChipIcon } from "@sberbusiness/triplex-next";

export const ChipIconDefaultExample = () => {
    const [selected, setSelected] = useState(false);
    return (
        <ChipIcon selected={selected} onClick={() => setSelected((s) => !s)}>
            <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
        </ChipIcon>
    );
};
