import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import { CarouselExtended, ICarouselExtendedButtonProvideProps } from "../../CarouselExtended/CarouselExtended";
import { scrollSmoothHorizontally } from "../../../utils/scroll";
import { IImageGalleryItemProps } from "../types";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import { ImageGalleryExtendedThumb } from "./ImageGalleryExtendedThumb";
import styles from "../styles/ImageGalleryExtendedThumbnails.module.less";

/** Состояние одной миниатюры, передаваемое в render-функцию `ImageGalleryExtended.Thumbnails`. */
export interface IImageGalleryThumbRenderState {
    /** Изображение, миниатюру которого нужно отрисовать. */
    item: IImageGalleryItemProps;
    /** Индекс изображения. */
    index: number;
    /** Активна ли миниатюра. */
    isActive: boolean;
    /** Выбрать это изображение. */
    onSelect: () => void;
    /** Ref на корневой `<button>` миниатюры — нужен для автоцентровки активной. */
    ref: React.Ref<HTMLButtonElement>;
}

/** Свойства ImageGalleryExtendedThumbnails. */
export interface IImageGalleryExtendedThumbnailsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /**
     * Render-функция миниатюры. По умолчанию рисует `ImageGalleryExtended.Thumb`.
     * Чтобы автоцентровка активной миниатюры работала, проброси `ref` на корневой `<button>`.
     */
    children?: (state: IImageGalleryThumbRenderState) => React.ReactNode;
}

/** Дефолтная отрисовка миниатюры — стандартная `ImageGalleryExtended.Thumb`. */
const renderDefaultThumb = ({ item, isActive, onSelect, ref }: IImageGalleryThumbRenderState) => (
    <ImageGalleryExtendedThumb ref={ref} item={item} isActive={isActive} onClick={onSelect} />
);

/** Шаг прокрутки карусели миниатюр (доля видимой ширины). */
const SCROLL_STEP_RATIO = 0.5;
/** Отступ при автоцентровании миниатюры от края карусели. */
const SCROLL_PADDING_PX = 16;

/**
 * Лента миниатюр на `CarouselExtended` с автоцентровкой активной миниатюры.
 * Данные берёт из контекста `ImageGalleryExtended`.
 */
export const ImageGalleryExtendedThumbnails: React.FC<IImageGalleryExtendedThumbnailsProps> = ({
    className,
    children,
    ...rest
}) => {
    const { items, selectedIndex, onSelect } = useContext(ImageGalleryExtendedContext);
    const renderThumb = children ?? renderDefaultThumb;
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

        // Если фокус остался на ранее выбранной миниатюре (клик мышью + навигация стрелками),
        // переносим его на активную — иначе кольцо :focus-visible осталось бы на старой
        // миниатюре одновременно с кольцом .active новой.
        const focusedThumb = thumbRefs.current.find((ref) => ref && ref === document.activeElement);
        if (focusedThumb && focusedThumb !== thumb) {
            thumb.focus({ preventScroll: true });
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
            {/* Колбэк-ref ниже выполняется на этапе commit (не во время рендера),
                но правило не отслеживает его через render-функцию renderThumb. */}
            {/* eslint-disable-next-line react-hooks/refs */}
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {renderThumb({
                        item,
                        index,
                        isActive: index === selectedIndex,
                        onSelect: () => onSelect(index),
                        ref: (instance) => {
                            thumbRefs.current[index] = instance;
                        },
                    })}
                </React.Fragment>
            ))}
        </CarouselExtended>
    );
};

ImageGalleryExtendedThumbnails.displayName = "ImageGalleryExtendedThumbnails";
