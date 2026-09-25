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
import { SuccessStsIcon84, ErrorStsIcon84 } from "@sberbusiness/icons-next";

export const VisualTests = () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 24 }}>
        {/* Широкий родитель: карточка растягивается, контент остаётся по центру. */}
        <div style={{ width: 600, padding: 24, background: "#E9EDF1" }}>
            <StatusTracker type={EStatusTrackerType.APPROVED}>
                <StatusTracker.Media>
                    <SuccessStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Header>
                    <StatusTracker.Header.Title>Документ исполнен</StatusTracker.Header.Title>
                    <StatusTracker.Header.Sum amountProps={{ value: "250000.75", currency: "₽" }} />
                    <StatusTracker.Header.Description>
                        Документ успешно исполнен банком. Операция завершена.
                    </StatusTracker.Header.Description>
                </StatusTracker.Header>
                <StatusTracker.Body>
                    <StatusTracker.Body.Status status={EMarkerStatus.SUCCESS} size={EComponentSize.LG}>
                        Исполнен успешно
                    </StatusTracker.Body.Status>
                    <StatusTracker.Body.Alert type={EAlertType.INFO}>
                        Документ доступен для скачивания в личном кабинете.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
            </StatusTracker>
        </div>

        {/* Выравнивание BOTTOM: только футер с двумя кнопками и пояснением. */}
        <div style={{ width: 320, height: 420, padding: 24, background: "#E9EDF1" }}>
            <StatusTracker type={EStatusTrackerType.DRAFT} verticalAlign={EStatusTrackerVerticalAlign.BOTTOM}>
                <StatusTracker.Footer>
                    <StatusTracker.Footer.Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                        Принять
                    </StatusTracker.Footer.Button>
                    <StatusTracker.Footer.Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                        Отмена
                    </StatusTracker.Footer.Button>
                    <StatusTracker.Footer.Description>
                        Согласен на отправку отчётов во внешнюю почтовую систему.
                    </StatusTracker.Footer.Description>
                </StatusTracker.Footer>
            </StatusTracker>
        </div>

        {/* Закрываемый Alert с ошибкой и группа статусов без Header и Footer. */}
        <div style={{ width: 320, padding: 24, background: "#E9EDF1" }}>
            <StatusTracker type={EStatusTrackerType.REJECTED}>
                <StatusTracker.Media>
                    <ErrorStsIcon84 />
                </StatusTracker.Media>
                <StatusTracker.Body>
                    <StatusTracker.Body.StatusGroup>
                        <StatusTracker.Body.Status status={EMarkerStatus.ERROR} size={EComponentSize.LG}>
                            Отклонён банком
                        </StatusTracker.Body.Status>
                        <StatusTracker.Body.Status status={EMarkerStatus.ERROR} size={EComponentSize.LG}>
                            Недостаточно средств
                        </StatusTracker.Body.Status>
                    </StatusTracker.Body.StatusGroup>
                    <StatusTracker.Body.Alert type={EAlertType.ERROR} closable>
                        Документ был отклонён банком. Причина: недостаточно средств на счёте.
                    </StatusTracker.Body.Alert>
                </StatusTracker.Body>
            </StatusTracker>
        </div>
    </div>
);
