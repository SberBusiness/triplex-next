import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../Button/ButtonIcon";
import { CarouselExtended, ICarouselExtendedButtonProvideProps } from "../CarouselExtended/CarouselExtended";
import { scrollSmoothHorizontally } from "../../utils/scroll";
import { IImageGalleryItemProps } from "./types";
import styles from "./styles/ImageGalleryThumbnails.module.less";

/** Свойства ImageGalleryThumbnails. */
export interface IImageGalleryThumbnailsProps {
    /** Список элементов галереи. */
    items: ReadonlyArray<IImageGalleryItemProps>;
    /** Индекс активного изображения. */
    selectedIndex: number;
    /** Обработчик выбора миниатюры. */
    onSelect: (index: number) => void;
    /** Дополнительный CSS-класс. */
    className?: string;
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
            className={clsx(styles.thumbnails, className)}
            buttonPrev={renderPrevButton}
            buttonNext={renderNextButton}
            stepPrev={scrollStep}
            stepNext={scrollStep}
        >
            {items.map((item, index) => {
                const isActive = index === selectedIndex;

                return (
                    <button
                        key={index}
                        type="button"
                        ref={(instance) => {
                            thumbRefs.current[index] = instance;
                        }}
                        className={clsx(styles.thumb, { [styles.active]: isActive })}
                        aria-selected={isActive}
                        data-testid="image-gallery-thumb"
                        onClick={() => onSelect(index)}
                    >
                        <img src={item.thumbSrc ?? item.src} alt="" className={styles.image} loading="lazy" />
                    </button>
                );
            })}
        </CarouselExtended>
    );
};

ImageGalleryThumbnails.displayName = "ImageGalleryThumbnails";
