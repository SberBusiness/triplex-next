import React from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { EImageGalleryArrowDirection } from "../enums";
import styles from "../styles/ImageGalleryExtendedMain.module.less";

/** Свойства ImageGalleryExtendedArrow. */
export interface IImageGalleryExtendedArrowProps extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "aria-label"
> {
    /** Направление: предыдущее (`PREV`) или следующее (`NEXT`) изображение. */
    direction: EImageGalleryArrowDirection;
    /** Доступное имя кнопки. Передаётся потребителем, чтобы не хардкодить язык в компоненте. */
    "aria-label": string;
}

const DIRECTION_CLASS: Record<EImageGalleryArrowDirection, string> = {
    [EImageGalleryArrowDirection.PREV]: styles.prev,
    [EImageGalleryArrowDirection.NEXT]: styles.next,
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
            <button
                type="button"
                ref={ref}
                disabled={disabled}
                {...rest}
                aria-label={ariaLabel}
                className={clsx(styles.arrow, DIRECTION_CLASS[direction], "hoverable", className)}
            >
                <Icon paletteIndex={7} />
            </button>
        );
    },
);

ImageGalleryExtendedArrow.displayName = "ImageGalleryExtendedArrow";
