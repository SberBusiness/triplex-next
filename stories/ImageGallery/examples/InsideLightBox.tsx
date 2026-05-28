import React, { useState } from "react";
import { ImageGallery, LightBox, Page, EBodyPageType } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/**
 * Клик по крупной картинке открывает LightBox, внутри которого `ImageGallery`
 * рендерится повторно в `Page.Body` с увеличенной высотой и лентой миниатюр.
 * Индекс синхронизируется между preview и lightbox-копией через controlled-режим.
 */
export const InsideLightBox = () => {
    const [selectedId, setSelectedId] = useState("photo-1");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <ImageGallery
                items={ITEMS}
                selectedId={selectedId}
                onChange={setSelectedId}
                onImageClick={handleOpen}
                prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                nextArrowProps={{ "aria-label": "Следующее изображение" }}
            />

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                    <LightBox.Content key="content" isLoading={false}>
                        <Page>
                            <Page.Body type={EBodyPageType.SECOND}>
                                <ImageGallery
                                    items={ITEMS}
                                    selectedId={selectedId}
                                    onChange={setSelectedId}
                                    height={592}
                                    showThumbnails
                                    prevArrowProps={{ "aria-label": "Предыдущее изображение" }}
                                    nextArrowProps={{ "aria-label": "Следующее изображение" }}
                                />
                            </Page.Body>
                        </Page>
                    </LightBox.Content>

                    <LightBox.Controls>
                        <LightBox.Controls.Close title="Закрыть" onClick={handleClose} />
                    </LightBox.Controls>
                </LightBox>
            ) : (
                <div style={{ marginTop: 16 }}>Кликните на большое изображение, чтобы открыть LightBox.</div>
            )}
        </>
    );
};
