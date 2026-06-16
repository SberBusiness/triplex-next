import React from "react";
import { MonthYearField, EComponentSize } from "@sberbusiness/triplex-next";

// Одно поле с зафиксированным значением: play-функция кликает по input,
// раскрывая dropdown с календарём для скриншот-регрессии раскрытого состояния.
export const VisualTestsOpenExample = () => (
    <div style={{ width: 240 }}>
        <MonthYearField
            size={EComponentSize.MD}
            value="19700101"
            label="Opened"
            placeholder="мм.гггг"
            onChange={() => {}}
        />
    </div>
);
