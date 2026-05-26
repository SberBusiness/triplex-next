import React from "react";
import clsx from "clsx";
import { CaretleftStrokeSrvIcon24, CaretrightStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ButtonIcon, IButtonIconProps } from "../../Button/ButtonIcon";
import { EImageGalleryArrowDirection } from "../enums";
import styles from "../styles/ImageGalleryExtendedMain.module.less";

/** Свойства ImageGalleryExtendedArrow. */
export interface IImageGalleryExtendedArrowProps extends IButtonIconProps {
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
    ({ direction, className, "aria-label": ariaLabel, ...rest }, ref) => {
        const Icon =
            direction === EImageGalleryArrowDirection.PREV ? CaretleftStrokeSrvIcon24 : CaretrightStrokeSrvIcon24;

        return (
            <ButtonIcon
                ref={ref}
                tabIndex={-1}
                {...rest}
                aria-label={ariaLabel ?? DIRECTION_LABEL[direction]}
                className={clsx(styles.arrow, DIRECTION_CLASS[direction], className)}
            >
                <Icon paletteIndex={5} />
            </ButtonIcon>
        );
    },
);

ImageGalleryExtendedArrow.displayName = "ImageGalleryExtendedArrow";
