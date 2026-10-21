import React, { useState } from "react";
import moment from "moment";
import { ChipMonthYearPickerTarget, DatePickerExtended, ECalendarPickType } from "@sberbusiness/triplex-next";

const DEFAULT_VIEW_DATE = "20240101";
const LIMIT_RANGE = { dateFrom: moment("20230101"), dateTo: moment("20251231") };

export const Default = () => {
    const [pickedDate, setPickedDate] = useState<moment.Moment | null>(null);
    const label = pickedDate ? pickedDate.format("MMM YYYY") : "Выберите месяц";

    return (
        <div style={{ width: 320 }}>
            <DatePickerExtended
                pickType={ECalendarPickType.MONTH_YEAR}
                defaultViewDate={DEFAULT_VIEW_DATE}
                pickedDate={pickedDate}
                limitRange={LIMIT_RANGE}
                onDateChange={setPickedDate}
                renderTarget={() => (
                    <ChipMonthYearPickerTarget
                        selected={pickedDate !== null}
                        onClear={() => setPickedDate(null)}
                        clearButtonProps={{ "aria-label": "Очистить месяц" }}
                    >
                        {label}
                    </ChipMonthYearPickerTarget>
                )}
                renderDropdownHeaderTarget={() => label}
            />
        </div>
    );
};
