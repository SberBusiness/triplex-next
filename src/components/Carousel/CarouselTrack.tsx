import React, { useContext } from "react";
import clsx from "clsx";
import { useMergedElementRef } from "../../helpers/useMergedElementRef";
import { ICarouselTrackProps } from "./types";
import { CarouselContext } from "./CarouselContext";
import { ORIENTATION_TRANSFORM } from "./constants";
import styles from "./styles/Carousel.module.less";

export const CarouselTrack = React.forwardRef<HTMLDivElement, ICarouselTrackProps>(
    ({ children, className, style, ...restProps }, ref) => {
        const { gap, orientation, offset, trackRef } = useContext(CarouselContext);
        const combinedRef = useMergedElementRef(ref, trackRef);

        const runtimeStyle = {
            "--triplex-next-runtime-carousel-transform": ORIENTATION_TRANSFORM[orientation](-offset),
            "--triplex-next-runtime-carousel-gap": `${gap}px`,
        };

        return (
            <div
                className={clsx(styles.track, className)}
                role="presentation"
                {...restProps}
                style={{
                    ...style,
                    ...runtimeStyle,
                }}
                ref={combinedRef}
            >
                {children}
            </div>
        );
    },
);

CarouselTrack.displayName = "Carousel.Track";
