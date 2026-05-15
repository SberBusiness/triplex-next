import React, { useState } from "react";
import {
    ButtonIcon,
    MonthYearField,
    MonthYearRange,
    IMonthYearRangeButtonProvideProps,
    IMonthYearRangePickerProvideProps,
    TMonthYearRangeValue,
} from "@sberbusiness/triplex-next";

export const PlaygroundExample = (args: React.ComponentProps<typeof MonthYearRange>) => {
    const [value, setValue] = useState<TMonthYearRangeValue>(["", ""]);
    const renderPicker = (props: IMonthYearRangePickerProvideProps) => (
        <MonthYearField label="Label" placeholder="мм.гггг" {...props} />
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
