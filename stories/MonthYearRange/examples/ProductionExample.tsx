import React, { useState } from "react";
import {
    ButtonIcon,
    MonthYearField,
    MonthYearRange,
    EMonthYearRangeShiftUnit,
    IMonthYearRangeButtonProvideProps,
    IMonthYearRangePickerProvideProps,
    TMonthYearRangeValue,
    HelpBox,
    ETooltipSize,
} from "@sberbusiness/triplex-next";

export const ProductionExample = () => {
    const [value, setValue] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);

    const renderPicker = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField
            label="Label"
            placeholder="МММ ГГГГ"
            targetProps={{ postfix: <HelpBox tooltipSize={ETooltipSize.SM}>HelpBox text</HelpBox>, inputProps: {} }}
            {...props}
        />
    );
    const renderButton = (props: IMonthYearRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ maxWidth: 660 }}>
            <MonthYearRange
                value={value}
                onChange={setValue}
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
