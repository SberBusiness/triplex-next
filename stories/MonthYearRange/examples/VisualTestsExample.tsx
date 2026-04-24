import React from "react";
import {
    ButtonIcon,
    MonthYearField,
    MonthYearRange,
    EMonthYearRangeShiftUnit,
    type IMonthYearRangeButtonProvideProps,
    type IMonthYearRangePickerProvideProps,
} from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => {
    const renderPicker = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="МММ ГГГГ" {...props} />
    );
    const renderButton = (props: IMonthYearRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ maxWidth: "400px" }}>
            <MonthYearRange
                value={["20260301", "20260301"]}
                onChange={() => {}}
                shiftAmount={1}
                shiftUnit={EMonthYearRangeShiftUnit.MONTH}
                renderPickerFrom={renderPicker}
                renderPickerTo={renderPicker}
                renderButtonBack={renderButton}
                renderButtonForward={renderButton}
            />
        </div>
    );
};
