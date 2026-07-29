import { ECarouselOrientation } from "./enums";

export const ORIENTATION_TRANSFORM = {
    [ECarouselOrientation.HORIZONTAL]: (x: number) => `translateX(${x}px)`,
    [ECarouselOrientation.VERTICAL]: (y: number) => `translateY(${y}px)`,
} as const;
