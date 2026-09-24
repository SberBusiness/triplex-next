import React from "react";
import { Step, EComponentSize, EStepPosition, EStepStatus } from "@sberbusiness/triplex-next";

const SIZES = Object.values(EComponentSize);
const STATUSES = Object.values(EStepStatus);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                {STATUSES.map((status, index) => (
                    <Step key={status} step={index + 1} status={status} size={size} />
                ))}
            </div>
        ))}
        {/* Двузначный номер — проверка, что кружок не растягивается под содержимое. */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <Step step={10} status={EStepStatus.DEFAULT} size={EComponentSize.SM} />
            <Step step={99} status={EStepStatus.DONE} size={EComponentSize.LG} />
        </div>
        {/* Раскрытая подсказка — состояние доступно только после наведения, открывается в play. */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, height: 120 }}>
            <Step step={3} status={EStepStatus.ACTIVE} position={EStepPosition.Default} aria-label="Шаг с подсказкой">
                Проверьте сумму и назначение платежа
            </Step>
        </div>
    </div>
);
