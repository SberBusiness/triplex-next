import React, { useState } from "react";
import {
    Button,
    Confirm,
    EBodyPageType,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EHeaderPageType,
    ETextSize,
    ETitleSize,
    FocusTrapUtils,
    LightBox,
    Page,
    Text,
    Title,
    TopOverlay,
} from "@sberbusiness/triplex-next";

/**
 * Типовой сценарий: закрытие LightBox с несохранёнными данными подтверждается в верхней панели.
 */
export const WithConfirm = () => {
    const [lightBoxOpened, setLightBoxOpened] = useState(false);
    const [topOverlayOpened, setTopOverlayOpened] = useState(false);

    const handleCloseLightBox = () => setTopOverlayOpened(true);
    const handleCancel = () => setTopOverlayOpened(false);
    const handleConfirm = () => {
        setTopOverlayOpened(false);
        setLightBoxOpened(false);
    };

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
                                            Форма редактирования
                                        </Title>
                                    </Page.Header.Title.Content>
                                </Page.Header.Title>
                            </Page.Header>

                            <Page.Body type={EBodyPageType.FIRST}>
                                <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                                    Закройте лайтбокс крестиком — верхняя панель попросит подтвердить выход.
                                </Text>
                            </Page.Body>
                        </Page>

                        <TopOverlay opened={topOverlayOpened} onOpen={() => {}} onClose={() => {}}>
                            <Confirm>
                                <Confirm.Content>
                                    <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                                    <Confirm.Content.SubTitle>
                                        Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму
                                        редактирования?
                                    </Confirm.Content.SubTitle>
                                </Confirm.Content>
                                <Confirm.Controls>
                                    <Button
                                        theme={EButtonTheme.SECONDARY}
                                        size={EComponentSize.MD}
                                        onClick={handleCancel}
                                    >
                                        Отмена
                                    </Button>
                                    <Button
                                        theme={EButtonTheme.DANGER}
                                        size={EComponentSize.MD}
                                        onClick={handleConfirm}
                                    >
                                        Покинуть форму
                                    </Button>
                                </Confirm.Controls>
                                <Confirm.Close
                                    title="Закрыть"
                                    // Закрыть по Esc, только если верхняя панель открыта.
                                    clickByEsc={topOverlayOpened}
                                    onClick={handleCancel}
                                />
                            </Confirm>
                        </TopOverlay>
                    </LightBox.Content>

                    <LightBox.Controls>
                        <LightBox.Controls.Close title="Закрыть" onClick={handleCloseLightBox} />
                    </LightBox.Controls>
                </LightBox>
            ) : null}
        </div>
    );
};
