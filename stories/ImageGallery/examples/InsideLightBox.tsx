import React, { useState } from "react";
import { ImageGallery, LightBox, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

const IMAGES = [
    "/assets/images/imageGallery/01.jpg",
    "/assets/images/imageGallery/02.jpg",
    "/assets/images/imageGallery/03.jpg",
    "/assets/images/imageGallery/04.jpg",
    "/assets/images/imageGallery/05.jpg",
    "/assets/images/imageGallery/06.jpg",
    "/assets/images/imageGallery/07.jpg",
    "/assets/images/imageGallery/08.jpg",
    "/assets/images/imageGallery/09.jpg",
];

/**
 * Клик по крупной картинке открывает LightBox, в котором тот же `ImageGallery`
 * рендерится повторно с другими настройками (без миниатюр, увеличенная высота).
 * Индекс синхронизируется между preview и lightbox-копией через controlled-режим.
 */
export const InsideLightBox = () => {
    const [selectedId, setSelectedId] = useState("photo-1");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const renderItems = () =>
        IMAGES.map((src, index) => (
            <ImageGallery.Item key={src} id={`photo-${index + 1}`} src={src} alt={`Photo ${index + 1}`} />
        ));

    return (
        <>
            <ImageGallery selectedId={selectedId} onChange={setSelectedId} onImageClick={handleOpen}>
                {renderItems()}
            </ImageGallery>

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                    <LightBox.Content key="content" isLoading={false}>
                        <div style={{ padding: 24 }}>
                            <ImageGallery
                                selectedId={selectedId}
                                onChange={setSelectedId}
                                showThumbnails={false}
                                height="80vh"
                            >
                                {renderItems()}
                            </ImageGallery>
                        </div>
                    </LightBox.Content>

                    <LightBox.Controls>
                        <LightBox.Controls.Close title="Закрыть" onClick={handleClose} />
                    </LightBox.Controls>
                </LightBox>
            ) : (
                <div style={{ marginTop: 16 }}>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                        Открыть LightBox
                    </Button>
                </div>
            )}
        </>
    );
};
