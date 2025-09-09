import React from "react";

/** Свойства контекста AlertProcess. */
interface IAlertProcessContext {
    hasSpoiler: boolean;
    setHasSpoiler: (hasSpoiler: boolean) => void;
}

/** Контекст компонента AlertProcess. */
export const AlertProcessContext = React.createContext<IAlertProcessContext>({
    hasSpoiler: false,
    setHasSpoiler: () => {},
});
