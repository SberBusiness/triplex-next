import React, { useState } from "react";
import { ChipMonthYearPicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const WithCustomDisplayedValueExample = () => {
    const [value, setValue] = useState("19700101");
    return (
        <ChipMonthYearPicker
            value={value}
            label="MonthYear label"
            placeholder="Select to proceed"
            onChange={setValue}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.MD}
            displayedValue="MonthYear value"
        />
    );
};
