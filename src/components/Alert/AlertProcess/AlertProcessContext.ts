import React from "react";

/** Свойства контекста AlertProcess. */
interface IAlertProcessContext {
    /** Признак того, что внутри AlertProcess смонтирован AlertProcessSpoiler. */
    hasSpoiler: boolean;
    /** Сообщить родительскому AlertProcess о монтировании/размонтировании спойлера. */
    setHasSpoiler: (hasSpoiler: boolean) => void;
}

/** Контекст компонента AlertProcess. */
export const AlertProcessContext = React.createContext<IAlertProcessContext>({
    hasSpoiler: false,
    setHasSpoiler: () => {},
});
