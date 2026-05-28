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
        {withBlur && <div className={styles.blur} style={{ backgroundImage: `url(${item.src})` }} aria-hidden="true" />}

        <img
            src={item.src}
            alt={item.alt ?? ""}
            className={clsx(styles.image, { [styles.clickable]: onClick !== undefined })}
            loading="lazy"
            onClick={onClick}
        />
    </div>
);

ImageGalleryExtendedSlide.displayName = "ImageGalleryExtendedSlide";
