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
import { WaitStsIcon84 } from "@sberbusiness/icons-next";
import { action } from "storybook/actions";

/** Аргументы стори Playground. */
export interface IPlaygroundArgs {
    /** Тип статуса документа. */
    type: EStatusTrackerType;
    /** Вертикальное выравнивание контента. */
    verticalAlign: EStatusTrackerVerticalAlign;
}

export const Playground = ({ type, verticalAlign }: IPlaygroundArgs) => (
    // Контейнер выше карточки — чтобы был виден эффект verticalAlign.
    <div style={{ maxWidth: 372, height: 744, padding: 24, background: "#E9EDF1" }}>
        <StatusTracker type={type} verticalAlign={verticalAlign}>
            <StatusTracker.Media>
                <WaitStsIcon84 />
            </StatusTracker.Media>
            <StatusTracker.Header>
                <StatusTracker.Header.Title>Заголовок документа</StatusTracker.Header.Title>
                <StatusTracker.Header.Sum amountProps={{ value: "123747.123", currency: "₽" }} />
                <StatusTracker.Header.Description>
                    Это сообщение предоставляет дополнительный контекст или выделяет важную информацию для ознакомления.
                </StatusTracker.Header.Description>
            </StatusTracker.Header>
            <StatusTracker.Body>
                <StatusTracker.Body.Status status={EMarkerStatus.WAITING} size={EComponentSize.LG}>
                    Ожидание ответа
                </StatusTracker.Body.Status>
                <StatusTracker.Body.Alert type={EAlertType.INFO} closable onClose={action("onClose")}>
                    Это сообщение предоставляет контекст или выделяет важную информацию для ознакомления.
                </StatusTracker.Body.Alert>
            </StatusTracker.Body>
            <StatusTracker.Footer>
                <StatusTracker.Footer.Button
                    theme={EButtonTheme.GENERAL}
                    size={EComponentSize.MD}
                    onClick={action("onClick")}
                >
                    Основная кнопка
                </StatusTracker.Footer.Button>
                <StatusTracker.Footer.Button
                    theme={EButtonTheme.SECONDARY}
                    size={EComponentSize.MD}
                    onClick={action("onClick")}
                >
                    Вторичная кнопка
                </StatusTracker.Footer.Button>
                <StatusTracker.Footer.Description>
                    Это сообщение предоставляет дополнительный контекст или выделяет важную информацию для ознакомления.
                </StatusTracker.Footer.Description>
            </StatusTracker.Footer>
        </StatusTracker>
    </div>
);
