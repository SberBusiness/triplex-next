import React from "react";
import { Step, EStepStatus } from "@sberbusiness/triplex-next";

export const WithTooltip = () => (
    <Step step={2} status={EStepStatus.ACTIVE}>
        Заполните реквизиты получателя
    </Step>
);
