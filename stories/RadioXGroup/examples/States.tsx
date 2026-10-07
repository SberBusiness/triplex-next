import React from "react";
import { Radio, RadioXGroup } from "@sberbusiness/triplex-next";

export const States = () => {
    const name = React.useId();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 480, maxWidth: "100%" }}>
            <div>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>Доступные Radio</div>
                <RadioXGroup aria-label="Доступные варианты">
                    <Radio name={`${name}-enabled`} value="checked" defaultChecked>
                        Выбран
                    </Radio>
                    <Radio name={`${name}-enabled`} value="unchecked">
                        Не выбран
                    </Radio>
                </RadioXGroup>
            </div>
            <div>
                <div style={{ marginBottom: 8, fontWeight: 700 }}>Отключённые Radio</div>
                <RadioXGroup aria-label="Отключённые варианты">
                    <Radio name={`${name}-disabled`} value="checked" disabled defaultChecked>
                        Выбран
                    </Radio>
                    <Radio name={`${name}-disabled`} value="unchecked" disabled>
                        Не выбран
                    </Radio>
                </RadioXGroup>
            </div>
        </div>
    );
};
