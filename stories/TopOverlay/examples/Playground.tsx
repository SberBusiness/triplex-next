import React, { useState } from "react";
import {
    Button,
    EBodyPageType,
    EButtonTheme,
    EComponentSize,
    EFontType,
    EHeaderPageType,
    ETextSize,
    ETitleSize,
    FocusTrapUtils,
    Gap,
    LightBox,
    Page,
    Text,
    Title,
    TopOverlay,
} from "@sberbusiness/triplex-next";
import { action } from "storybook/actions";

export interface ITopOverlayPlaygroundProps {
    opened: boolean;
}

const PlaygroundContent = ({ opened: initialOpened }: ITopOverlayPlaygroundProps) => {
    const [opened, setOpened] = useState(initialOpened);

    return (
        <LightBox isLoading={false} isSideOverlayOpened={false} isTopOverlayOpened={opened}>
            <LightBox.Content isLoading={false}>
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
                                    LightBox с верхней панелью
                                </Title>
                            </Page.Header.Title.Content>
                            <Page.Header.Title.Controls>
                                <Button
                                    theme={EButtonTheme.GENERAL}
                                    size={EComponentSize.MD}
                                    onClick={() => setOpened(true)}
                                >
                                    Открыть верхнюю панель
                                </Button>
                            </Page.Header.Title.Controls>
                        </Page.Header.Title>
                    </Page.Header>

                    <Page.Body type={EBodyPageType.FIRST}>
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                            Управляйте состоянием панели свойством opened.
                        </Text>
                    </Page.Body>
                </Page>

                <TopOverlay opened={opened} onOpen={action("onOpen")} onClose={action("onClose")}>
                    <div style={{ padding: 24, textAlign: "center" }}>
                        <Title tag="h2" size={ETitleSize.H2}>
                            Верхняя панель
                        </Title>
                        <Gap size={16} />
                        <Button
                            theme={EButtonTheme.SECONDARY}
                            size={EComponentSize.MD}
                            onClick={() => setOpened(false)}
                        >
                            Закрыть панель
                        </Button>
                    </div>
                </TopOverlay>
            </LightBox.Content>

            <LightBox.Controls>
                <LightBox.Controls.Close title="Закрыть" onClick={action("onLightBoxClose")} />
            </LightBox.Controls>
        </LightBox>
    );
};

export const Playground = (args: ITopOverlayPlaygroundProps) => {
    const { opened = false } = args;

    // Storybook-control `opened` задаёт начальное состояние; key-reset перемонтирует пример при его изменении.
    return <PlaygroundContent key={String(opened)} opened={opened} />;
};
