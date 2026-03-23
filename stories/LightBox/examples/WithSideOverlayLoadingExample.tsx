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

export const WithSideOverlayLoadingExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openedSideOverlayLG, setOpenedSideOverlayLG] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenSideOverlayLG = () => setOpenedSideOverlayLG(true);
    const handleCloseSideOverlayLG = () => {
        setIsLoading(false);
        setOpenedSideOverlayLG(false);
    };

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
            isTopLevelSideOverlayOpened={false}
            isLoading={isLoading}
        >
            <Page>
                <Page.Header type={EHeaderPageType.FIRST} sticky={openedSideOverlayLG}>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <Title
                                tag="h1"
                                size={ETitleSize.H1}
                                tabIndex={-1}
                                // Устанавливает фокус на первый элемент при открытии LightBox.
                                {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                            >
                                Евгений Онегин
                            </Title>
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

                <Page.Footer type={EFooterPageType.FIRST} sticky={openedSideOverlayLG}>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button
                                theme={EButtonTheme.GENERAL}
                                size={EComponentSize.MD}
                                onClick={() => setIsLoading(true)}
                            >
                                Loading on
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>

            {/* Кнопка закрытия SideOverlay для десктопа. Отображается только на десктопе, справа от заголовка SideOverlay. */}
            <LightBox.SideOverlay.CloseDesktop
                data-test-id="lightbox-side-overlay-close"
                clickByEsc
                onClick={handleCloseSideOverlayLG}
            />
        </LightBox.SideOverlay>
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
                                        <Title
                                            tag="h1"
                                            size={ETitleSize.H1}
                                            tabIndex={-1}
                                            // Устанавливает фокус на первый элемент при открытии LightBox.
                                            {...{ [FocusTrapUtils.firstInteractionElementDataAttr]: true }}
                                        >
                                            Евгений Онегин
                                        </Title>
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

                    {renderLightBoxSideOverlayLG()}
                </LightBox>
            ) : null}
        </div>
    );
};
