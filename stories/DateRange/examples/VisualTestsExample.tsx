import React from "react";
import {
    ButtonIcon,
    DateField,
    DateRange,
    EDateRangeShiftUnit,
    FormFieldMaskedInput,
    type IDateRangeButtonProvideProps,
    type IDateRangePickerProvideProps,
} from "@sberbusiness/triplex-next";

export const VisualTestsExample = () => {
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
                value={["20260322", "20260322"]}
                onChange={() => {}}
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
