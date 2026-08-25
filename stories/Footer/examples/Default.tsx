import React from "react";
import { Footer, Button, EButtonTheme, EComponentSize, Text, ETextSize } from "@sberbusiness/triplex-next";

export const Default = () => (
    <Footer style={{ maxWidth: "720px" }}>
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
);
