import React from "react";
import { Footer, Button, EButtonTheme, EComponentSize, Text, ETextSize } from "@sberbusiness/triplex-next";

export const Layouts = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "720px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Контент и кнопки</div>
            <Footer>
                <Footer.Description>
                    <Footer.Description.Content>
                        <Text size={ETextSize.B3}>Контент футера</Text>
                    </Footer.Description.Content>
                    <Footer.Description.Controls>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Отмена
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Сохранить
                        </Button>
                    </Footer.Description.Controls>
                </Footer.Description>
            </Footer>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Только контент</div>
            <Footer>
                <Footer.Description>
                    <Footer.Description.Content>
                        <Text size={ETextSize.B3}>Контент футера без управляющих элементов</Text>
                    </Footer.Description.Content>
                </Footer.Description>
            </Footer>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Только кнопки</div>
            <Footer>
                <Footer.Description>
                    <Footer.Description.Controls>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Отмена
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Сохранить
                        </Button>
                    </Footer.Description.Controls>
                </Footer.Description>
            </Footer>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>Длинный контент</div>
            <Footer>
                <Footer.Description>
                    <Footer.Description.Content>
                        <Text size={ETextSize.B3}>
                            Нажимая кнопку «Отправить», вы соглашаетесь с условиями обслуживания и подтверждаете, что
                            данные в документе проверены и заполнены корректно.
                        </Text>
                    </Footer.Description.Content>
                    <Footer.Description.Controls>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                            Отмена
                        </Button>
                        <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                            Отправить
                        </Button>
                    </Footer.Description.Controls>
                </Footer.Description>
            </Footer>
        </div>
    </div>
);
