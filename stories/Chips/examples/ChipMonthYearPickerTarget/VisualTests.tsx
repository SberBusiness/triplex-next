import React from "react";
import moment from "moment";
import { action } from "storybook/actions";
import {
    ChipMonthYearPickerTarget,
    DatePickerExtended,
    EButtonIconShape,
    ECalendarPickType,
    EChipType,
    IChipMonthYearPickerTargetProps,
} from "@sberbusiness/triplex-next";

const LIMIT_RANGE = { dateFrom: moment("20230101"), dateTo: moment("20251231") };

const Target = (props: IChipMonthYearPickerTargetProps) => (
    <DatePickerExtended
        pickType={ECalendarPickType.MONTH_YEAR}
        defaultViewDate="20240101"
        pickedDate={props.selected ? "20240101" : null}
        limitRange={LIMIT_RANGE}
        onDateChange={action("onDateChange")}
        renderTarget={() => <ChipMonthYearPickerTarget {...props} />}
        renderDropdownHeaderTarget={() => props.children}
    />
);

export const VisualTests = () => (
    <div style={{ width: 480, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
        <div>
            <div style={{ marginBottom: 8 }}>Фокус, TYPE_2</div>
            <Target type={EChipType.TYPE_2} onClear={action("onClear")}>
                Фокус
            </Target>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Hover, выбранный</div>
            <Target
                selected
                data-testid="month-target-hover"
                onClear={action("onClear")}
                clearButtonProps={{ "aria-label": "Очистить hover" }}
            >
                Январь 2024
            </Target>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Disabled</div>
            <Target disabled onClear={action("onClear")}>
                Выберите месяц
            </Target>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Disabled, выбранный, TYPE_2</div>
            <Target
                selected
                disabled
                type={EChipType.TYPE_2}
                onClear={action("onClear")}
                clearButtonProps={{ "aria-label": "Очистить disabled" }}
            >
                Январь 2024
            </Target>
        </div>
        <div>
            <div style={{ marginBottom: 8 }}>Круглая активная кнопка очистки</div>
            <Target
                selected
                onClear={action("onClear")}
                clearButtonProps={{ "aria-label": "Очистить период", shape: EButtonIconShape.CIRCLE, active: true }}
            >
                Январь 2024
            </Target>
        </div>
    </div>
);
