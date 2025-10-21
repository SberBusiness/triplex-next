import React, { useState, useEffect } from "react";
import { LightBox } from "@sber-business/triplex/components/LightBox/LightBox";
import { Button } from "@sber-business/triplex/components/Button/Button";
import { EButtonTheme, EButtonSize } from "@sber-business/triplex/components/Button/enums";
import { Page } from "@sber-business/triplex/components/Page/Page";
import { Portal } from "@sber-business/triplex/components/Portal/Portal";

const [open, setOpen] = useState(false);
const [isSideOverlayOpened, setIsSideOverlayOpened] = useState(false);
// Здесь не используется useRef, потому что он не вызовет rerender после изменения.
const [sideOverlayNode, setSideOverlayNode] = useState(null);

useEffect(() => {
    if (open) {
        document.body.classList.add("dialogOpenExample");
    } else {
        document.body.classList.remove("dialogOpenExample");
    }
}, [open]);

const renderLightBox = () => (
    <LightBox isSideOverlayOpened={isSideOverlayOpened} isTopOverlayOpened={false}>
        <LightBox.Content>{renderPage()}</LightBox.Content>
        <LightBox.Controls>
            <LightBox.Controls.Close
                title="Закрыть"
                data-test-id="lightbox-close"
                onClick={() => setOpen(false)}
            />
        </LightBox.Controls>
        <div ref={(node) => setSideOverlayNode(node)} />
    </LightBox>
);

const renderPage = (actionButton) => (
    <Page>
        <Page.Header>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button
                        theme={EButtonTheme.GENERAL}
                        size={EButtonSize.MD}
                        onClick={() => setIsSideOverlayOpened(true)}
                    >
                        Open SideOverlay
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
            </div>
        </Page.Body>
        <Page.Footer>
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

const renderSideOverlay = () => (
    <LightBox.SideOverlay opened={isSideOverlayOpened}>
        <Page>
            <Page.Header>
                <Page.Header.Title>
                    <Page.Header.Title.Content>
                        <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    </Page.Header.Title.Content>
                    <Page.Header.Title.Controls>
                        <LightBox.SideOverlay.Close
                            data-test-id="lightbox-side-overlay-close"
                            clickByEsc={true}
                            onClick={() => setIsSideOverlayOpened(false)}
                        />
                    </Page.Header.Title.Controls>
                </Page.Header.Title>
            </Page.Header>
            <Page.Body>
                <div>
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
                </div>
            </Page.Body>
            <Page.Footer>
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
    </LightBox.SideOverlay>
);

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>
    {open && renderLightBox()}
    {sideOverlayNode && <Portal container={sideOverlayNode}>{renderSideOverlay()}</Portal>}
</>