import React, { useState } from "react";
import moment from "moment";
import { DatePicker } from "@sber-business/triplex/components/DatePicker/DatePicker";
import { ButtonIcon } from "@sber-business/triplex/components/Button/ButtonIcon";
import { dateFormatYYYYMMDD } from "@sber-business/triplex/consts/DateConst";

const [value, setValue] = useState(["", ""]);

const handleClickBack = () => {
    const [start, end] = value;
    const momentStart = moment(start, dateFormatYYYYMMDD);
    const momentEnd = moment(end, dateFormatYYYYMMDD);
    const amount = momentEnd.diff(momentStart, "day") || 1;

    setValue([
        momentStart.subtract(amount, "day").format(dateFormatYYYYMMDD),
        momentEnd.subtract(amount, "day").format(dateFormatYYYYMMDD),
    ]);
};

const handleClickForward = () => {
    const [start, end] = value;
    const momentStart = moment(start, dateFormatYYYYMMDD);
    const momentEnd = moment(end, dateFormatYYYYMMDD);
    const amount = momentEnd.diff(momentStart, "day") || 1;

    setValue([
        momentStart.add(amount, "day").format(dateFormatYYYYMMDD),
        momentEnd.add(amount, "day").format(dateFormatYYYYMMDD),
    ]);
};

const renderPicker = (props) => <DatePicker {...props} />;
const renderButtonBack = (props) => <ButtonIcon {...props} onClick={handleClickBack} />;
const renderButtonForward = (props) => <ButtonIcon {...props} onClick={handleClickForward} />;

<DateRange
    value={value}
    onChange={setValue}
    renderPickerFrom={renderPicker}
    renderPickerTo={renderPicker}
    renderButtonBack={renderButtonBack}
    renderButtonForward={renderButtonForward}
/>