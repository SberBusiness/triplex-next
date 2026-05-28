import React from "react";
import clsx from "clsx";
import { IImageGalleryItemProps } from "../types";
import styles from "../styles/ImageGalleryExtendedMain.module.less";

/** Свойства одного слайда галереи. */
export interface IImageGalleryExtendedSlideProps {
    /** Изображение слайда. */
    item: IImageGalleryItemProps;
    /** Показывать ли блюр-слой по краям. */
    withBlur?: boolean;
    /** Обработчик клика по изображению. */
    onClick?: () => void;
}

/**
 * Один слайд крупного изображения: опциональный блюр-слой и само изображение.
 * Используется как самостоятельно (десктоп), так и внутри ленты свайпа (мобильный).
 */
export const ImageGalleryExtendedSlide: React.FC<IImageGalleryExtendedSlideProps> = ({ item, withBlur, onClick }) => (
    <div className={styles.slide}>
        {withBlur && <img src={item.src} alt="" className={styles.blur} aria-hidden="true" />}

        {onClick ? (
            <button type="button" className={styles.imageButton} onClick={onClick}>
                <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    className={clsx(styles.image, styles.clickable)}
                    loading="lazy"
                />
            </button>
        ) : (
            <img src={item.src} alt={item.alt ?? ""} className={styles.image} loading="lazy" />
        )}
    </div>
);

ImageGalleryExtendedSlide.displayName = "ImageGalleryExtendedSlide";
