import React from "react";
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
    LightBox,
    Page,
    Text,
    Title,
    TopOverlay,
} from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

/**
 * Открытая верхняя панель поверх контента лайтбокса.
 * Панель отрисована открытой с самого начала — скриншот не зависит от анимации открытия.
 * Цикл открытия при этом отрабатывает: onOpen приходит на маунте, ловушка фокуса включается.
 * Позицию панели на маунте компонент намеренно не пересчитывает — её задают стили.
 */
export const VisualTests = () => (
    <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened>
        <LightBox.Content isLoading={false}>
            <Page>
                <Page.Header type={EHeaderPageType.FIRST} sticky>
                    <Page.Header.Title>
                        <Page.Header.Title.Content>
                            <Title tag="h1" size={ETitleSize.H1}>
                                Форма редактирования
                            </Title>
                        </Page.Header.Title.Content>
                    </Page.Header.Title>
                </Page.Header>

                <Page.Body type={EBodyPageType.FIRST}>
                    <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        Контент лайтбокса под маской верхней панели.
                    </Text>
                </Page.Body>
            </Page>

            <TopOverlay opened onOpen={action("onOpen")} onClose={action("onClose")}>
                <Confirm>
                    <Confirm.Content>
                        <Confirm.Content.Title>Внимание</Confirm.Content.Title>
                        <Confirm.Content.SubTitle>
                            Несохранённые данные будут утеряны. Вы уверены, что хотите покинуть форму редактирования?
                        </Confirm.Content.SubTitle>
                    </Confirm.Content>
                    <Confirm.Controls>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.MD}>
                            Отмена
                        </Button>
                        <Button theme={EButtonTheme.DANGER} size={EComponentSize.MD}>
                            Покинуть форму
                        </Button>
                    </Confirm.Controls>
                    <Confirm.Close title="Закрыть" clickByEsc={false} onClick={action("onConfirmClose")} />
                </Confirm>
            </TopOverlay>
        </LightBox.Content>

        <LightBox.Controls>
            <LightBox.Controls.Close title="Закрыть" onClick={action("onLightBoxClose")} />
        </LightBox.Controls>
    </LightBox>
);
