import React, { useState } from "react";
import { uniqueId } from "lodash-es";
import { EComponentSize, Radio, RadioYGroup } from "@sberbusiness/triplex-next";

export const Disabled = () => {
    const [name] = useState(() => uniqueId("radio-y-group-disabled-"));

    return (
        <RadioYGroup aria-label="Отключённые варианты">
            <Radio name={name} value="first" size={EComponentSize.MD} disabled>
                Не выбран
            </Radio>
            <Radio name={name} value="second" size={EComponentSize.MD} disabled defaultChecked>
                Выбран
            </Radio>
        </RadioYGroup>
    );
};
