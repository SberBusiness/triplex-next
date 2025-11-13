import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { LightBox } from "../../src/components/LightBox/LightBox";
import { Page } from "../../src/components/Page/Page";
import { Button } from "../../src/components/Button/Button";
import { EButtonTheme, EButtonSize } from "../../src/components/Button/enums";
import { EFontType, ETextSize, ETitleSize } from "../../src/components/Typography/enums";
import { Text } from "../../src/components/Typography/Text";
import { Title } from "../../src/components/Typography/Title";
import { Gap } from "../../src/components/Gap";
import { EFooterPageType, EHeaderPageType } from "../../src/components/Page/components/enums";
import { Island } from "../../src/components/Island/Island";
import { IslandBody } from "../../src/components/Island/components/IslandBody";
import "./styles.less";

export default {
    title: "Components/LightBox",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент LightBox.
                `,
            },
        },
    },
};

export const Default: StoryObj<typeof LightBox> = {
    name: "Default",
    render: () => {
        const [open, setOpen] = useState(true);

        React.useEffect(() => {
            if (open) {
                document.body.classList.add("dialogOpenExample");
            } else {
                document.body.classList.remove("dialogOpenExample");
            }
        }, [open]);

        const renderLightBox = () => (
            <LightBox>
                <LightBox.Content>{renderPage()}</LightBox.Content>
                <LightBox.Controls>
                    <LightBox.Controls.Close
                        title="Закрыть"
                        data-test-id="lightbox-close"
                        onClick={() => setOpen(false)}
                    />
                    <LightBox.Controls.Prev
                        title="Назад"
                        onClick={() => console.log("Prev arrow clicked!")}
                        clickByArrowLeft
                    />
                    <LightBox.Controls.Next
                        title="Вперёд"
                        onClick={() => console.log("Next arrow clicked!")}
                        clickByArrowRight
                    />
                </LightBox.Controls>
            </LightBox>
        );

        const renderPage = () => (
            <Page style={{ maxWidth: "800px" }}>
                <Page.Header type={EHeaderPageType.SECOND} sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <Title tag="h1" size={ETitleSize.H1}>
                                Евгений Онегин
                            </Title>
                            <Gap size={8} />
                            <Text type={EFontType.SECONDARY} size={ETextSize.B3} tag="div">
                                Русский поэт, драматург и прозаик, заложивший основы русского реалистического
                                направления.
                            </Text>
                        </Page.Header.Title.Content>
                        <Page.Header.Title.Controls>
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                Button Name
                            </Button>
                            <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                                Button Name
                            </Button>
                        </Page.Header.Title.Controls>
                    </Page.Header.Title>
                </Page.Header>
                <Page.Body verticalMargin={16}>
                    <Island borderRadius={16} paddingSize={16} type="type_1">
                        <IslandBody>
                            Мой дядя самых честных правил,
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
                            <br />С больным сидеть и день и ночь,
                        </IslandBody>
                    </Island>
                    <Gap size={16} />
                    <Island borderRadius={16} paddingSize={16} type="type_1">
                        <IslandBody>
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
                            <br />
                            Так думал молодой повеса,
                            <br />
                            Летя в пыли на почтовых,
                            <br />
                            Всевышней волею Зевеса
                            <br />
                            Наследник всех своих родных.
                            <br />
                            Друзья Людмилы и Руслана!
                            <br />
                            С героем моего романа
                            <br />
                            Без предисловий, сей же час
                            <br />
                            Позвольте познакомить вас:
                            <br />
                            Онегин, добрый мой приятель,
                            <br />
                            Родился на брегах Невы,
                            <br />
                            Где, может быть, родились вы
                            <br />
                            Или блистали, мой читатель;
                            <br />
                            Там некогда гулял и я:
                            <br />
                            Но вреден север для меня.
                            <br />
                            <br />
                            Служив отлично благородно,
                            <br />
                            Долгами жил его отец,
                            <br />
                            Давал три бала ежегодно
                            <br />
                            И промотался наконец.
                            <br />
                            Судьба Евгения хранила:
                            <br />
                            Сперва Madame за ним ходила,
                            <br />
                            Потом Monsieur ее сменил.
                            <br />
                            Ребенок был резов, но мил.
                            <br />
                            Monsieur l'Abbé, француз убогой,
                            <br />
                            Чтоб не измучилось дитя,
                            <br />
                            Учил его всему шутя,
                            <br />
                            Не докучал моралью строгой,
                            <br />
                            Слегка за шалости бранил
                            <br />
                            И в Летний сад гулять водил.
                            <br />
                            <br />
                            Когда же юности мятежной
                            <br />
                            Пришла Евгению пора,
                            <br />
                            Пора надежд и грусти нежной,
                            <br />
                            Monsieur прогнали со двора.
                        </IslandBody>
                    </Island>

                    <Gap size={16} />

                    <Island borderRadius={16} paddingSize={16} type="type_1">
                        <IslandBody>
                            Вот мой Онегин на свободе;
                            <br />
                            Острижен по последней моде,
                            <br />
                            Как dandy лондонский одет —<br />
                            И наконец увидел свет.
                            <br />
                            Он по-французски совершенно
                            <br />
                            Мог изъясняться и писал;
                            <br />
                            Легко мазурку танцевал
                            <br />
                            И кланялся непринужденно;
                            <br />
                            Чего ж вам больше? Свет решил,
                            <br />
                            Что он умен и очень мил.
                        </IslandBody>
                    </Island>
                </Page.Body>
                <Page.Footer type={EFooterPageType.SECOND} sticky>
                    <Page.Footer.Description>
                        <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                        <Page.Footer.Description.Controls>
                            <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                                Button Name
                            </Button>
                        </Page.Footer.Description.Controls>
                    </Page.Footer.Description>
                </Page.Footer>
            </Page>
        );
        return (
            <>
                <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
                    Open LightBox
                </Button>
                {open && renderLightBox()}
            </>
        );
    },
};
