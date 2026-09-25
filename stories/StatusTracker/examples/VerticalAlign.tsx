import React from "react";
import { StatusTracker, EStatusTrackerType, EStatusTrackerVerticalAlign } from "@sberbusiness/triplex-next";

const VERTICAL_ALIGNS = Object.values(EStatusTrackerVerticalAlign);

export const VerticalAlign = () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {VERTICAL_ALIGNS.map((verticalAlign) => (
            <div key={verticalAlign} style={{ width: 320 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{verticalAlign.toUpperCase()}</div>
                {/* Контейнер выше содержимого карточки — только так видно разницу выравниваний. */}
                <div style={{ height: 420, padding: 24, background: "#E9EDF1" }}>
                    <StatusTracker type={EStatusTrackerType.DRAFT} verticalAlign={verticalAlign}>
                        <StatusTracker.Header>
                            <StatusTracker.Header.Title>Черновик документа</StatusTracker.Header.Title>
                            <StatusTracker.Header.Description>
                                Документ создан без ошибок и ещё не отправлен в банк.
                            </StatusTracker.Header.Description>
                        </StatusTracker.Header>
                    </StatusTracker>
                </div>
            </div>
        ))}
    </div>
);
