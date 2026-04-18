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
    EComponentSize,
} from "@sberbusiness/triplex-next";

export const SizesExample = () => {
    const [valueSM, setValueSM] = useState<TDateRangeValue>(["20240101", "20240131"]);
    const [valueMD, setValueMD] = useState<TDateRangeValue>(["20240101", "20240131"]);
    const [valueLG, setValueLG] = useState<TDateRangeValue>(["20240101", "20240131"]);

    const renderPickerSM = (props: IDateRangePickerProvideProps) => (
        <DateField
            label="Label"
            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.date}
            invalidDateHint="Указана недоступная для выбора дата."
            size={EComponentSize.SM}
            {...props}
        />
    );
    const renderPickerMD = (props: IDateRangePickerProvideProps) => (
        <DateField
            label="Label"
            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.date}
            invalidDateHint="Указана недоступная для выбора дата."
            size={EComponentSize.MD}
            {...props}
        />
    );

    const renderPickerLG = (props: IDateRangePickerProvideProps) => (
        <DateField
            label="Label"
            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.date}
            invalidDateHint="Указана недоступная для выбора дата."
            size={EComponentSize.LG}
            {...props}
        />
    );
    const renderButton = (props: IDateRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ display: "flex", gap: 24, flexDirection: "column" }}>
            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>SM</div>
                <DateRange
                    value={valueSM}
                    onChange={setValueSM}
                    shiftAmount={1}
                    shiftUnit={EDateRangeShiftUnit.MONTH}
                    renderPickerFrom={renderPickerSM}
                    renderPickerTo={renderPickerSM}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>

            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>MD</div>
                <DateRange
                    value={valueMD}
                    onChange={setValueMD}
                    shiftAmount={1}
                    shiftUnit={EDateRangeShiftUnit.MONTH}
                    renderPickerFrom={renderPickerMD}
                    renderPickerTo={renderPickerMD}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>

            <div>
                <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>LG</div>
                <DateRange
                    value={valueLG}
                    onChange={setValueLG}
                    shiftAmount={1}
                    shiftUnit={EDateRangeShiftUnit.MONTH}
                    renderPickerFrom={renderPickerLG}
                    renderPickerTo={renderPickerLG}
                    renderButtonBack={renderButton}
                    renderButtonForward={renderButton}
                />
            </div>
        </div>
    );
};
