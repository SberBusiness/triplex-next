import React from "react";
import { action } from "storybook/actions";
import { Radio, RadioXGroup } from "@sberbusiness/triplex-next";

export const VisualTests = () => {
    const name = React.useId();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 480, maxWidth: "100%" }}>
            <div>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>Клавиатурный фокус</div>
                <RadioXGroup aria-label="Клавиатурный фокус" tabIndex={-1}>
                    <Radio name={`${name}-focus`} value="focused" onChange={action("onChange")}>
                        Radio text
                    </Radio>
                    <Radio name={`${name}-focus`} value="other" onChange={action("onChange")}>
                        Radio text
                    </Radio>
                </RadioXGroup>
            </div>
            <div>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>Наведение на выбранный Radio</div>
                <RadioXGroup aria-label="Наведение">
                    <Radio name={`${name}-hover`} value="hovered" defaultChecked onChange={action("onChange")}>
                        Radio text
                    </Radio>
                    <Radio name={`${name}-hover`} value="other" onChange={action("onChange")}>
                        Radio text
                    </Radio>
                </RadioXGroup>
            </div>
        </div>
    );
};
