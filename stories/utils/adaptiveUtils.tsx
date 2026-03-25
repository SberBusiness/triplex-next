import { useMatchMedia } from "../../src/components/MediaWidth/useMatchMedia";
import { EScreenWidth } from "../../src/helpers/breakpoints";

export const AdaptiveUtils = {
    /** Является ли экран адаптивным. */
    isAdaptive: (maxWidth: EScreenWidth) =>
        useMatchMedia(`(max-width: ${maxWidth})`, window.innerWidth <= parseInt(maxWidth)),
};
