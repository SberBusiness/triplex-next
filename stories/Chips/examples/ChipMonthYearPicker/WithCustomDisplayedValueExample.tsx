import React, { useState } from "react";
import { ChipMonthYearPicker, EComponentSize, EDropdownAlignment } from "@sberbusiness/triplex-next";

export const WithCustomDisplayedValueExample = () => {
    const [value, setValue] = useState("");
    return (
        <ChipMonthYearPicker
            value={value}
            label="MonthYear label"
            placeholder="мм.гггг"
            onChange={setValue}
            alignment={EDropdownAlignment.LEFT}
            size={EComponentSize.MD}
            displayedValue="MonthYear value"
        />
    );
};
