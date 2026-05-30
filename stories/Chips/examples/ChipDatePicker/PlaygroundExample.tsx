import React, { useState } from "react";
import { ChipDatePicker } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof ChipDatePicker>) => {
    const [value, setValue] = useState("");

    return <ChipDatePicker {...args} value={value} onChange={setValue} />;
};
