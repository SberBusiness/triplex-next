import React, { useState } from "react";
import { ImageGalleryExtended, LightBox, Page, EBodyPageType, Avatar, EAvatarSize } from "@sberbusiness/triplex-next";

const ITEMS = [{ id: "photo-1", src: "/assets/images/imageGallery/01.jpg", alt: "Photo 1" }];

/**
 * Сначала рендерится `Avatar` с миниатюрой изображения. Клик (или Enter/Space)
 * открывает `LightBox`, внутри которого то же изображение показывается крупно
 * через `ImageGalleryExtended.Main` в `Page.Body`.
 */
export const OpenFromAvatar = () => {
    const [selectedId, setSelectedId] = useState(ITEMS[0].id);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpen();
        }
    };

    return (
        <>
            <Avatar
                size={EAvatarSize.XXL}
                borderRadius={12}
                role="button"
                tabIndex={0}
                aria-label="Открыть изображение"
                onClick={handleOpen}
                onKeyDown={handleKeyDown}
                style={{
                    backgroundImage: `url(${ITEMS[0].src})`,
                    backgroundSize: "cover",
                    cursor: "pointer",
                }}
            />

            {isOpen ? (
                <LightBox>
                    <LightBox.Content key="content">
                        <Page>
                            <Page.Body type={EBodyPageType.SECOND}>
                                <ImageGalleryExtended items={ITEMS} selectedId={selectedId} onChange={setSelectedId}>
                                    <ImageGalleryExtended.Main withBlur height={592} />
                                </ImageGalleryExtended>
                            </Page.Body>
                        </Page>
                    </LightBox.Content>

                    <LightBox.Controls>
                        <LightBox.Controls.Close title="Закрыть" onClick={handleClose} />
                    </LightBox.Controls>
                </LightBox>
            ) : null}
        </>
    );
};
