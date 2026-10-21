import React from "react";
import { Radio, RadioXGroup, EComponentSize } from "@sberbusiness/triplex-next";

const SIZES = [EComponentSize.SM, EComponentSize.MD, EComponentSize.LG];

export const Sizes = () => {
    const name = React.useId();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 480, maxWidth: "100%" }}>
            {SIZES.map((size) => (
                <div key={size}>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{size.toUpperCase()}</div>
                    <RadioXGroup aria-label={`Способ доставки, размер Radio ${size}`}>
                        <Radio name={`${name}-${size}`} value="courier" size={size} defaultChecked>
                            Radio text
                        </Radio>
                        <Radio name={`${name}-${size}`} value="pickup" size={size}>
                            Radio text
                        </Radio>
                        <Radio name={`${name}-${size}`} value="post" size={size}>
                            Radio text
                        </Radio>
                    </RadioXGroup>
                </div>
            ))}
        </div>
    );
};
