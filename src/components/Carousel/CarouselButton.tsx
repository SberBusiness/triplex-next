import React, { useContext, useCallback } from "react";
import clsx from "clsx";
import { CarouselContext } from "./CarouselContext";
import { useMatchMedia } from "../MediaWidth/useMatchMedia";
import { ButtonIcon, IButtonIconProps } from "../Button/ButtonIcon";
import {
    CaretleftStrokeSrvIcon20,
    CaretupStrokeSrvIcon20,
    CaretrightStrokeSrvIcon20,
    CaretdownStrokeSrvIcon20,
} from "@sberbusiness/icons-next";
import { ECarouselOrientation } from "./enums";
import styles from "./styles/Carousel.module.less";

const ORIENTATION_TO_PREV_ICON_MAP: Record<ECarouselOrientation, React.ReactElement> = {
    [ECarouselOrientation.HORIZONTAL]: <CaretleftStrokeSrvIcon20 paletteIndex={7} />,
    [ECarouselOrientation.VERTICAL]: <CaretupStrokeSrvIcon20 paletteIndex={7} />,
};

export const CarouselPrevButton = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({ children, className, onClick, ...restProps }, ref) => {
        const { atStart, prevSlide, orientationRef } = useContext(CarouselContext);
        const touchDevice = useMatchMedia("(pointer: coarse)");

        const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
            (event) => {
                if (!atStart) prevSlide();
                onClick?.(event);
            },
            [atStart, prevSlide, onClick],
        );

        if (touchDevice) {
            return null;
        }

        return (
            <ButtonIcon
                {...restProps}
                className={clsx(styles.navButton, styles.prev, className)}
                aria-disabled={atStart}
                onClick={handleClick}
                ref={ref}
            >
                {children || ORIENTATION_TO_PREV_ICON_MAP[orientationRef.current]}
            </ButtonIcon>
        );
    },
);

CarouselPrevButton.displayName = "Carousel.PrevButton";

const ORIENTATION_TO_NEXT_ICON_MAP: Record<ECarouselOrientation, React.ReactElement> = {
    [ECarouselOrientation.HORIZONTAL]: <CaretrightStrokeSrvIcon20 paletteIndex={7} />,
    [ECarouselOrientation.VERTICAL]: <CaretdownStrokeSrvIcon20 paletteIndex={7} />,
};

export const CarouselNextButton = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({ children, className, onClick, ...restProps }, ref) => {
        const { atEnd, nextSlide, orientationRef } = useContext(CarouselContext);
        const touchDevice = useMatchMedia("(pointer: coarse)");

        const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
            (event) => {
                if (!atEnd) nextSlide();
                onClick?.(event);
            },
            [atEnd, nextSlide, onClick],
        );

        if (touchDevice) {
            return null;
        }

        return (
            <ButtonIcon
                {...restProps}
                className={clsx(styles.navButton, styles.next, className)}
                aria-disabled={atEnd}
                onClick={handleClick}
                ref={ref}
            >
                {children || ORIENTATION_TO_NEXT_ICON_MAP[orientationRef.current]}
            </ButtonIcon>
        );
    },
);

CarouselNextButton.displayName = "Carousel.NextButton";
