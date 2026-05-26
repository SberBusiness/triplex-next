import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../Button/ButtonIcon";
import { CarouselExtended, ICarouselExtendedButtonProvideProps } from "../CarouselExtended/CarouselExtended";
import { scrollSmoothHorizontally } from "../../utils/scroll";
import { ImageGalleryThumb } from "./ImageGalleryThumb";
import { IImageGalleryItemProps } from "./types";
import styles from "./styles/ImageGalleryThumbnails.module.less";

/** Свойства ImageGalleryThumbnails. */
export interface IImageGalleryThumbnailsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    /** Список элементов галереи. */
    items: ReadonlyArray<IImageGalleryItemProps>;
    /** Индекс активного изображения. */
    selectedIndex: number;
    /** Обработчик выбора миниатюры. */
    onSelect: (index: number) => void;
}

/** Шаг прокрутки карусели миниатюр (доля видимой ширины). */
const SCROLL_STEP_RATIO = 0.5;
/** Отступ при автоцентровании миниатюры от края карусели. */
const SCROLL_PADDING_PX = 16;

/**
 * Лента миниатюр на `CarouselExtended` с автоцентровкой активной миниатюры.
 */
export const ImageGalleryThumbnails: React.FC<IImageGalleryThumbnailsProps> = ({
    items,
    selectedIndex,
    onSelect,
    className,
    ...rest
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const [scrollStep, setScrollStep] = useState(0);

    useEffect(() => {
        const carousel = carouselRef.current;

        if (!carousel) {
            return;
        }

        const updateStep = () => setScrollStep(carousel.clientWidth * SCROLL_STEP_RATIO);

        updateStep();

        const resizeObserver = new ResizeObserver(updateStep);
        resizeObserver.observe(carousel);

        return () => resizeObserver.disconnect();
    }, []);

    const renderPrevButton = useCallback(
        ({ hidden, ...rest }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <ButtonIcon className={clsx(styles.button, styles.prev)} tabIndex={-1} {...rest}>
                    <CaretleftStrokeSrvIcon24 paletteIndex={5} />
                </ButtonIcon>
            ),
        [],
    );

    const renderNextButton = useCallback(
        ({ hidden, ...rest }: ICarouselExtendedButtonProvideProps) =>
            hidden ? null : (
                <ButtonIcon className={clsx(styles.button, styles.next)} tabIndex={-1} {...rest}>
                    <CaretrightStrokeSrvIcon24 paletteIndex={5} />
                </ButtonIcon>
            ),
        [],
    );

    useEffect(() => {
        const carousel = carouselRef.current;
        const thumb = thumbRefs.current[selectedIndex];

        if (!carousel || !thumb) {
            return;
        }

        const carouselRect = carousel.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();

        if (thumbRect.left < carouselRect.left) {
            scrollSmoothHorizontally(carousel, Math.floor(thumbRect.left - carouselRect.left - SCROLL_PADDING_PX));
        } else if (thumbRect.right > carouselRect.right) {
            scrollSmoothHorizontally(carousel, Math.ceil(thumbRect.right - carouselRect.right + SCROLL_PADDING_PX));
        }
    }, [selectedIndex]);

    return (
        <CarouselExtended
            ref={carouselRef}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={scrollStep}
            stepNext={scrollStep}
            {...rest}
            className={clsx(styles.thumbnails, className)}
        >
            {items.map((item, index) => (
                <ImageGalleryThumb
                    key={index}
                    ref={(instance) => {
                        thumbRefs.current[index] = instance;
                    }}
                    item={item}
                    isActive={index === selectedIndex}
                    onClick={() => onSelect(index)}
                />
            ))}
        </CarouselExtended>
    );
};

ImageGalleryThumbnails.displayName = "ImageGalleryThumbnails";
