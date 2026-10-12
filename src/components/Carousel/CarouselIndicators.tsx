import React, { useContext } from "react";
import clsx from "clsx";
import { ICarouselIndicatorsProps } from "./types";
import { CarouselContext } from "./CarouselContext";
import { ECarouselScrollMode } from "./enums";
import { PageIndicators } from "../PageIndicators";
import styles from "./styles/Carousel.module.less";

/** Индикаторы страниц карусели. Рендерятся только в режиме ECarouselScrollMode.PAGE. */
export const CarouselIndicators = React.forwardRef<HTMLDivElement, ICarouselIndicatorsProps>(
    ({ className, ...restProps }, ref) => {
        const { currentIndex, orientation, scrollMode, activeIndices, goToSlide } = useContext(CarouselContext);

        if (scrollMode === ECarouselScrollMode.ITEM) {
            return null;
        }

        return (
            <PageIndicators
                {...restProps}
                ref={ref}
                className={clsx(styles.indicators, className)}
                count={activeIndices.length}
                activeIndex={currentIndex}
                onChange={goToSlide}
                orientation={orientation}
            />
        );
    },
);

CarouselIndicators.displayName = "Carousel.Indicators";
