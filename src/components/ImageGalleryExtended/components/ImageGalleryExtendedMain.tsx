import React, { useContext } from "react";
import clsx from "clsx";
import { MobileView } from "../../MobileView";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import { ImageGalleryExtendedSlide } from "./ImageGalleryExtendedSlide";
import { ImageGalleryExtendedSwipeTrack } from "./ImageGalleryExtendedSwipeTrack";
import styles from "../styles/ImageGalleryExtendedMain.module.less";

/** Свойства ImageGalleryExtendedMain. */
export interface IImageGalleryExtendedMainProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Высота крупной картинки. `'auto'` — фиксированные значения по breakpoint. */
    height?: "auto" | number | string;
    /** Показывать ли блюр-слой по краям. */
    withBlur?: boolean;
    /** Обработчик клика по картинке. Получает индекс активного изображения. */
    onImageClick?: (index: number) => void;
    /** Накладываемое поверх картинки содержимое — например, `ImageGalleryExtended.Nav` со стрелками. */
    children?: React.ReactNode;
}

/**
 * Крупное изображение галереи: вьюпорт с изображением и накладываемым поверх
 * содержимым (`children` — например стрелки через `ImageGalleryExtended.Nav`).
 * Данные берёт из контекста `ImageGalleryExtended`. На десктопе — статичный слайд,
 * на мобильном (ширина < SM) — лента со свайпом prev/next (`ImageGalleryExtendedSwipeTrack`).
 */
export const ImageGalleryExtendedMain: React.FC<IImageGalleryExtendedMainProps> = ({
    height = "auto",
    withBlur = false,
    onImageClick,
    className,
    children,
    ...rest
}) => {
    const { items, selectedIndex } = useContext(ImageGalleryExtendedContext);

    const item = items[selectedIndex];

    if (!item) {
        return null;
    }

    const inlineHeight = height === "auto" ? undefined : typeof height === "number" ? `${height}px` : height;
    const handleImageClick = onImageClick ? () => onImageClick(selectedIndex) : undefined;

    return (
        <div
            {...rest}
            className={clsx(styles.main, className)}
            style={inlineHeight ? { height: inlineHeight } : undefined}
        >
            <MobileView
                fallback={<ImageGalleryExtendedSlide item={item} withBlur={withBlur} onClick={handleImageClick} />}
            >
                {items.length > 1 ? (
                    <ImageGalleryExtendedSwipeTrack withBlur={withBlur} onImageClick={onImageClick} />
                ) : (
                    <ImageGalleryExtendedSlide item={item} withBlur={withBlur} onClick={handleImageClick} />
                )}
            </MobileView>

            {children}
        </div>
    );
};

ImageGalleryExtendedMain.displayName = "ImageGalleryExtendedMain";
