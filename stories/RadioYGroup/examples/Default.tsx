import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import { Radio, RadioYGroup } from "@sberbusiness/triplex-next";

export const Default = () => {
    const [name] = useState(() => uniqueId("radio-y-group-default-"));

    return (
        <RadioYGroup aria-label="Выберите вариант">
            <Radio name={name} value="first">
                Первый вариант
            </Radio>
            <Radio name={name} value="second">
                Второй вариант
            </Radio>
            <Radio name={name} value="third">
                Третий вариант
            </Radio>
        </RadioYGroup>
    );
};
