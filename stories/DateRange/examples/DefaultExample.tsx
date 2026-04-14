import React, { useState } from "react";
import {
    ButtonIcon,
    DateField,
    DateRange,
    EDateRangeShiftUnit,
    IDateRangeButtonProvideProps,
    IDateRangePickerProvideProps,
    TDateRangeValue,
    FormFieldMaskedInput,
} from "@sberbusiness/triplex-next";

export const DefaultExample = () => {
    const [value, setValue] = useState<TDateRangeValue>(["20240101", "20240131"]);
    const renderPicker = (props: IDateRangePickerProvideProps) => (
        <DateField
            label="Label"
            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.date}
            invalidDateHint="Указана недоступная для выбора дата."
            {...props}
        />
    );
    const renderButton = (props: IDateRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ maxWidth: "400px" }}>
            <DateRange
                value={value}
                onChange={setValue}
                shiftAmount={1}
                shiftUnit={EDateRangeShiftUnit.MONTH}
                renderPickerFrom={renderPicker}
                renderPickerTo={renderPicker}
                renderButtonBack={renderButton}
                renderButtonForward={renderButton}
            />
        </div>
    );
};
