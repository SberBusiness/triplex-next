import { useMatchMedia } from "../MediaWidth/useMatchMedia";
import { EScreenWidth } from "../../helpers/breakpoints";

/** Медиа-запрос для проверки мобильного экрана. */
const MOBILE_QUERY = `(max-width: ${EScreenWidth.SM_MAX})`;

/**
 * Хук для проверки, является ли устройство мобильным (экран <= SM_MAX).
 * @returns true, если ширина экрана соответствует мобильному устройству
 */
export const useMobileView = () => {
    const initialMatch = window.matchMedia(MOBILE_QUERY).matches;
    return useMatchMedia(MOBILE_QUERY, initialMatch);
};
