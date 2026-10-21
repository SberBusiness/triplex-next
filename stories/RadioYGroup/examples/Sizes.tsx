import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import { EComponentSize, Radio, RadioYGroup } from "@sberbusiness/triplex-next";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const Sizes = () => {
    const [name] = useState(() => uniqueId("radio-y-group-sizes-"));

    return (
        <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
            {SIZES.map((size) => (
                <div key={size} style={{ width: 180 }}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                    <RadioYGroup aria-label={`Варианты размера ${size.toUpperCase()}`}>
                        <Radio name={`${name}-${size}`} value="first" size={size}>
                            Radio text
                        </Radio>
                        <Radio name={`${name}-${size}`} value="second" size={size} defaultChecked>
                            Radio text
                        </Radio>
                        <Radio name={`${name}-${size}`} value="third" size={size}>
                            Radio text
                        </Radio>
                    </RadioYGroup>
                </div>
            ))}
        </div>
    );
};
