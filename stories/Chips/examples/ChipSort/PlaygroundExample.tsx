import React, { useState } from "react";
import { ChipSort, type ISelectFieldOption } from "@sberbusiness/triplex-next";

export type ChipSortPlaygroundArgs = Omit<React.ComponentProps<typeof ChipSort>, "defaultValue"> & {
    /** Индекс опции в демо-списке для дефолта (контроль Storybook). */
    defaultValue: number;
};

export const PlaygroundExample = (args: ChipSortPlaygroundArgs) => {
    const options: ISelectFieldOption[] = [
        { id: "chip-sort-1", label: "По дате", value: "i1" },
        { id: "chip-sort-2", label: "По времени", value: "i2" },
        { id: "chip-sort-3", label: "По названию", value: "i3" },
    ];

    const [value, setValue] = useState<ISelectFieldOption>(options[0]);
    const defaultValue =
        args.defaultValue !== undefined && args.defaultValue !== null ? options[args.defaultValue] : undefined;

    return <ChipSort {...args} defaultValue={defaultValue} value={value} options={options} onChange={setValue} />;
};
