import React, { useState } from "react";
import { Chip } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof Chip>) => {
    const [selected, setSelected] = useState(false);

    return (
        <Chip {...args} selected={selected} onClick={() => setSelected((s) => !s)}>
            Value
        </Chip>
    );
};
