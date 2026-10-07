import React from "react";
import { action } from "storybook/actions";
import { Radio } from "@sberbusiness/triplex-next";

export const VisualTestsCheckedHover = () => (
    <Radio data-testid="radio-checked-hover" defaultChecked onChange={action("onChange")}>
        Наведение, выбран
    </Radio>
);
