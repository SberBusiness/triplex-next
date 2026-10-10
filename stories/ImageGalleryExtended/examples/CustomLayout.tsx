import React, { useState } from "react";
import {
    ImageGalleryExtended,
    MobileView,
    Button,
    EButtonTheme,
    EComponentSize,
    Text,
    ETextSize,
    EFontType,
} from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/**
 * Кастомизация через render-функции: `Nav` отдаёт состояние навигации в панель
 * «Назад · N / Total · Вперёд» под картинкой вместо стрелок поверх неё, а
 * `Thumbnails` рисует стандартные миниатюры с собственным доступным именем
 * (проброс `ref` сохраняет автоцентровку). На мобильном (<768px) лента миниатюр
 * заменяется индикаторами страниц через `MobileView`.
 */
export const CustomLayout = () => {
    const [selectedId, setSelectedId] = useState("photo-1");

    return (
        <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
            <ImageGalleryExtended.Main withBlur height={400} />
            <ImageGalleryExtended.Nav>
                {({ onPrev, onNext, isFirst, isLast, selectedIndex, itemsCount }) => (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 16,
                        }}
                    >
                        <Button
                            theme={EButtonTheme.SECONDARY}
                            size={EComponentSize.SM}
                            disabled={isFirst}
                            onClick={onPrev}
                        >
                            Назад
                        </Button>
                        <Text size={ETextSize.B3} type={EFontType.SECONDARY}>
                            {selectedIndex + 1} / {itemsCount}
                        </Text>
                        <Button
                            theme={EButtonTheme.SECONDARY}
                            size={EComponentSize.SM}
                            disabled={isLast}
                            onClick={onNext}
                        >
                            Вперёд
                        </Button>
                    </div>
                )}
            </ImageGalleryExtended.Nav>
            <MobileView
                fallback={
                    <ImageGalleryExtended.Thumbnails>
                        {({ item, index, isActive, onSelect, ref }) => (
                            <ImageGalleryExtended.Thumb
                                ref={ref}
                                item={item}
                                isActive={isActive}
                                aria-label={`Фото ${index + 1} из ${ITEMS.length}`}
                                onClick={onSelect}
                            />
                        )}
                    </ImageGalleryExtended.Thumbnails>
                }
            >
                <ImageGalleryExtended.PageIndicators />
            </MobileView>
        </ImageGalleryExtended>
    );
};
