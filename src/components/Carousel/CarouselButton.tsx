import React, { useContext, useCallback } from "react";
import clsx from "clsx";
import {
    CaretleftStrokeSrvIcon20,
    CaretupStrokeSrvIcon20,
    CaretrightStrokeSrvIcon20,
    CaretdownStrokeSrvIcon20,
} from "@sberbusiness/icons-next";
import { EOrientation } from "../../enums";
import { ButtonIcon, IButtonIconProps } from "../Button/ButtonIcon";
import { useMatchMedia } from "../MediaWidth/useMatchMedia";
import { CarouselContext } from "./CarouselContext";
import styles from "./styles/Carousel.module.less";

/** Свойства компонента CarouselNavButton. */
interface ICarouselNavButtonProps extends IButtonIconProps {
    /** Карусель у края в направлении кнопки: переход не выполняется, `aria-disabled` равен `true`. */
    atBoundary: boolean;
    /** Переход к соседнему слайду в направлении кнопки. */
    slide: () => void;
    /** Иконка, когда `children` не заданы. */
    defaultIcon: React.ReactElement;
}

/** Общая реализация `Carousel.PrevButton` и `Carousel.NextButton`. */
const CarouselNavButton = React.forwardRef<HTMLButtonElement, ICarouselNavButtonProps>(
    ({ atBoundary, slide, onClick, className, children, defaultIcon, ...restProps }, ref) => {
        const touchDevice = useMatchMedia("(pointer: coarse)");

        const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
            (event) => {
                if (!atBoundary) slide();
                onClick?.(event);
            },
            [atBoundary, slide, onClick],
        );

        if (touchDevice) {
            return null;
        }

        return (
            <ButtonIcon
                {...restProps}
                className={clsx(styles.navButton, className)}
                aria-disabled={atBoundary}
                onClick={handleClick}
                ref={ref}
            >
                {children || defaultIcon}
            </ButtonIcon>
        );
    },
);

CarouselNavButton.displayName = "CarouselNavButton";

const ORIENTATION_TO_PREV_ICON_MAP: Record<EOrientation, React.ReactElement> = {
    [EOrientation.HORIZONTAL]: <CaretleftStrokeSrvIcon20 paletteIndex={7} />,
    [EOrientation.VERTICAL]: <CaretupStrokeSrvIcon20 paletteIndex={7} />,
};

/** Кнопка перехода к предыдущему слайду Carousel. При (pointer: coarse) не рендерится. */
export const CarouselPrevButton = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({ className, ...restProps }, ref) => {
        const { orientation, atStart, prevSlide } = useContext(CarouselContext);

        return (
            <CarouselNavButton
                {...restProps}
                className={clsx(styles.prev, className)}
                atBoundary={atStart}
                slide={prevSlide}
                defaultIcon={ORIENTATION_TO_PREV_ICON_MAP[orientation]}
                ref={ref}
            />
        );
    },
);

CarouselPrevButton.displayName = "Carousel.PrevButton";

const ORIENTATION_TO_NEXT_ICON_MAP: Record<EOrientation, React.ReactElement> = {
    [EOrientation.HORIZONTAL]: <CaretrightStrokeSrvIcon20 paletteIndex={7} />,
    [EOrientation.VERTICAL]: <CaretdownStrokeSrvIcon20 paletteIndex={7} />,
};

/** Кнопка перехода к следующему слайду Carousel. При (pointer: coarse) не рендерится. */
export const CarouselNextButton = React.forwardRef<HTMLButtonElement, IButtonIconProps>(
    ({ className, ...restProps }, ref) => {
        const { orientation, atEnd, nextSlide } = useContext(CarouselContext);

        return (
            <CarouselNavButton
                {...restProps}
                className={clsx(styles.next, className)}
                atBoundary={atEnd}
                slide={nextSlide}
                defaultIcon={ORIENTATION_TO_NEXT_ICON_MAP[orientation]}
                ref={ref}
            />
        );
    },
);

CarouselNextButton.displayName = "Carousel.NextButton";
