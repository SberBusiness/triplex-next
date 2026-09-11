import React, { useState } from "react";
import { ChipMonthYearPicker } from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof ChipMonthYearPicker>) => {
    const [value, setValue] = useState("");

    return <ChipMonthYearPicker {...args} value={value} onChange={setValue} />;
};
