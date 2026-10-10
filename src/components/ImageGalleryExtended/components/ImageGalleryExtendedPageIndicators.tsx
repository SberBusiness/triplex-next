import React, { useContext } from "react";
import clsx from "clsx";
import { ImageGalleryExtendedContext } from "../ImageGalleryExtendedContext";
import { IPageIndicatorsProps, PageIndicators, TPageIndicatorPropsFactory } from "../../PageIndicators";
import styles from "../styles/ImageGalleryExtendedPageIndicators.module.less";

/** Свойства ImageGalleryExtendedPageIndicators. */
export interface IImageGalleryExtendedPageIndicatorsProps extends Omit<
    IPageIndicatorsProps,
    "count" | "activeIndex" | "onChange" | "orientation"
> {}

/**
 * Индикаторы страниц галереи (мобильный preset): по индикатору на каждое
 * изображение. Данные берёт из контекста `ImageGalleryExtended`.
 *
 * Доступное имя индикатора по умолчанию — `item.alt`; переопределяется через
 * `indicatorProps`. При количестве элементов `<= 1` ничего не рендерится.
 */
export const ImageGalleryExtendedPageIndicators = React.forwardRef<
    HTMLDivElement,
    IImageGalleryExtendedPageIndicatorsProps
>(({ className, indicatorProps, ...rest }, ref) => {
    const { items, selectedIndex, onSelect } = useContext(ImageGalleryExtendedContext);

    if (items.length <= 1) {
        return null;
    }

    const resolveIndicatorProps: TPageIndicatorPropsFactory = (args) => ({
        "aria-label": items[args.index]?.alt,
        ...(typeof indicatorProps === "function" ? indicatorProps(args) : indicatorProps),
    });

    return (
        <PageIndicators
            {...rest}
            ref={ref}
            className={clsx(styles.pageIndicators, className)}
            count={items.length}
            activeIndex={selectedIndex}
            onChange={onSelect}
            indicatorProps={resolveIndicatorProps}
        />
    );
});

ImageGalleryExtendedPageIndicators.displayName = "ImageGalleryExtendedPageIndicators";
