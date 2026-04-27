import React, { useState } from "react";
import {
    MonthYearField,
    MonthYearRange,
    IMonthYearRangePickerProvideProps,
    TMonthYearRangeValue,
} from "@sberbusiness/triplex-next";

export const WithoutNavigationExample = () => {
    const [value, setValue] = useState<TMonthYearRangeValue>(["", ""]);
    const renderPicker = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="МММ ГГГГ" {...props} />
    );

    return (
        <div style={{ maxWidth: "300px" }}>
            <MonthYearRange
                value={value}
                onChange={setValue}
                hideNavigation
                renderPickerFrom={renderPicker}
                renderPickerTo={renderPicker}
                renderButtonBack={() => null}
                renderButtonForward={() => null}
            />
        </div>
    );
};
