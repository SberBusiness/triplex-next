import React from "react";
import { Header, Title, ETitleSize, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const WithoutPaddings = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>
                По умолчанию — вертикальные отступы 24px
            </div>
            <Header>
                <Header.Title>
                    <Header.Title.Content>
                        <Title tag="h2" size={ETitleSize.H2}>
                            Заголовок
                        </Title>
                    </Header.Title.Content>
                </Header.Title>
                {/* Пунктир на обёртке — только для наглядности границ отступов. */}
                <div style={{ outline: "1px dashed currentColor" }}>
                    <Header.Subhead>
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                            Произвольный контент третьего уровня
                        </Text>
                    </Header.Subhead>
                </div>
            </Header>
        </div>
        <div>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>
                withoutPaddings — отступы сняты
            </div>
            <Header>
                <Header.Title>
                    <Header.Title.Content>
                        <Title tag="h2" size={ETitleSize.H2}>
                            Заголовок
                        </Title>
                    </Header.Title.Content>
                </Header.Title>
                {/* Пунктир на обёртке — только для наглядности границ отступов. */}
                <div style={{ outline: "1px dashed currentColor" }}>
                    <Header.Subhead withoutPaddings>
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                            Произвольный контент третьего уровня
                        </Text>
                    </Header.Subhead>
                </div>
            </Header>
        </div>
    </div>
);
