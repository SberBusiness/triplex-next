import React, { useState } from "react";
import {
    EBodyPageType,
    EFooterPageType,
    EHeaderPageType,
    ELightBoxSize,
    ETitleSize,
    FocusTrapUtils,
    LightBox,
    MobileView,
    Page,
    Title,
} from "@sberbusiness/triplex-next";

interface ISideOverlayVisualTestsProps {
    size: ELightBoxSize;
}

export const SideOverlayVisualTests = ({ size }: ISideOverlayVisualTestsProps) => {
    const [opened, setOpened] = useState(true);
    const handleClose = () => setOpened(false);

    return (
        <LightBox isSideOverlayOpened={opened}>
            <LightBox.Content key="content">
                <Page>
                    <Page.Body type={EBodyPageType.FIRST}>Содержимое LightBox</Page.Body>
                </Page>
            </LightBox.Content>
            <LightBox.SideOverlay key="sideOverlay" opened={opened} size={size} aria-label={`SideOverlay ${size}`}>
                <Page>
                    <Page.Header type={EHeaderPageType.FIRST}>
                        <Page.Header.Title>
                            <Page.Header.Title.Content>
                                <MobileView
                                    fallback={
                                        <Title
                                            tag="h1"
                                            size={ETitleSize.H1}
                                            tabIndex={-1}
                                            {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                                        >
                                            SideOverlay {size.toUpperCase()}
                                        </Title>
                                    }
                                >
                                    <Title tag="h2" size={ETitleSize.H2}>
                                        SideOverlay
                                    </Title>
                                </MobileView>
                            </Page.Header.Title.Content>
                            <Page.Header.Title.Controls>
                                <LightBox.SideOverlay.CloseMobile aria-label="Закрыть" onClick={handleClose} />
                            </Page.Header.Title.Controls>
                        </Page.Header.Title>
                    </Page.Header>
                    <Page.Body type={EBodyPageType.FIRST}>
                        Мой дядя самых честных правил, когда не в шутку занемог, он уважать себя заставил и лучше
                        выдумать не мог. Его пример другим наука; но, боже мой, какая скука с больным сидеть и день и
                        ночь, не отходя ни шагу прочь!
                    </Page.Body>
                    <Page.Footer type={EFooterPageType.FIRST}>
                        <Page.Footer.Description>
                            <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                        </Page.Footer.Description>
                    </Page.Footer>
                </Page>
                <LightBox.SideOverlay.CloseDesktop aria-label="Закрыть" clickByEsc onClick={handleClose} />
            </LightBox.SideOverlay>
        </LightBox>
    );
};
