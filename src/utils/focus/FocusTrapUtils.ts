interface IFocusTrapUtils {
    /** Data-атрибут, на который будет установлен фокус при использовании FocusTrap. */
    firstInteractionElementDataAttr: string;
    /** Возвращает HTMLElement содержащий firstInteractionElementDataAttr внутри заданного контейнера. */
    getFirstInteractionElementByDataAttr: (rootElement: HTMLElement | null) => HTMLElement | undefined;
}

export const FocusTrapUtils: IFocusTrapUtils = {
    firstInteractionElementDataAttr: "data-first-interaction-element",
    getFirstInteractionElementByDataAttr: (rootElement) => {
        if (rootElement) {
            return (
                rootElement.querySelector<HTMLElement>(`[${FocusTrapUtils.firstInteractionElementDataAttr}]`) ||
                undefined
            );
        }
        return undefined;
    },
};
