import React, { useState } from "react";
import {
    ButtonIcon,
    MonthYearField,
    MonthYearRange,
    IMonthYearRangeButtonProvideProps,
    IMonthYearRangePickerProvideProps,
    TMonthYearRangeValue,
} from "@sberbusiness/triplex-next";

export type PlaygroundArgs = Pick<
    React.ComponentProps<typeof MonthYearRange>,
    "shiftAmount" | "shiftUnit" | "hideNavigation"
>;

export const Playground = (args: PlaygroundArgs) => {
    const [value, setValue] = useState<TMonthYearRangeValue>(["", ""]);
    const renderPicker = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="Select to proceed" {...props} />
    );
    const renderButton = (props: IMonthYearRangeButtonProvideProps) => <ButtonIcon {...props} />;

    return (
        <div style={{ maxWidth: "400px" }}>
            <MonthYearRange
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
