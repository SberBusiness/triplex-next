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
    const renderButton = (props: IDateRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ maxWidth: "400px" }}>
            <DateRange
                {...args}
                value={value}
                onChange={setValue}
                renderPickerFrom={renderPicker}
                renderPickerTo={renderPicker}
                renderButtonBack={renderButton}
                renderButtonForward={renderButton}
            />
        </div>
    );
};
