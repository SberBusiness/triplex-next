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
    Confirm,
    EConfirmParentComponent,
    MobileView,
    Spoiler,
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

// Пример для воспроизведения неверного позиционирования TopOverlay.
// Сценарий: открыть TopOverlay в LightBox, открыть SideOverlay, открыть TopOverlay
// в SideOverlay, закрыть SideOverlay, раскрыть спойлер (увеличить высоту контента),
// проскроллить LightBox вниз и снова открыть TopOverlay LightBox.
export const WithTopOverlayExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Раскрытие спойлера резко увеличивает высоту контента LightBox, чтобы был скролл.
    const [spoilerExpanded, setSpoilerExpanded] = useState(false);

    // TopOverlay самого LightBox.
    const [openedTopOverlay, setOpenedTopOverlay] = useState(false);
    const [closeConfirmed, setCloseConfirmed] = useState(false);

    // SideOverlay и его собственный TopOverlay.
    const [openedSideOverlay, setOpenedSideOverlay] = useState(false);
    const [openedSideTopOverlay, setOpenedSideTopOverlay] = useState(false);
    const [sideCloseConfirmed, setSideCloseConfirmed] = useState(false);

    // --- TopOverlay самого LightBox ---
    const handleOpenTopOverlay = () => setOpenedTopOverlay(true);
    const handleCloseTopOverlay = () => {
        if (closeConfirmed) {
            setIsOpen(false);
            setCloseConfirmed(false);
        } else {
            setOpenedTopOverlay(false);
        }
    };

    const handleOpen = () => setIsOpen(true);
    // Кнопка "Закрыть" в LightBox открывает TopOverlay.
    const handleClose = () => setOpenedTopOverlay(true);

    // --- SideOverlay и его TopOverlay ---
    const handleOpenSideOverlay = () => setOpenedSideOverlay(true);
    const handleOpenSideTopOverlay = () => setOpenedSideTopOverlay(true);
    const handleCloseSideTopOverlay = () => {
        if (sideCloseConfirmed) {
            setOpenedSideOverlay(false);
            setSideCloseConfirmed(false);
        } else {
            setOpenedSideTopOverlay(false);
        }
    };
    // Кнопка "Закрыть" в SideOverlay открывает его TopOverlay.
    const handleCloseSideOverlay = () => setOpenedSideTopOverlay(true);

    const renderLightBoxControls = () => (
        <LightBox.Controls key="controls">
            <LightBox.Controls.Close title="Закрыть" data-test-id="lightbox-close" onClick={handleClose} />
            <LightBox.Controls.Prev title="Назад" clickByArrowLeft onClick={() => console.log("Prev clicked")} />
            <LightBox.Controls.Next title="Вперёд" clickByArrowRight onClick={() => console.log("Next clicked")} />
        </LightBox.Controls>
    );

    const renderTopOverlay = () => (
        <LightBox.TopOverlay opened={openedTopOverlay} onClose={handleCloseTopOverlay} onOpen={handleOpenTopOverlay}>
            <Confirm>
                <Confirm.Content>
                    <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                    <Confirm.Content.SubTitle>
                        Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
                    </Confirm.Content.SubTitle>
                </Confirm.Content>
                <Confirm.Controls>
                    <Button
                        theme={EButtonTheme.SECONDARY}
                        size={EComponentSize.MD}
                        onClick={() => setOpenedTopOverlay(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        theme={EButtonTheme.DANGER}
                        size={EComponentSize.MD}
                        onClick={() => {
                            handleCloseTopOverlay();
                            setCloseConfirmed(true);
                        }}
                    >
                        Покинуть форму
                    </Button>
                </Confirm.Controls>
                <Confirm.Close
                    title="Закрыть"
                    // Закрыть по Esc, если TopOverlay открыт.
                    clickByEsc={openedTopOverlay}
                    onClick={() => setOpenedTopOverlay(false)}
                />
            </Confirm>
        </LightBox.TopOverlay>
    );

    const renderSideTopOverlay = () => (
        <LightBox.TopOverlay
            opened={openedSideTopOverlay}
            onClose={handleCloseSideTopOverlay}
            onOpen={handleOpenSideTopOverlay}
        >
            <Confirm parentComponent={EConfirmParentComponent.SIDE_OVERLAY_MD}>
                <Confirm.Content>
                    <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                    <Confirm.Content.SubTitle>
                        Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
                    </Confirm.Content.SubTitle>
                </Confirm.Content>
                <Confirm.Controls>
                    <Button
                        theme={EButtonTheme.SECONDARY}
                        size={EComponentSize.MD}
                        onClick={() => setOpenedSideTopOverlay(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        theme={EButtonTheme.DANGER}
                        size={EComponentSize.MD}
                        onClick={() => {
                            handleCloseSideTopOverlay();
                            setSideCloseConfirmed(true);
                        }}
                    >
                        Покинуть форму
                    </Button>
                </Confirm.Controls>
                <Confirm.Close
                    title="Закрыть"
                    // Закрыть по Esc, если TopOverlay открыт.
                    clickByEsc={openedSideTopOverlay}
                    onClick={() => setOpenedSideTopOverlay(false)}
                />
            </Confirm>
        </LightBox.TopOverlay>
    );

    const renderLightBoxSideOverlay = () => (
        <LightBox.SideOverlay
            key="sideOverlayMD"
            opened={openedSideOverlay}
            size={EComponentSize.MD}
            isTopLevelSideOverlayOpened={false}
            isTopOverlayOpened={openedSideTopOverlay}
        >
            <Page>
                <Page.Header type={EHeaderPageType.FIRST} sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <MobileView
                                fallback={
                                    <Title tag="h1" size={ETitleSize.H1} tabIndex={-1}>
                                        Боковая панель
                                    </Title>
                                }
                            >
                                <Title tag="h2" size={ETitleSize.H2}>
                                    Боковая панель
                                </Title>
                            </MobileView>
                        </Page.Header.Title.Content>
                        <Page.Header.Title.Controls>
                            <LightBox.SideOverlay.CloseMobile
                                data-test-id="lightbox-side-overlay-close"
                                onClick={handleCloseSideOverlay}
                            />
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body type={EBodyPageType.SECOND}>
                    {[0, 1, 2].map((index) => (
                        <React.Fragment key={index}>
                            <PoemBlock />
                            {index < 2 && <Gap size={16} />}
                        </React.Fragment>
                    ))}
                </Page.Body>

                <Page.Footer type={EFooterPageType.FIRST} sticky>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                Button text
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>

            <LightBox.SideOverlay.CloseDesktop
                data-test-id="lightbox-side-overlay-close"
                clickByEsc={!openedSideTopOverlay}
                onClick={handleCloseSideOverlay}
            />

            {renderSideTopOverlay()}
        </LightBox.SideOverlay>
    );

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox
                    isLoading={false}
                    isSideOverlayOpened={openedSideOverlay}
                    isTopOverlayOpened={openedTopOverlay}
                >
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
                                            onClick={handleOpenSideOverlay}
                                        >
                                            SideOverlay MD
                                        </Button>
                                    </Page.Header.Title.Controls>
                                </Page.Header.Title>
                            </Page.Header>

                            <Page.Body type={EBodyPageType.SECOND}>
                                {[0, 1, 2].map((index) => (
                                    <React.Fragment key={index}>
                                        <PoemBlock />
                                        {index < 2 && <Gap size={16} />}
                                    </React.Fragment>
                                ))}

                                <Gap size={16} />

                                <Spoiler
                                    labelExpand="Показать ещё строфы"
                                    labelCollapse="Скрыть строфы"
                                    size={EComponentSize.MD}
                                    expanded={spoilerExpanded}
                                    toggle={setSpoilerExpanded}
                                >
                                    {[3, 4, 5, 6].map((index) => (
                                        <React.Fragment key={index}>
                                            <PoemBlock />
                                            {index < 6 && <Gap size={16} />}
                                        </React.Fragment>
                                    ))}
                                </Spoiler>
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

                        {renderTopOverlay()}
                    </LightBox.Content>

                    {renderLightBoxControls()}

                    {renderLightBoxSideOverlay()}
                </LightBox>
            ) : null}
        </div>
    );
};
