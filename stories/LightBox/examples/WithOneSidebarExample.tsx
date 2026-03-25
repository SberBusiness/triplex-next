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
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

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

export const WithOneSidebarExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    const renderLightBoxControls = () => (
        <LightBox.Controls key="controls">
            <LightBox.Controls.Close title="Закрыть" data-test-id="lightbox-close" onClick={() => setIsOpen(false)} />
            <LightBox.Controls.Prev title="Назад" clickByArrowLeft onClick={() => console.log("Prev clicked")} />
            <LightBox.Controls.Next title="Вперёд" clickByArrowRight onClick={() => console.log("Next clicked")} />
        </LightBox.Controls>
    );

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={() => setIsOpen(true)}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox isLoading={false}>
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
                                            icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                                            theme={EButtonTheme.SECONDARY}
                                            size={EComponentSize.MD}
                                        />
                                        <Button
                                            icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                                            theme={EButtonTheme.SECONDARY}
                                            size={EComponentSize.MD}
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

                    <LightBox.RightSidebar key="right-sidebar">
                        <Island type={EIslandType.TYPE_1} size={EComponentSize.MD}>
                            <IslandBody>Right Sidebar</IslandBody>
                        </Island>
                    </LightBox.RightSidebar>

                    {renderLightBoxControls()}
                </LightBox>
            ) : null}
        </div>
    );
};
