import React, { useState } from "react";
import { Chip, ChipGroup } from "@sberbusiness/triplex-next";

interface IPlaygroundArgs extends React.ComponentProps<typeof ChipGroup> {
    size: React.ComponentProps<typeof Chip>["size"];
}

export const PlaygroundExample = (args: IPlaygroundArgs) => {
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
