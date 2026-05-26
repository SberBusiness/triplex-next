import React, { useState } from "react";
import { MobileView } from "../MobileView";
import { ImageGalleryExtended, EImageGalleryArrowDirection } from "../ImageGalleryExtended";
import { IImageGalleryProps } from "./types";

/**
 * Галерея изображений с лентой миниатюр (десктоп) и тиками-индикаторами (мобильный).
 *
 * Тонкая обёртка над `ImageGalleryExtended`: задаёт пресет раскладки
 * (`Main` + миниатюры/тики через `MobileView`) и добавляет uncontrolled-режим
 * (`defaultId`). Изображения задаются массивом `items`.
 * Поддерживает controlled (`selectedId` + `onChange`) и uncontrolled режимы.
 */
export const ImageGallery = React.forwardRef<HTMLDivElement, IImageGalleryProps>(
    (
        {
            items,
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
            <ImageGalleryExtended
                ref={ref}
                {...rest}
                items={items}
                selectedId={currentId ?? ""}
                onChange={handleChange}
            >
                <ImageGalleryExtended.Main height={height} withBlur={withBlur} onImageClick={onImageClick}>
                    <ImageGalleryExtended.Nav>
                        {({ onPrev, onNext, isFirst, isLast, itemsCount }) => (
                            <>
                                <ImageGalleryExtended.Arrow
                                    direction={EImageGalleryArrowDirection.PREV}
                                    onClick={onPrev}
                                    disabled={isFirst}
                                    hidden={itemsCount <= 1}
                                />
                                <ImageGalleryExtended.Arrow
                                    direction={EImageGalleryArrowDirection.NEXT}
                                    onClick={onNext}
                                    disabled={isLast}
                                    hidden={itemsCount <= 1}
                                />
                            </>
                        )}
                    </ImageGalleryExtended.Nav>
                </ImageGalleryExtended.Main>

                <MobileView fallback={showThumbnails ? <ImageGalleryExtended.Thumbnails /> : null}>
                    {showDots ? <ImageGalleryExtended.Dots /> : null}
                </MobileView>
            </ImageGalleryExtended>
        );
    },
);

ImageGallery.displayName = "ImageGallery";
