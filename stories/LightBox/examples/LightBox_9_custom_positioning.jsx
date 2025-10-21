import React, { useState, useEffect } from "react";
import { LightBox } from "@sber-business/triplex/components/LightBox/LightBox";
import { ELightBoxSideOverlaySize } from "@sber-business/triplex/components/LightBox/LightBoxSideOverlay/LightBoxSideOverlay";
import { Button } from "@sber-business/triplex/components/Button/Button";
import { EButtonTheme, EButtonSize } from "@sber-business/triplex/components/Button/enums";
import { Page } from "@sber-business/triplex/components/Page/Page";
import { Portal } from "@sber-business/triplex/components/Portal/Portal";

import "./styles.less";

const [open, setOpen] = useState(false);

const [isCustomPanelOpened, setIsCustomPanelOpened] = useState(false);
const [viewManagerNodeWidth, setViewManagerNodeWidth] = useState(80);

useEffect(() => {
    setIsCustomPanelOpened(open);

    if (open) {
        document.body.classList.add("dialogOpenExample");
    } else {
        document.body.classList.remove("dialogOpenExample");
    }
}, [open]);

const renderLightBox = () => (
    <LightBox lightBoxViewManagerNodeId="lightBoxViewManagerNodeId">
        <LightBox.Content>{renderPage()}</LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
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
        <Page.Body>
            <div>
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
                <br />
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
                <br />
                <br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
            <Page.Footer.Description>
                <Page.Footer.Description.Content>А. С. Пушкин</Page.Footer.Description.Content>
                <Page.Footer.Description.Controls>
                    <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                        Button Name
                    </Button>
                </Page.Footer.Description.Controls>
            </Page.Footer.Description>
        </Page.Footer>
    </Page>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}

    <Portal container={document.body}>
        {/* Элемент, в визуальных границах (левая и правая координата) которого рендерится LightBox.
            Отступ LightBox от верхней границы экрана равен высоте этого элемента. */}
        <div
            id="lightBoxViewManagerNodeId"
            style={{
                position: "fixed",
                top: 0,
                height: 0,
                left: 0,
                right: "20%",
                pointerEvents: "none",
            }}
        />
    </Portal>
</>