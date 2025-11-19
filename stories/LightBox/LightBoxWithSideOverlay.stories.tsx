import React, { useState } from "react";
import { LightBox } from "../../src/components/LightBox/LightBox";
import { Page } from "../../src/components/Page/Page";
import { Button } from "../../src/components/Button/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { Gap } from "../../src/components/Gap";
import { Title } from "../../src/components/Typography/Title";
import { Text } from "../../src/components/Typography/Text";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { EHeaderPageType, EFooterPageType } from "../../src/components/Page/components/enums";
import { Island } from "../../src/components/Island/Island";
import { IslandBody } from "../../src/components/Island/components/IslandBody";
import { EIslandType } from "../../src/components/Island/enums";
import { FocusTrapUtils } from "../../src/utils/focus/FocusTrapUtils";
import { EComponentSize } from "../../src/enums/EComponentSize";
import "./styles.less";
import { ELightBoxSideOverlaySize } from "../../src/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay";

const STORY_META_DESCRIPTION = `
Компонент **LightBoxWithSideOverlay** отображает крупный контент поверх страницы. Структура включает заголовок, тело, футер и дополнительные оверлеи.
`;

const meta = {
    title: "Components/LightBox/LightBoxWithSideOverlay",
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
        },
    },
};

export default meta;

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
    <Island type={EIslandType.TYPE_1} borderRadius={16} paddingSize={16}>
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

export const LightBoxWithSideOverlay: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [openedSideOverlay, setOpenedSideOverlay] = useState(true);

    console.log("openedSideOverlay", openedSideOverlay);

    const handleOpenSideOverlay = () => setOpenedSideOverlay(true);
    const handleCloseSideOverlay = () => setOpenedSideOverlay(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const renderLightBoxControls = () => (
        <LightBox.Controls key="controls">
            <LightBox.Controls.Close title="Закрыть" data-test-id="lightbox-close" onClick={handleClose} />
            <LightBox.Controls.Prev title="Назад" clickByArrowLeft onClick={() => console.log("Prev clicked")} />
            <LightBox.Controls.Next title="Вперёд" clickByArrowRight onClick={() => console.log("Next clicked")} />
        </LightBox.Controls>
    );

    const renderLightBoxSideOverlay = () => (
        <LightBox.SideOverlay key="sideOverlay" opened={openedSideOverlay} size={ELightBoxSideOverlaySize.LG}>
            <Page style={{ maxWidth: 800 }}>
                <Page.Header type={EHeaderPageType.SECOND} sticky>
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
                                onClick={handleCloseSideOverlay}
                            />
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body verticalMargin={16}>
                    {[0, 1, 2].map((index) => (
                        <React.Fragment key={index}>
                            <PoemBlock />
                            {index < 2 && <Gap size={16} />}
                        </React.Fragment>
                    ))}
                </Page.Body>

                <Page.Footer type={EFooterPageType.SECOND} sticky>
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

            {/* Кнопка закрытия SideOverlay для десктопа. Отображается только на десктопе, справа от заголовка SideOverlay. */}
            <LightBox.SideOverlay.CloseDesktop
                data-test-id="lightbox-side-overlay-close"
                clickByEsc
                onClick={handleCloseSideOverlay}
            />
        </LightBox.SideOverlay>
    );

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={openedSideOverlay} isTopOverlayOpened={false}>
                    <LightBox.Content key="content" isLoading={false}>
                        <Page style={{ maxWidth: 800 }}>
                            <Page.Header type={EHeaderPageType.SECOND} sticky>
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
                                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                                            Button text
                                        </Button>
                                        <Button
                                            theme={EButtonTheme.GENERAL}
                                            size={EComponentSize.MD}
                                            onClick={handleOpenSideOverlay}
                                        >
                                            Открыть SideOverlay
                                        </Button>
                                    </Page.Header.Title.Controls>
                                </Page.Header.Title>
                            </Page.Header>

                            <Page.Body verticalMargin={16}>
                                {[0, 1, 2].map((index) => (
                                    <React.Fragment key={index}>
                                        <PoemBlock />
                                        {index < 2 && <Gap size={16} />}
                                    </React.Fragment>
                                ))}
                            </Page.Body>

                            <Page.Footer type={EFooterPageType.SECOND} sticky>
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

                    {renderLightBoxSideOverlay()}
                </LightBox>
            ) : null}
        </div>
    );
};
