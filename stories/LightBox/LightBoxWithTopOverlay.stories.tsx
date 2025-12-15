import React, { useState } from "react";
import { Controls, Description, Primary, Stories, Subtitle, Title as DocsTitle } from "@storybook/addon-docs/blocks";
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
import { Confirm } from "../../src/components/Confirm";
import { EBodyVerticalMargin } from "../../src/components/Body/enums";

const STORY_META_DESCRIPTION = `
Компонент **LightBoxWithTopOverlay** отображает крупный контент поверх страницы.
`;

const meta = {
    title: "Components/LightBox/LightBoxWithTopOverlay",
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
            page: () => (
                <>
                    <DocsTitle />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={LightBoxWithTopOverlay} />
                    <Stories />
                </>
            ),
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

export const LightBoxWithTopOverlay: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openedTopOverlay, setOpenedTopOverlay] = useState(false);
    const [closeConfirmed, setCloseConfirmed] = useState(false);

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
    const handleClose = () => setOpenedTopOverlay(true);

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

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={openedTopOverlay}>
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
                                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.MD}>
                                            Button text
                                        </Button>
                                    </Page.Header.Title.Controls>
                                </Page.Header.Title>
                            </Page.Header>

                            <Page.Body verticalMargin={EBodyVerticalMargin.SMALL}>
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
                </LightBox>
            ) : null}
        </div>
    );
};
