import { createContext } from "react";

/**
 * Контекст координации Esc между TopOverlay и кнопками закрытия LightBox/SideOverlay.
 *
 * Проблема: один `keydown Esc` может одновременно закрыть TopOverlay (через Confirm.Close)
 * и заново его открыть (через кнопку закрытия LightBox/SideOverlay). Во время анимации
 * закрытия TopOverlay кнопка закрытия снова активна и переоткрывает оверлей — отсюда
 * «дёрганье» при быстрых Esc.
 *
 * Решение: пока на экране есть TopOverlay (открыт ИЛИ анимирует закрытие), он регистрируется
 * в этом контексте, а кнопки закрытия отключают свой Esc-триггер. Координация полностью
 * внутри компонентов — потребителю не нужно прокидывать дополнительные пропсы.
 */
export interface ILightBoxOverlayContext {
    /**
     * Зарегистрировать активный (открытый/закрывающийся) TopOverlay, перехватывающий Esc.
     * Возвращает функцию снятия регистрации.
     */
    registerEscCapturingOverlay: () => () => void;
    /** На экране есть TopOverlay, перехватывающий Esc (открыт или анимирует закрытие). */
    escCapturingOverlayActive: boolean;
}

export const LightBoxOverlayContext = createContext<ILightBoxOverlayContext>({
    registerEscCapturingOverlay: () => () => undefined,
    escCapturingOverlayActive: false,
});

LightBoxOverlayContext.displayName = "LightBoxOverlayContext";
