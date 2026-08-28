import React from "react";
import {
    Footer,
    Island,
    EIslandType,
    Button,
    EButtonTheme,
    EComponentSize,
    Link,
    Text,
    ETextSize,
} from "@sberbusiness/triplex-next";

export const Example = () => (
    <Island type={EIslandType.TYPE_1} size={EComponentSize.MD} style={{ maxWidth: "720px" }}>
        <Footer>
            <Footer.Description>
                <Footer.Description.Content>
                    <Text size={ETextSize.B3}>
                        Отправляя документ, вы соглашаетесь с <Link href="#">условиями обслуживания</Link>.
                    </Text>
                </Footer.Description.Content>
                <Footer.Description.Controls>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                        Отмена
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.SECONDARY}>
                        Сохранить черновик
                    </Button>
                    <Button size={EComponentSize.MD} theme={EButtonTheme.GENERAL}>
                        Отправить
                    </Button>
                </Footer.Description.Controls>
            </Footer.Description>
        </Footer>
    </Island>
);
