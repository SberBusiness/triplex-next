import React, { useState } from "react";
import moment from "moment";
import { SortStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { ChipMonthYearPickerTarget, DatePickerExtended, ECalendarPickType } from "@sberbusiness/triplex-next";

const DEFAULT_VIEW_DATE = "20240101";
const LIMIT_RANGE = { dateFrom: moment("20230101"), dateTo: moment("20251231") };

export const WithPrefixAndPostfix = () => {
    const [pickedDate, setPickedDate] = useState<moment.Moment | null>(null);
    const label = pickedDate ? pickedDate.format("MMM YYYY") : "Отчётный месяц";

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
                        prefix={<SortStrokeSrvIcon20 paletteIndex={pickedDate !== null ? 6 : 5} />}
                        postfix={<SortStrokeSrvIcon20 paletteIndex={pickedDate !== null ? 6 : 5} />}
                        showNotificationIcon
                    >
                        {label}
                    </ChipMonthYearPickerTarget>
                )}
                renderDropdownHeaderTarget={() => label}
            />
        </div>
    );
};
