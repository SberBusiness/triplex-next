import React, { useState } from "react";
import { EDateRangeShiftUnit } from "@sber-business/triplex/components/DateRange/enums";
import { DatePicker } from "@sber-business/triplex/components/DatePicker/DatePicker";
import { ButtonIcon } from "@sber-business/triplex/components/Button/ButtonIcon";

const [value, setValue] = useState(["", ""]);

const shiftAmount = 1;
const shiftUnit = EDateRangeShiftUnit.MONTH;

const renderPicker = (props) => <DatePicker {...props} />;
const renderButton = (props) => <ButtonIcon {...props} />;

<DateRange
    value={value}
    onChange={setValue}
    shiftAmount={shiftAmount}
    shiftUnit={shiftUnit}
    renderPickerFrom={renderPicker}
    renderPickerTo={renderPicker}
    renderButtonBack={renderButton}
    renderButtonForward={renderButton}
/>