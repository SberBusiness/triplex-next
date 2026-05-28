import React from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EImageGalleryArrowDirection } from "../enums";
import styles from "../styles/ImageGalleryExtendedMain.module.less";
import { IconWrapper } from "@sberbusiness/triplex-next/components";

/** Свойства ImageGalleryExtendedArrow. */
export interface IImageGalleryExtendedArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Направление: предыдущее (`PREV`) или следующее (`NEXT`) изображение. */
    direction: EImageGalleryArrowDirection;
}

const DIRECTION_CLASS: Record<EImageGalleryArrowDirection, string> = {
    [EImageGalleryArrowDirection.PREV]: styles.prev,
    [EImageGalleryArrowDirection.NEXT]: styles.next,
};

const DIRECTION_LABEL: Record<EImageGalleryArrowDirection, string> = {
    [EImageGalleryArrowDirection.PREV]: "Предыдущее изображение",
    [EImageGalleryArrowDirection.NEXT]: "Следующее изображение",
};

/**
 * Презентационная кнопка-стрелка переключения изображения. Состояние навигации
 * (`disabled` / `hidden` / `onClick`) передаётся через props — как правило, из
 * render-функции `ImageGalleryExtended.Nav`. Позиционируется абсолютно внутри
 * `ImageGalleryExtended.Main`, поэтому используется как его child.
 */
export const ImageGalleryExtendedArrow = React.forwardRef<HTMLButtonElement, IImageGalleryExtendedArrowProps>(
    ({ direction, className, "aria-label": ariaLabel, disabled, ...rest }, ref) => {
        const Icon =
            direction === EImageGalleryArrowDirection.PREV ? CaretleftStrokeSrvIcon24 : CaretrightStrokeSrvIcon24;

        return (
            <IconWrapper disabled={disabled}>
                <button
                    type="button"
                    ref={ref}
                    tabIndex={-1}
                    disabled={disabled}
                    {...rest}
                    aria-label={ariaLabel ?? DIRECTION_LABEL[direction]}
                    className={clsx(styles.arrow, DIRECTION_CLASS[direction], className)}
                >
                    <Icon paletteIndex={7} />
                </button>
            </IconWrapper>
        );
    },
);

ImageGalleryExtendedArrow.displayName = "ImageGalleryExtendedArrow";
