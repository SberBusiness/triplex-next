import React, { useState } from "react";
import {
    ButtonIcon,
    DateField,
    DateRange,
    FormFieldMaskedInput,
    type IDateRangeButtonProvideProps,
    type IDateRangePickerProvideProps,
    type TDateRangeValue,
} from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof DateRange>) => {
    const [value, setValue] = useState<TDateRangeValue>(["", ""]);
    const renderPicker = (props: IDateRangePickerProvideProps) => (
        <DateField
            label="Label"
            placeholderMask={FormFieldMaskedInput.presets.placeholderMasks.date}
            invalidDateHint="Указана недоступная для выбора дата."
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
        <div style={{ maxWidth: "400px" }}>
            <DateRange
                {...args}
                value={value}
                onChange={setValue}
                renderPickerFrom={renderPicker}
                renderPickerTo={renderPicker}
                renderButtonBack={renderButtonBack}
                renderButtonForward={renderButtonForward}
            />
        </div>
    );
};
