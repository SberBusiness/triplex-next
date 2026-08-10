import { useMatchMedia } from "../MediaWidth/useMatchMedia";
import { EScreenWidth } from "../../helpers/breakpoints";

/** Медиа-запрос для проверки мобильного экрана. */
const MOBILE_QUERY = `(max-width: ${EScreenWidth.SM_MAX})`;

/**
 * Хук для проверки, является ли устройство мобильным (экран <= SM_MAX).
 * Условие совпадает с условием компонента MobileView.
 * @returns true, если ширина экрана соответствует мобильному устройству
 */
export const useMobileView = (): boolean => useMatchMedia(MOBILE_QUERY);
