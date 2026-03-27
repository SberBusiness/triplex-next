import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title as SBTitle } from "@storybook/addon-docs/blocks";
import { LightBox } from "../../src/components/LightBox/LightBox";
import { Page } from "../../src/components/Page/Page";
import { Button } from "../../src/components/Button/Button";
import { EButtonTheme } from "../../src/components/Button/enums";
import { Gap } from "../../src/components/Gap";
import { Title } from "../../src/components/Typography/Title";
import { Text } from "../../src/components/Typography/Text";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { EHeaderPageType, EFooterPageType, EBodyPageType } from "../../src/components/Page/components/enums";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import { FocusTrapUtils } from "../../src/utils/focus/FocusTrapUtils";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Spoiler } from "../../src/components/Spoiler";
import "./styles.less";

const STORY_META_DESCRIPTION = `
Компонент **LightBox** отображает крупный контент поверх страницы. Структура включает заголовок, тело, футер и дополнительные оверлеи.
Если контента мало, рекомендуется использовать Page.Body типа FIRST, чтобы не было пустого пространства. Если контента много, рекомендуется использовать Page.Body типа SECOND, и внутри него использовать несколько Island.
`;

const meta = {
    title: "Components/LightBox/LightBoxInitialOpened",
    component: LightBox,
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: STORY_META_DESCRIPTION,
            },
            page: () => (
                <>
                    <SBTitle />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof LightBox>;

export default meta;

type Story = StoryObj<typeof LightBox>;

/** Отдельный компонент: хуки в `render` сторы без имени компонента ломают порядок хуков в Storybook. */
const LightBoxInitialOpenedStory: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} onClick={handleOpen}>
                Открыть LightBox
            </Button>

            {isOpen ? (
                <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={false}>
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

                            <Page.Body type={EBodyPageType.FIRST}>
                                Мой дядя самых честных правил
                                <br />
                                Когда не в шутку занемог,
                                <br />
                                Он уважать себя заставил
                                <br />
                                И лучше выдумать не мог.
                                <br />
                                Его пример другим наука;
                                <br />
                                Но, боже мой, какая скука
                                <br />
                                С больным сидеть и день и ночь,
                                <br />
                                Не отходя ни шагу прочь!
                                <br />
                                Какое низкое коварство
                                <br />
                                Полуживого забавлять,
                                <br />
                                Ему подушки поправлять,
                                <br />
                                Печально подносить лекарство,
                                <br />
                                Вздыхать и думать про себя:
                                <br />
                                Когда же черт возьмет тебя
                                <br />
                                <Spoiler labelExpand="Развернуть" labelCollapse="Свернуть" size={EComponentSize.MD}>
                                    <div>
                                        Так думал молодой повеса,
                                        <br />
                                        Летя в пыли на почтовых,
                                        <br />
                                        Всевышней волею Зевеса
                                        <br />
                                        Наследник всех своих родных. <br />
                                        Друзья Людмилы и Руслана! <br />
                                        С героем моего романа <br />
                                        Без предисловий, сей же час <br />
                                        Позвольте познакомить вас: <br />
                                        Онегин, добрый мой приятель, <br />
                                        Родился на брегах Невы, <br />
                                        Где, может быть, родились вы <br />
                                        Или блистали, мой читатель; <br />
                                        Там некогда гулял и я: <br />
                                        Но вреден север для меня. <br />
                                        Служив отлично благородно, <br />
                                        Долгами жил его отец, <br />
                                        Давал три бала ежегодно <br />
                                        И промотался наконец. <br />
                                        Судьба Евгения хранила: <br />
                                        Сперва Madame за ним ходила, <br />
                                        Потом Monsieur ее сменил. <br />
                                        Ребенок предисловий, сей же час <br />
                                        Позвольте познакомить вас: <br />
                                        Онегин, добрый мой приятель, <br />
                                        Родился на брегах Невы, <br />
                                        Где, может быть, родились вы <br />
                                        Или блистали, мой читатель; <br />
                                        Там некогда гулял и я: <br />
                                        Но вреден север для меня.
                                        <br />
                                        <br />
                                        <br />
                                        Служив отлично благородно, <br />
                                        Долгами жил его отец, <br />
                                        Давал три бала ежегодно И промотался наконец. <br />
                                        Судьба Евгения хранила: <br />
                                        Сперва Madame за ним ходила, <br />
                                        Потом Monsieur ее сменил. <br />
                                        Ребенок был резов, но мил. <br />
                                        Monsieur l'Abbé, француз убогой, <br />
                                        Чтоб не измучилось дитя, <br />
                                        Учил его всему шутя, <br />
                                        Не докучал моралью строгой, <br />
                                        Слегка за шалости бранил <br />И в Летний сад гулять водил.
                                    </div>
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
                    </LightBox.Content>

                    <LightBox.Controls>
                        <LightBox.Controls.Close title="Закрыть" data-test-id="lightbox-close" onClick={handleClose} />
                        <LightBox.Controls.Prev
                            title="Назад"
                            clickByArrowLeft
                            onClick={() => console.log("Prev clicked")}
                        />
                        <LightBox.Controls.Next
                            title="Вперёд"
                            clickByArrowRight
                            onClick={() => console.log("Next clicked")}
                        />
                    </LightBox.Controls>
                </LightBox>
            ) : null}
        </div>
    );
};

export const Default: Story = {
    render: () => <LightBoxInitialOpenedStory />,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Базовая конфигурация LightBox с активными контролами и липкими шапкой и футером.",
            },
        },
    },
};
