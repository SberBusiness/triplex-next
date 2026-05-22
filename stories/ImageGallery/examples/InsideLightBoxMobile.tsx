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
 * Тот же сценарий, что и `InsideLightBox`, но в мобильном viewport.
 * На <768px лента миниатюр заменяется тиками-индикаторами и появляется
 * свайп влево/вправо через `SwipeableArea`.
 */
export const InsideLightBoxMobile = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const renderItems = () =>
        IMAGES.map((src, index) => <ImageGallery.Item key={src} src={src} alt={`Photo ${index + 1}`} />);

    return (
        <>
            <ImageGallery selectedIndex={selectedIndex} onChange={setSelectedIndex} onImageClick={handleOpen}>
                {renderItems()}
            </ImageGallery>

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                    <LightBox.Content key="content" isLoading={false}>
                        <div style={{ padding: 16 }}>
                            <ImageGallery selectedIndex={selectedIndex} onChange={setSelectedIndex} height="70vh">
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
