import React from "react";
import { StatusTracker, EStatusTrackerType, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";
import { WaitStsIcon84, WarningStsIcon84, ErrorStsIcon84, SuccessStsIcon84 } from "@sberbusiness/icons-next";

/** Иконка и подпись статуса для каждого типа статус-трекера. */
const TYPE_TO_CONTENT_MAP: Record<EStatusTrackerType, { icon: React.ReactNode; status: EMarkerStatus; text: string }> =
    {
        [EStatusTrackerType.DRAFT]: {
            icon: <WaitStsIcon84 />,
            status: EMarkerStatus.WAITING,
            text: "Черновик",
        },
        [EStatusTrackerType.WAITING]: {
            icon: <WaitStsIcon84 />,
            status: EMarkerStatus.WAITING,
            text: "В обработке",
        },
        [EStatusTrackerType.WARNING]: {
            icon: <WarningStsIcon84 />,
            status: EMarkerStatus.WARNING,
            text: "Требуется исправление",
        },
        [EStatusTrackerType.REJECTED]: {
            icon: <ErrorStsIcon84 />,
            status: EMarkerStatus.ERROR,
            text: "Отклонён банком",
        },
        [EStatusTrackerType.APPROVED]: {
            icon: <SuccessStsIcon84 />,
            status: EMarkerStatus.SUCCESS,
            text: "Исполнен",
        },
    };

const TYPES = Object.values(EStatusTrackerType);

export const Types = () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {TYPES.map((type) => (
            <div key={type} style={{ width: 320 }}>
                <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>{type.toUpperCase()}</div>
                <div style={{ padding: 24, background: "#E9EDF1" }}>
                    <StatusTracker type={type}>
                        <StatusTracker.Media>{TYPE_TO_CONTENT_MAP[type].icon}</StatusTracker.Media>
                        <StatusTracker.Body>
                            <StatusTracker.Body.Status
                                status={TYPE_TO_CONTENT_MAP[type].status}
                                size={EComponentSize.LG}
                            >
                                {TYPE_TO_CONTENT_MAP[type].text}
                            </StatusTracker.Body.Status>
                        </StatusTracker.Body>
                    </StatusTracker>
                </div>
            </div>
        ))}
    </div>
);
