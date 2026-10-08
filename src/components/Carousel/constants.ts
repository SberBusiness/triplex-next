import { EOrientation } from "../../enums";

export const ORIENTATION_TRANSFORM = {
    [EOrientation.HORIZONTAL]: (x: number) => `translateX(${x}px)`,
    [EOrientation.VERTICAL]: (y: number) => `translateY(${y}px)`,
} as const;
