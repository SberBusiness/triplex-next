import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import { Radio, RadioYGroup } from "@sberbusiness/triplex-next";

export const Selected = () => {
    const [name] = useState(() => uniqueId("radio-y-group-selected-"));
    const [value, setValue] = useState("standard");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <RadioYGroup aria-label="Выберите тариф">
            <Radio name={name} value="basic" checked={value === "basic"} onChange={handleChange}>
                Radio text
            </Radio>
            <Radio name={name} value="standard" checked={value === "standard"} onChange={handleChange}>
                Radio text
            </Radio>
            <Radio name={name} value="extended" checked={value === "extended"} onChange={handleChange}>
                Radio text
            </Radio>
        </RadioYGroup>
    );
};
