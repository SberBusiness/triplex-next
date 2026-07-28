import React from "react";
import { ECarouselOrientation, ECarouselScrollMode } from "./enums";
import { ICarouselProps } from "./types";

export interface ICarouselContext extends Required<Pick<ICarouselProps, "gap" | "orientation" | "scrollMode">> {
    offset: number;
    activeIndices: number[];
    currentIndex: number;
    viewportPaddingStyle: string;
    atStart: boolean;
    atEnd: boolean;
    nextSlide: () => void;
    prevSlide: () => void;
    goToSlide: (index: number) => void;
    orientationRef: React.MutableRefObject<ECarouselOrientation>;
    currentIndexRef: React.MutableRefObject<number>;
    offsetRef: React.MutableRefObject<number>;
    maxOffsetRef: React.MutableRefObject<number>;
    viewportRef: React.MutableRefObject<HTMLDivElement | null>;
    trackRef: React.MutableRefObject<HTMLDivElement | null>;
    slideRefs: React.MutableRefObject<Map<number, HTMLDivElement>>;
}

export const CarouselContext = React.createContext<ICarouselContext>({
    gap: 0,
    orientation: ECarouselOrientation.HORIZONTAL,
    scrollMode: ECarouselScrollMode.ITEM,
    offset: 0,
    activeIndices: [],
    currentIndex: 0,
    viewportPaddingStyle: "",
    atStart: true,
    atEnd: false,
    nextSlide: () => {},
    prevSlide: () => {},
    goToSlide: () => {},
    orientationRef: { current: ECarouselOrientation.HORIZONTAL },
    currentIndexRef: { current: 0 },
    viewportRef: { current: null },
    trackRef: { current: null },
    slideRefs: { current: new Map() },
    offsetRef: { current: 0 },
    maxOffsetRef: { current: 0 },
});
