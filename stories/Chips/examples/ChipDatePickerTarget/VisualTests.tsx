import React from "react";
import { action } from "storybook/actions";
import { ChipDatePickerTarget, EChipType } from "@sberbusiness/triplex-next";

export const VisualTests = () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
        <div>
            <div style={{ marginBottom: 8 }}>Фокус с клавиатуры</div>
            <ChipDatePickerTarget data-testid="focus-target" onClear={action("onClear")}>
                Выберите дату
            </ChipDatePickerTarget>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Selected + hover, TYPE_2</div>
            <ChipDatePickerTarget
                data-testid="hover-target"
                type={EChipType.TYPE_2}
                selected
                onClear={action("onClear")}
            >
                15.01.1970
            </ChipDatePickerTarget>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Disabled</div>
            <ChipDatePickerTarget disabled onClear={action("onClear")}>
                Выберите дату
            </ChipDatePickerTarget>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Selected + disabled</div>
            <ChipDatePickerTarget selected disabled onClear={action("onClear")}>
                15.01.1970
            </ChipDatePickerTarget>
        </div>
    </div>
);
