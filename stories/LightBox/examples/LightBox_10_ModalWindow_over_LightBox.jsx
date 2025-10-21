import React, { useState, useEffect } from "react";
import { LightBox } from "@sber-business/triplex/components/LightBox/LightBox";
import { Button } from "@sber-business/triplex/components/Button/Button";
import { EButtonTheme, EButtonSize } from "@sber-business/triplex/components/Button/enums";
import { Page } from "@sber-business/triplex/components/Page/Page";
import {
    ModalWindow,
    ModalWindowHeader,
    ModalWindowBody,
    ModalWindowFooter,
    ModalWindowClose,
    ModalWindowContent,
} from "@sber-business/triplex/components/ModalWindow";
import { EModalWindowSize } from "@sber-business/triplex/components/ModalWindow/enums";
import { Header } from "@sber-business/triplex/components/Header/Header";
import { FooterDescription } from "@sber-business/triplex/components/Footer/components/FooterDescription";

const [open, setOpen] = useState(false);
const [openModal, setOpenModal] = useState(false);

const handleOpen = () => setOpenModal(true);
const handleClose = () => setOpenModal(false);

useEffect(() => {
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
        </LightBox.Controls>
    </LightBox>
);

const renderPage = () => (
    <Page>
        <Page.Header sticky>
            <Page.Header.Title>
                <Page.Header.Title.Content>
                    <Page.Header.Title.Content.Text>Евгений Онегин</Page.Header.Title.Content.Text>
                    <Page.Header.Title.Content.Subhead>
                        Русский поэт, драматург и прозаик, заложивший основы русского реалистического
                        направления.
                    </Page.Header.Title.Content.Subhead>
                </Page.Header.Title.Content>
                <Page.Header.Title.Controls>
                    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={handleOpen}>
                        Open ModalWindow
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
                <br />
            </div>
        </Page.Body>
        <Page.Footer sticky>
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

<>
    <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD} onClick={() => setOpen(true)}>
        Open LightBox
    </Button>

    {open && renderLightBox()}

    <ModalWindow closeButton={<ModalWindowClose onClick={handleClose} key="close" />} isOpen={openModal}>
        <ModalWindowContent>
            <ModalWindowHeader>
                <Header.Title>
                    <Header.Title.Content>
                        <Header.Title.Content.Text>
                            Текст заголовка в одну строку
                        </Header.Title.Content.Text>
                    </Header.Title.Content>
                </Header.Title>
            </ModalWindowHeader>
            <ModalWindowBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
            </ModalWindowBody>
            <ModalWindowFooter>
                <FooterDescription>
                    <FooterDescription.Controls>
                        <Button theme={EButtonTheme.SECONDARY} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EButtonSize.MD}>
                            Button Name
                        </Button>
                    </FooterDescription.Controls>
                </FooterDescription>
            </ModalWindowFooter>
        </ModalWindowContent>
    </ModalWindow>
</>