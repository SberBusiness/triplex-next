import React, { useEffect, useRef, useState } from "react";
import { ChipSort, EComponentSize, type ISelectFieldOption } from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => {
    const options: ISelectFieldOption[] = [
        { id: "chip-sort-1", label: "По дате", value: "i1" },
        { id: "chip-sort-2", label: "По времени", value: "i2" },
        { id: "chip-sort-3", label: "По названию", value: "i3" },
    ];

    const [valueSM, setValueSM] = useState<ISelectFieldOption>(options[0]);
    const [valueMD, setValueMD] = useState<ISelectFieldOption>(options[0]);
    const [valueLG, setValueLG] = useState<ISelectFieldOption>(options[0]);

    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const targets = rootRef.current?.querySelectorAll<HTMLElement>('[role="combobox"]');
        targets?.forEach((el) => el.click());
    }, []);

    return (
        <div
            ref={rootRef}
            style={{ display: "flex", maxWidth: 600, alignItems: "flex-start", justifyContent: "space-between" }}
        >
            <ChipSort
                defaultValue={options[0]}
                size={EComponentSize.SM}
                value={valueSM}
                options={options}
                onChange={setValueSM}
            />
            <ChipSort
                defaultValue={options[0]}
                size={EComponentSize.MD}
                value={valueMD}
                options={options}
                onChange={setValueMD}
            />
            <ChipSort
                defaultValue={options[0]}
                size={EComponentSize.LG}
                value={valueLG}
                options={options}
                onChange={setValueLG}
            />
        </div>
    );
};
