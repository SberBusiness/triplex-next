import React, { useContext, useRef, useCallback } from "react";
import clsx from "clsx";
import { ICarouselItemProps } from "./types";
import { CarouselContext } from "./CarouselContext";
import { mergeRefs } from "./utils";
import styles from "./styles/Carousel.module.less";

export const CarouselItem = React.forwardRef<HTMLDivElement, ICarouselItemProps>(
    ({ children, className, index, ...restProps }, ref) => {
        const { slideRefs } = useContext(CarouselContext);

        const lastRegisteredIndexRef = useRef<number | null>(null);

        const registerItemRef = useCallback(
            (node: HTMLDivElement | null) => {
                if (node) {
                    if (lastRegisteredIndexRef.current !== null && lastRegisteredIndexRef.current !== index) {
                        slideRefs.current.delete(lastRegisteredIndexRef.current);
                    }
                    slideRefs.current.set(index, node);
                    lastRegisteredIndexRef.current = index;
                } else if (lastRegisteredIndexRef.current !== null) {
                    slideRefs.current.delete(lastRegisteredIndexRef.current);
                    lastRegisteredIndexRef.current = null;
                }
            },
            [index],
        );

        const combinedRef = mergeRefs(ref, registerItemRef);

        return (
            <div className={clsx(styles.slide, className)} role="group" {...restProps} ref={combinedRef}>
                {children}
            </div>
        );
    },
);

CarouselItem.displayName = "Carousel.Item";
