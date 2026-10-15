import React from "react";
import { Radio } from "@sberbusiness/triplex-next";

export const States = () => {
    const name = React.useId();
    const [value, setValue] = React.useState("second");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Selected</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
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
                </div>
            </div>
            <div>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>Disabled</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    <Radio name={`${name}-disabled`} value="checked" disabled defaultChecked>
                        Radio text
                    </Radio>
                    <Radio name={`${name}-disabled`} value="unchecked" disabled>
                        Radio text
                    </Radio>
                </div>
            </div>
        </div>
    );
};
