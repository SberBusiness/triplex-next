import React from "react";
import { StatusTracker, EStatusTrackerType } from "@sberbusiness/triplex-next";
import { WaitStsIcon84 } from "@sberbusiness/icons-next";

export const Default = () => (
    // StatusTracker занимает всю ширину и высоту родителя — задайте их на контейнере.
    <div style={{ maxWidth: 372, padding: 24, background: "#E9EDF1" }}>
        <StatusTracker type={EStatusTrackerType.WAITING}>
            <StatusTracker.Media>
                <WaitStsIcon84 />
            </StatusTracker.Media>
            <StatusTracker.Header>
                <StatusTracker.Header.Title>Документ в обработке</StatusTracker.Header.Title>
                <StatusTracker.Header.Description>
                    Документ ожидает ответ от банка. Обычно обработка занимает несколько минут.
                </StatusTracker.Header.Description>
            </StatusTracker.Header>
        </StatusTracker>
    </div>
);
