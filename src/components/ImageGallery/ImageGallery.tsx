import React, { useState } from "react";
import { MobileView } from "../MobileView";
import { ImageGalleryExtended } from "../ImageGalleryExtended";
import { IImageGalleryProps } from "./types";

/**
 * Галерея изображений с лентой миниатюр (десктоп) и тиками-индикаторами (мобильный).
 *
 * Тонкая обёртка над `ImageGalleryExtended`: задаёт пресет раскладки
 * (`Main` + миниатюры/тики через `MobileView`) и добавляет uncontrolled-режим
 * (`defaultId`). Дочерние элементы задаются в виде `<ImageGallery.Item id src alt thumbSrc?>`.
 * Поддерживает controlled (`selectedId` + `onChange`) и uncontrolled режимы.
 */
const ImageGalleryRoot = React.forwardRef<HTMLDivElement, IImageGalleryProps>(
    (
        {
            children,
            selectedId,
            defaultId,
            onChange,
            onImageClick,
            height = "auto",
            withBlur = true,
            showThumbnails = true,
            showDots = true,
            ...rest
        },
        ref,
    ) => {
        const isControlled = selectedId !== undefined;
        const [innerId, setInnerId] = useState(defaultId);
        const currentId = isControlled ? selectedId : innerId;

        // ImageGalleryExtended резолвит id в позицию и вызывает onChange только
        // при реальной смене. Пустой id (нет defaultId) → показывается первый элемент.
        const handleChange = (id: string) => {
            if (!isControlled) {
                setInnerId(id);
            }
            onChange?.(id);
        };

        return (
            <ImageGalleryExtended ref={ref} {...rest} selectedId={currentId ?? ""} onChange={handleChange}>
                <ImageGalleryExtended.Main height={height} withBlur={withBlur} onImageClick={onImageClick} />

                <MobileView fallback={showThumbnails ? <ImageGalleryExtended.Thumbnails /> : null}>
                    {showDots ? <ImageGalleryExtended.Dots /> : null}
                </MobileView>

                {children}
            </ImageGalleryExtended>
        );
    },
);

ImageGalleryRoot.displayName = "ImageGallery";

/** Compound-компонент с маркер-элементом `Item`. */
export const ImageGallery = Object.assign(ImageGalleryRoot, {
    Item: ImageGalleryExtended.Item,
});
