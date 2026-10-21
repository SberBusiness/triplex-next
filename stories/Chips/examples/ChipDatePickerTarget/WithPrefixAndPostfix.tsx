import React, { useState } from "react";
import moment from "moment";
import { CalendarStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { ChipClearButton, ChipDatePickerTarget, DatePickerExtended } from "@sberbusiness/triplex-next";

const LIMIT_RANGE = {
    dateFrom: moment("19700101", "YYYYMMDD"),
    dateTo: moment("19701231", "YYYYMMDD"),
};

export const WithPrefixAndPostfix = () => {
    const [pickedDate, setPickedDate] = useState<string | null>("19700115");
    const handleClear = () => setPickedDate(null);

    const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        handleClear();
    };

    const handleClearKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.code === "Enter" || event.code === "Space") {
            event.stopPropagation();
        }
    };

    const postfixProps =
        pickedDate !== null
            ? {
                  postfix: (
                      <ChipClearButton
                          aria-label="Очистить дату"
                          onClick={handleClearClick}
                          onKeyDown={handleClearKeyDown}
                      />
                  ),
              }
            : {};

    return (
        <DatePickerExtended
            style={{ display: "inline-block" }}
            pickedDate={pickedDate}
            defaultViewDate="19700115"
            limitRange={LIMIT_RANGE}
            onDateChange={(date) => setPickedDate(date.format("YYYYMMDD"))}
            renderTarget={() => (
                <ChipDatePickerTarget
                    selected={pickedDate !== null}
                    onClear={handleClear}
                    prefix={<CalendarStrokeSrvIcon20 paletteIndex={pickedDate !== null ? 6 : 5} />}
                    aria-haspopup="dialog"
                    {...postfixProps}
                >
                    {pickedDate ? moment(pickedDate, "YYYYMMDD").format("DD.MM.YYYY") : "Выберите дату"}
                </ChipDatePickerTarget>
            )}
            renderDropdownHeaderTarget={() => <span>Выберите дату</span>}
        />
    );
};
