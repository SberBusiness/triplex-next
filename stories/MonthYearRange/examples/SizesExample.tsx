import React, { useState } from "react";
import {
    ButtonIcon,
    MonthYearField,
    MonthYearRange,
    EMonthYearRangeShiftUnit,
    IMonthYearRangeButtonProvideProps,
    IMonthYearRangePickerProvideProps,
    TMonthYearRangeValue,
    EComponentSize,
} from "@sberbusiness/triplex-next";

export const SizesExample = () => {
    const [valueSM, setValueSM] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);
    const [valueMD, setValueMD] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);
    const [valueLG, setValueLG] = useState<TMonthYearRangeValue>(["20240101", "20240301"]);

    const renderPickerSM = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="МММ ГГГГ" size={EComponentSize.SM} {...props} />
    );
    const renderPickerMD = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="МММ ГГГГ" size={EComponentSize.MD} {...props} />
    );
    const renderPickerLG = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="МММ ГГГГ" size={EComponentSize.LG} {...props} />
    );
    const renderButton = (props: IMonthYearRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ display: "flex", gap: 24, flexDirection: "column" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <MonthYearRange
                    value={valueSM}
                    onChange={setValueSM}
                    shiftAmount={1}
                    shiftUnit={EMonthYearRangeShiftUnit.MONTH}
                    renderPickerFrom={renderPickerSM}
                    renderPickerTo={renderPickerSM}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>

            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <MonthYearRange
                    value={valueMD}
                    onChange={setValueMD}
                    shiftAmount={1}
                    shiftUnit={EMonthYearRangeShiftUnit.MONTH}
                    renderPickerFrom={renderPickerMD}
                    renderPickerTo={renderPickerMD}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>

            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <MonthYearRange
                    value={valueLG}
                    onChange={setValueLG}
                    shiftAmount={1}
                    shiftUnit={EMonthYearRangeShiftUnit.MONTH}
                    renderPickerFrom={renderPickerLG}
                    renderPickerTo={renderPickerLG}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>
        </div>
    );
};
