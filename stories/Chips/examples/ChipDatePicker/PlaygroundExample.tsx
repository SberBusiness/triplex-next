import React, { useState } from "react";
import { ChipDatePicker, EFormFieldStatus } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof ChipDatePicker>) => {
    const [value, setValue] = useState("");

    return (
        <ChipDatePicker
            value={value}
            label={args.label}
            onChange={setValue}
            displayedValue={args.displayedValue || null}
            size={args.size}
            status={EFormFieldStatus.DEFAULT}
            disabled={args.disabled}
        />
    );
};
