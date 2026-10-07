import React from "react";
import { action } from "storybook/actions";
import { Radio } from "@sberbusiness/triplex-next";

export const VisualTestsHover = () => (
    <Radio data-testid="radio-hover" onChange={action("onChange")}>
        Наведение, не выбран
    </Radio>
);
