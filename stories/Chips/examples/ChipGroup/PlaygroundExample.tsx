import React, { useState } from "react";
import { ChipGroup, Chip } from "@sberbusiness/triplex-next";

export interface PlaygroundArgs extends Pick<React.ComponentProps<typeof ChipGroup>, "size" | "oneLine"> {}

export const PlaygroundExample = (args: PlaygroundArgs) => {
    const [selected, setSelected] = useState<number | null>(null);
    const chips = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta"];

    return (
        <ChipGroup {...args} style={{ maxWidth: 360 }}>
            {chips.map((label, index) => (
                <Chip key={label} size={args.size} selected={selected === index} onClick={() => setSelected(index)}>
                    {label}
                </Chip>
            ))}
        </ChipGroup>
    );
};
