import React from "react";
import { Step, calcPosition, EStepStatus } from "@sberbusiness/triplex-next";

const STEPS = [
    { hint: "Реквизиты получателя заполнены", status: EStepStatus.DONE },
    { hint: "Проверьте сумму и назначение платежа", status: EStepStatus.ACTIVE },
    { hint: "Подписание доступно после проверки", status: EStepStatus.DEFAULT },
    { hint: "Отправка доступна после подписания", status: EStepStatus.DISABLED },
];

export const Example = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {STEPS.map(({ hint, status }, index) => (
            <Step key={hint} step={index + 1} status={status} position={calcPosition(STEPS.length, index)}>
                {hint}
            </Step>
        ))}
    </div>
);
