import React, { useState } from "react";
import {
    DateField,
    DateRange,
    IDateRangePickerProvideProps,
    TDateRangeValue,
    FormFieldMaskedInput,
} from "@sberbusiness/triplex-next";

export const WithoutNavigationExample = () => {
    const [value, setValue] = useState<TDateRangeValue>(["", ""]);
    const renderPicker = (props: IDateRangePickerProvideProps) => (
        <DateField
            label="Label"
            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.date}
            invalidDateHint="Указана недоступная для выбора дата."
            {...props}
        />
    );

    return (
        <div style={{ maxWidth: "300px" }}>
            <DateRange
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
