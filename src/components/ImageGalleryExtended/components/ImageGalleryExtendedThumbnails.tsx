import React, { useContext, useEffect, useImperativeHandle, useRef } from "react";
import clsx from "clsx";
import { isKey } from "../../../utils/keyboard";
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
    /** Доступное имя миниатюры (`item.alt`). */
    ariaLabel?: string;
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
const renderDefaultThumb = ({ item, isActive, ariaLabel, onSelect, ref }: IImageGalleryThumbRenderState) => (
    <ImageGalleryExtendedThumb ref={ref} item={item} isActive={isActive} aria-label={ariaLabel} onClick={onSelect} />
);

/**
 * Горизонтальная лента миниатюр с нативным скроллом и автоцентровкой активной миниатюры.
 * Данные берёт из контекста `ImageGalleryExtended`.
 */
export const ImageGalleryExtendedThumbnails = React.forwardRef<HTMLDivElement, IImageGalleryExtendedThumbnailsProps>(
    ({ className, children, onKeyDown, ...rest }, ref) => {
        const { items, selectedIndex, onSelect } = useContext(ImageGalleryExtendedContext);
        const renderThumb = children ?? renderDefaultThumb;
        const carouselRef = useRef<HTMLDivElement>(null);
        const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

        // carouselRef уже назначен к моменту, когда React запрашивает imperative handle.
        useImperativeHandle(ref, () => carouselRef.current as HTMLDivElement);

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

            // Центрируем активную миниатюру в видимой области ленты. У краёв браузер
            // сам ограничит scrollLeft, поэтому первая/последняя прижмутся к краю.
            const offsetToCenter = thumbRect.left + thumbRect.width / 2 - (carouselRect.left + carouselRect.width / 2);

            scrollSmoothHorizontally(carousel, Math.round(offsetToCenter));
        }, [selectedIndex]);

        const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
            const key = event.code || event.keyCode;

            if (isKey(key, "ARROW_LEFT")) {
                event.preventDefault();
                onSelect(selectedIndex - 1);
            } else if (isKey(key, "ARROW_RIGHT")) {
                event.preventDefault();
                onSelect(selectedIndex + 1);
            }

            onKeyDown?.(event);
        };

        return (
            <div ref={carouselRef} {...rest} className={clsx(styles.thumbnails, className)} onKeyDown={handleKeyDown}>
                {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {renderThumb({
                            item,
                            index,
                            isActive: index === selectedIndex,
                            ariaLabel: item.alt,
                            onSelect: () => onSelect(index),
                            ref: (instance) => {
                                thumbRefs.current[index] = instance;
                            },
                        })}
                    </React.Fragment>
                ))}
            </div>
        );
    },
);

ImageGalleryExtendedThumbnails.displayName = "ImageGalleryExtendedThumbnails";
