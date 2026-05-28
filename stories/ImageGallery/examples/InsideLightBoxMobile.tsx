import React, { useState } from "react";
import { ImageGallery, LightBox, Button, EButtonTheme, EComponentSize } from "@sberbusiness/triplex-next";

const ITEMS = Array.from({ length: 9 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/assets/images/imageGallery/0${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
}));

/**
 * Тот же сценарий, что и `InsideLightBox`, но в мобильном viewport.
 * На <768px лента миниатюр заменяется тиками-индикаторами и появляется
 * свайп влево/вправо.
 */
export const InsideLightBoxMobile = () => {
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
                prevArrowAriaLabel="Предыдущее изображение"
                nextArrowAriaLabel="Следующее изображение"
            />

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
                    <LightBox.Content key="content" isLoading={false}>
                        <div style={{ padding: 16 }}>
                            <ImageGallery
                                items={ITEMS}
                                selectedId={selectedId}
                                onChange={setSelectedId}
                                height="70vh"
                                prevArrowAriaLabel="Предыдущее изображение"
                                nextArrowAriaLabel="Следующее изображение"
                            />
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
