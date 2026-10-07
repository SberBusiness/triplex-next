import React from "react";
import { Radio, RadioXGroup, TIndentSize } from "@sberbusiness/triplex-next";

const INDENTS = [12, 16, 20, 24, 28, 32] satisfies TIndentSize[];

export const Indents = () => {
    const name = React.useId();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 480, maxWidth: "100%" }}>
            {INDENTS.map((indent) => (
                <div key={indent}>
                    <div style={{ marginBottom: 8, fontWeight: 700 }}>indent = {indent}</div>
                    <RadioXGroup indent={indent} aria-label={`Способ доставки, отступ ${indent}`}>
                        <Radio name={`${name}-${indent}`} value="courier" defaultChecked>
                            Курьер
                        </Radio>
                        <Radio name={`${name}-${indent}`} value="pickup">
                            Самовывоз
                        </Radio>
                        <Radio name={`${name}-${indent}`} value="post">
                            Почта
                        </Radio>
                    </RadioXGroup>
                </div>
            ))}
        </div>
    );
};
