import React, { useState } from "react";
import {
    LightBox,
    Page,
    Button,
    EButtonTheme,
    Gap,
    Title,
    Text,
    EFontType,
    ETextSize,
    ETitleSize,
    EHeaderPageType,
    EFooterPageType,
    EBodyPageType,
    Island,
    IslandBody,
    EIslandType,
    FocusTrapUtils,
    EComponentSize,
    MobileView,
} from "@sberbusiness/triplex-next";

const POEM_LINES: string[] = [
    "Мой дядя самых честных правил,",
    "Когда не в шутку занемог,",
    "Он уважать себя заставил",
    "И лучше выдумать не мог.",
    "Его пример другим наука;",
    "Но, боже мой, какая скука",
    "С больным сидеть и день и ночь,",
    "Не отходя ни шагу прочь!",
    "Какое низкое коварство",
    "Полуживого забавлять,",
    "Ему подушки поправлять,",
    "Печально подносить лекарство,",
    "Вздыхать и думать про себя:",
    "Когда же черт возьмёт тебя…",
];

const PoemBlock: React.FC = () => (
    <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
        <IslandBody>
            {POEM_LINES.map((line) => (
                <React.Fragment key={line}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </IslandBody>
    </Island>
);

export const WithSideOverlayExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openedSideOverlayLG, setOpenedSideOverlayLG] = useState(false);
    const [openedSideOverlayMD, setOpenedSideOverlayMD] = useState(false);
    const [openedSideOverlaySM, setOpenedSideOverlaySM] = useState(false);

    const handleOpenSideOverlayLG = () => setOpenedSideOverlayLG(true);
    const handleCloseSideOverlayLG = () => setOpenedSideOverlayLG(false);
    const handleOpenSideOverlayMD = () => setOpenedSideOverlayMD(true);
    const handleCloseSideOverlayMD = () => setOpenedSideOverlayMD(false);
    const handleOpenSideOverlaySM = () => setOpenedSideOverlaySM(true);
    const handleCloseSideOverlaySM = () => setOpenedSideOverlaySM(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const renderLightBoxControls = () => (
        <LightBox.Controls key="controls">
            <LightBox.Controls.Close title="Закрыть" data-test-id="lightbox-close" onClick={handleClose} />
        </LightBox.Controls>
    );

    const renderLightBoxSideOverlayLG = () => (
        <LightBox.SideOverlay
            key="sideOverlayLG"
            opened={openedSideOverlayLG}
            size={EComponentSize.LG}
            isTopLevelSideOverlayOpened={openedSideOverlayMD || openedSideOverlaySM}
        >
            <Page>
                <Page.Header type={EHeaderPageType.FIRST} sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <MobileView
                                fallback={
                                    <Title
                                        tag="h1"
                                        size={ETitleSize.H1}
                                        tabIndex={-1}
                                        // Устанавливает фокус на первый элемент при открытии LightBox.
                                        {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                                    >
                                        Евгений Онегин
                                    </Title>
                                }
                            >
                                <Title tag="h2" size={ETitleSize.H2}>
                                    Евгений Онегин
                                </Title>
                            </MobileView>
                        </Page.Header.Title.Content>
                        <Page.Header.Title.Controls>
                            {/* Кнопка закрытия SideOverlay для мобильного устройства. Отображается только на мобильном устройстве, внутри заголовка SideOverlay. */}
                            <LightBox.SideOverlay.CloseMobile
                                data-test-id="lightbox-side-overlay-close"
                                onClick={handleCloseSideOverlayLG}
                            />
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body type={EBodyPageType.SECOND}>
                    {[0, 1, 2].map((index) => (
                        <React.Fragment key={index}>
                            <PoemBlock />
                            {index < 2 && <Gap size={24} />}
                        </React.Fragment>
                    ))}
                </Page.Body>

                <Page.Footer type={EFooterPageType.FIRST} sticky>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EComponentSize.MD}
                                onClick={handleOpenSideOverlayMD}
                            >
                                Открыть SideOverlay MD
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>

            {/* Кнопка закрытия SideOverlay для десктопа. Отображается только на десктопе, справа от заголовка SideOverlay. */}
            <LightBox.SideOverlay.CloseDesktop
                data-test-id="lightbox-side-overlay-close"
                clickByEsc={!openedSideOverlayMD && !openedSideOverlaySM}
                onClick={handleCloseSideOverlayLG}
            />
        </LightBox.SideOverlay>
    );

    const renderLightBoxSideOverlayMD = () => (
        <LightBox.SideOverlay
            key="sideOverlayMD"
            opened={openedSideOverlayMD}
            size={EComponentSize.MD}
            isTopLevelSideOverlayOpened={openedSideOverlaySM}
        >
            <Page>
                <Page.Header type={EHeaderPageType.FIRST} sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <MobileView
                                fallback={
                                    <Title
                                        tag="h1"
                                        size={ETitleSize.H1}
                                        tabIndex={-1}
                                        // Устанавливает фокус на первый элемент при открытии LightBox.
                                        {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                                    >
                                        Евгений Онегин
                                    </Title>
                                }
                            >
                                <Title tag="h2" size={ETitleSize.H2}>
                                    Евгений Онегин
                                </Title>
                            </MobileView>
                        </Page.Header.Title.Content>
                        <Page.Header.Title.Controls>
                            <LightBox.SideOverlay.CloseMobile
                                data-test-id="lightbox-side-overlay-close"
                                onClick={handleCloseSideOverlayMD}
                            />
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body type={EBodyPageType.SECOND}>
                    {[0, 1, 2].map((index) => (
                        <React.Fragment key={index}>
                            <PoemBlock />
                            {index < 2 && <Gap size={24} />}
                        </React.Fragment>
                    ))}
                </Page.Body>

                <Page.Footer type={EFooterPageType.FIRST} sticky>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EComponentSize.MD}
                                onClick={handleOpenSideOverlaySM}
                            >
                                Открыть SideOverlay SM
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>

            <LightBox.SideOverlay.CloseDesktop
                data-test-id="lightbox-side-overlay-close"
                clickByEsc={!openedSideOverlaySM}
                onClick={handleCloseSideOverlayMD}
            />
        </LightBox.SideOverlay>
    );

    const renderLightBoxSideOverlaySM = () => (
        <LightBox.SideOverlay key="sideOverlaySM" opened={openedSideOverlaySM} size={EComponentSize.SM}>
            <Page>
                <Page.Header type={EHeaderPageType.FIRST} sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <MobileView
                                fallback={
                                    <Title
                                        tag="h1"
                                        size={ETitleSize.H1}
                                        tabIndex={-1}
                                        // Устанавливает фокус на первый элемент при открытии LightBox.
                                        {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                                    >
                                        Евгений Онегин
                                    </Title>
                                }
                            >
                                <Title tag="h2" size={ETitleSize.H2}>
                                    Евгений Онегин
                                </Title>
                            </MobileView>
                        </Page.Header.Title.Content>
                        <Page.Header.Title.Controls>
                            <LightBox.SideOverlay.CloseMobile
                                data-test-id="lightbox-side-overlay-close"
                                onClick={handleCloseSideOverlaySM}
                            />
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body type={EBodyPageType.FIRST}>
                    Если контента мало, рекомендуется использовать Page.Body типа FIRST, чтобы не было пустого
                    пространства.
                </Page.Body>

                <Page.Footer type={EFooterPageType.FIRST} sticky={openedSideOverlaySM}>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                Button text
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                Button text
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>

            <LightBox.SideOverlay.CloseDesktop
                data-test-id="lightbox-side-overlay-close"
                clickByEsc
                onClick={handleCloseSideOverlaySM}
            />
        </LightBox.SideOverlay>
    );

    const renderLightBoxSideOverlays = () => (
        <>
            {renderLightBoxSideOverlayLG()}
            {renderLightBoxSideOverlayMD()}
            {renderLightBoxSideOverlaySM()}
        </>
    );

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={openedSideOverlayLG} isTopOverlayOpened={false}>
                    <LightBox.Content key="content" isLoading={false}>
                        <Page>
                            <Page.Header type={EHeaderPageType.FIRST} sticky>
                                <Page.Header.Title>
                                    <Page.Header.Title.Content>
                                        <MobileView
                                            fallback={
                                                <Title
                                                    tag="h1"
                                                    size={ETitleSize.H1}
                                                    tabIndex={-1}
                                                    // Устанавливает фокус на первый элемент при открытии LightBox.
                                                    {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                                                >
                                                    Евгений Онегин
                                                </Title>
                                            }
                                        >
                                            <Title tag="h2" size={ETitleSize.H2}>
                                                Евгений Онегин
                                            </Title>
                                        </MobileView>

                                        <Gap size={8} />
                                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                            Русский поэт, драматург и прозаик, заложивший основы русского
                                            реалистического направления.
                                        </Text>
                                    </Page.Header.Title.Content>
                                    <Page.Header.Title.Controls>
                                        <Button
                                            theme={EButtonTheme.GENERAL}
                                            size={EComponentSize.MD}
                                            onClick={handleOpenSideOverlayLG}
                                        >
                                            SideOverlay LG
                                        </Button>
                                    </Page.Header.Title.Controls>
                                </Page.Header.Title>
                            </Page.Header>

                            <Page.Body type={EBodyPageType.SECOND}>
                                {[0, 1, 2].map((index) => (
                                    <React.Fragment key={index}>
                                        <PoemBlock />
                                        {index < 2 && <Gap size={24} />}
                                    </React.Fragment>
                                ))}
                            </Page.Body>

                            <Page.Footer type={EFooterPageType.FIRST} sticky>
                                <Page.Footer.Description>
                                    <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                                    <Page.Footer.Description.Controls>
                                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                            Button text
                                        </Button>
                                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                            Button text
                                        </Button>
                                    </Page.Footer.Description.Controls>
                                </Page.Footer.Description>
                            </Page.Footer>
                        </Page>
                    </LightBox.Content>

                    {renderLightBoxControls()}

                    {renderLightBoxSideOverlays()}
                </LightBox>
            ) : null}
        </div>
    );
};
