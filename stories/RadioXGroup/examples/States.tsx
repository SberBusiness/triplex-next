import React from "react";
import { Radio, RadioXGroup } from "@sberbusiness/triplex-next";

export const States = () => {
    const name = React.useId();
    const [value, setValue] = React.useState("second");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 480, maxWidth: "100%" }}>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Selected</div>
                <RadioXGroup aria-label="Выбранный вариант">
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
                </RadioXGroup>
            </div>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Disabled</div>
                <RadioXGroup aria-label="Отключённые варианты">
                    <Radio name={`${name}-disabled`} value="checked" disabled defaultChecked>
                        Radio text
                    </Radio>
                    <Radio name={`${name}-disabled`} value="unchecked" disabled>
                        Radio text
                    </Radio>
                </RadioXGroup>
            </div>
        </div>
    );
};
