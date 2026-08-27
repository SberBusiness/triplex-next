import React, { useState } from "react";
import {
    Button,
    EBodyPageType,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EHeaderPageType,
    ETextSize,
    ETitleSize,
    FocusTrapUtils,
    Gap,
    LightBox,
    Page,
    Text,
    Title,
    TopOverlay,
} from "@sberbusiness/triplex-next";

export const Default = () => {
    const [lightBoxOpened, setLightBoxOpened] = useState(false);
    const [topOverlayOpened, setTopOverlayOpened] = useState(false);

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => setLightBoxOpened(true)}>
                Открыть LightBox
            </Button>

            {lightBoxOpened ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={topOverlayOpened}>
                    <LightBox.Content isLoading={false}>
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
                                            Заявка на кредит
                                        </Title>
                                    </Page.Header.Title.Content>
                                    <Page.Header.Title.Controls>
                                        <Button
                                            theme={EButtonTheme.GENERAL}
                                            size={EComponentSize.MD}
                                            onClick={() => setTopOverlayOpened(true)}
                                        >
                                            Открыть верхнюю панель
                                        </Button>
                                    </Page.Header.Title.Controls>
                                </Page.Header.Title>
                            </Page.Header>

                            <Page.Body type={EBodyPageType.FIRST}>
                                <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                    Верхняя панель выезжает поверх контента лайтбокса и затемняет его маской.
                                </Text>
                            </Page.Body>
                        </Page>

                        <TopOverlay opened={topOverlayOpened} onOpen={() => {}} onClose={() => {}}>
                            <div style={{ padding: 24, textAlign: "center" }}>
                                <Title tag="h2" size={ETitleSize.H2}>
                                    Верхняя панель
                                </Title>
                                <Gap size={16} />
                                <Button
                                    theme={EButtonTheme.SECONDARY}
                                    size={EComponentSize.MD}
                                    onClick={() => setTopOverlayOpened(false)}
                                >
                                    Закрыть панель
                                </Button>
                            </div>
                        </TopOverlay>
                    </LightBox.Content>

                    <LightBox.Controls>
                        <LightBox.Controls.Close title="Закрыть" onClick={() => setLightBoxOpened(false)} />
                    </LightBox.Controls>
                </LightBox>
            ) : null}
        </div>
    );
};
