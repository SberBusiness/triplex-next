import React from "react";
import clsx from "clsx";
import { IImageGalleryItemProps } from "../types";
import styles from "../styles/ImageGalleryExtendedThumbnails.module.less";

/** Свойства ImageGalleryExtendedThumb. */
export interface IImageGalleryExtendedThumbProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Элемент галереи, миниатюра которого отображается. */
    item: IImageGalleryItemProps;
    /** Активна ли миниатюра. */
    isActive: boolean;
}

/**
 * Кнопка-миниатюра в ленте `ImageGalleryExtendedThumbnails`. `ref` пробрасывается
 * на `<button>` — родитель собирает refs для автоцентровки активной миниатюры.
 */
export const ImageGalleryExtendedThumb = React.forwardRef<HTMLButtonElement, IImageGalleryExtendedThumbProps>(
    ({ item, isActive, className, ...rest }, ref) => (
        <button
            ref={ref}
            {...rest}
            type="button"
            className={clsx(styles.thumb, { [styles.active]: isActive }, className)}
            aria-selected={isActive}
        >
            <img src={item.thumbSrc ?? item.src} alt="" className={styles.image} loading="lazy" />
        </button>
    ),
);

ImageGalleryExtendedThumb.displayName = "ImageGalleryExtendedThumb";
