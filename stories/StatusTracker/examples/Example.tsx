import React from "react";
import {
    StatusTracker,
    EStatusTrackerType,
    EStatusTrackerVerticalAlign,
    EMarkerStatus,
    EComponentSize,
    EAlertType,
    EButtonTheme,
} from "@sberbusiness/triplex-next";
import { WarningStsIcon84 } from "@sberbusiness/icons-next";

export const Example = () => (
    <div style={{ maxWidth: 372, padding: 24, background: "#E9EDF1" }}>
        <StatusTracker type={EStatusTrackerType.WARNING} verticalAlign={EStatusTrackerVerticalAlign.TOP}>
            <StatusTracker.Media>
                <WarningStsIcon84 />
            </StatusTracker.Media>
            <StatusTracker.Header>
                <StatusTracker.Header.Title>Платёжное поручение № 122</StatusTracker.Header.Title>
                <StatusTracker.Header.Sum amountProps={{ value: "123747.123", currency: "₽" }} />
                <StatusTracker.Header.Description>
                    ООО «Ромашка», счёт 40702810×××××××××123
                </StatusTracker.Header.Description>
            </StatusTracker.Header>
            <StatusTracker.Body>
                <StatusTracker.Body.StatusGroup>
                    <StatusTracker.Body.Status status={EMarkerStatus.WARNING} size={EComponentSize.LG}>
                        Требуется исправление
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Status status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                        Не отправлено в банк
                    </StatusTracker.Body.Status>
                </StatusTracker.Body.StatusGroup>
                <StatusTracker.Body.Alert type={EAlertType.WARNING} closable onClose={() => {}}>
                    Проверьте назначение платежа: банк вернул документ на доработку.
                </StatusTracker.Body.Alert>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD} onClick={() => {}}>
                    Исправить
                </StatusTracker.Footer.Button>
                <StatusTracker.Footer.Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => {}}>
                    Удалить документ
                </StatusTracker.Footer.Button>
                <StatusTracker.Footer.Description>
                    После исправления документ нужно отправить в банк повторно.
                </StatusTracker.Footer.Description>
            </StatusTracker.Footer>
        </StatusTracker>
    </div>
);
