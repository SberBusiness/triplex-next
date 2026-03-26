import React from "react";
import { IslandWidget, Text, ETextSize, ETitleSize, Title, EFontType } from "@sberbusiness/triplex-next";

export const WithoutFooterExample = () => (
    <IslandWidget
        renderBody={(props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>}
        renderHeader={(props) => (
            <IslandWidget.Header {...props}>
                <IslandWidget.Header.Content>
                    <Title size={ETitleSize.H3}>Title</Title>
                </IslandWidget.Header.Content>
                <IslandWidget.Header.Description>
                    <Text size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Description
                    </Text>
                </IslandWidget.Header.Description>
            </IslandWidget.Header>
        )}
    />
);
