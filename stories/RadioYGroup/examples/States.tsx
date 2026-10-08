import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import { Radio, RadioYGroup } from "@sberbusiness/triplex-next";

export const States = () => {
    const [name] = useState(() => uniqueId("radio-y-group-states-"));
    const [value, setValue] = useState("second");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Selected</div>
                <RadioYGroup aria-label="Выбранный вариант">
                    <Radio name={`${name}-selected`} value="first" checked={value === "first"} onChange={handleChange}>
                        Radio text
                    </Radio>
                    <Radio
                        name={`${name}-selected`}
                        value="second"
                        checked={value === "second"}
                        onChange={handleChange}
                    >
                        Radio text
                    </Radio>
                    <Radio name={`${name}-selected`} value="third" checked={value === "third"} onChange={handleChange}>
                        Radio text
                    </Radio>
                </RadioYGroup>
            </div>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Disabled</div>
                <RadioYGroup aria-label="Отключённые варианты">
                    <Radio name={`${name}-disabled`} value="first" disabled>
                        Radio text
                    </Radio>
                    <Radio name={`${name}-disabled`} value="second" disabled defaultChecked>
                        Radio text
                    </Radio>
                </RadioYGroup>
            </div>
        </div>
    );
};
