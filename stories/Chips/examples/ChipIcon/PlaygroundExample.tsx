import React, { useState } from "react";
import { ChipIcon } from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof ChipIcon>) => {
    const [selected, setSelected] = useState(false);

    return (
        <ChipIcon {...args} selected={selected} onClick={() => setSelected((s) => !s)}>
            <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
        </ChipIcon>
    );
};
