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
    const [valueSM, setValueSM] = useState<TDateRangeValue>(["", ""]);
    const [valueMD, setValueMD] = useState<TDateRangeValue>(["", ""]);
    const [valueLG, setValueLG] = useState<TDateRangeValue>(["", ""]);

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
    const renderButtonBack = (props: IDateRangeButtonProvideProps) => (
        <ButtonIcon aria-label="Предыдущий период" {...props} />
    );
    const renderButtonForward = (props: IDateRangeButtonProvideProps) => (
        <ButtonIcon aria-label="Следующий период" {...props} />
    );

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
                    renderButtonBack={renderButtonBack}
                    renderButtonForward={renderButtonForward}
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
                    renderButtonBack={renderButtonBack}
                    renderButtonForward={renderButtonForward}
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
                    renderButtonBack={renderButtonBack}
                    renderButtonForward={renderButtonForward}
                />
            </div>
        </div>
    );
};
