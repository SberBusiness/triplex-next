import React, { useState } from "react";
import { ChipOptions } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof ChipOptions>) => {
    const [count, setCount] = useState(0);

    return (
        <ChipOptions
            {...args}
            selected={count > 0}
            onClick={() => setCount((c) => c + 1)}
            clearSelected={() => setCount(0)}
        >
            {count > 0 ? count : undefined}
        </ChipOptions>
    );
};
