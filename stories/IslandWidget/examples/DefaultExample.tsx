import React, { useState } from "react";
import {
    IslandWidget,
    Button,
    ButtonIcon,
    EComponentSize,
    EButtonTheme,
    Link,
    Text,
    ETextSize,
    EFontType,
    DateField,
    EFormFieldStatus,
} from "@sberbusiness/triplex-next";
import { SettingsStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export const DefaultExample = () => {
    const [value, setValue] = useState("");

    return (
        <IslandWidget
            renderBody={(props) => <IslandWidget.Body {...props}>Content</IslandWidget.Body>}
            renderFooter={(props) => (
                <IslandWidget.Footer {...props}>
                    <IslandWidget.Footer.Content>
                        <Text tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                            <Link>Link text</Link>
                        </Text>
                    </IslandWidget.Footer.Content>
                    <IslandWidget.Footer.Controls>
                        <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                            Button text
                        </Button>
                        <Button theme={EButtonTheme.GENERAL} size={EComponentSize.SM}>
                            Button text
                        </Button>
                    </IslandWidget.Footer.Controls>
                </IslandWidget.Footer>
            )}
            renderHeader={(props) => (
                <IslandWidget.Header {...props}>
                    <IslandWidget.Header.Title>Title</IslandWidget.Header.Title>
                    <IslandWidget.Header.Controls>
                        <ButtonIcon>
                            <SettingsStrokeSrvIcon20 paletteIndex={5} />
                        </ButtonIcon>
                        <DateField
                            value={value}
                            onChange={setValue}
                            className="island-widget-date-field"
                            placeholderMask="дд.мм.гггг"
                            label="дд.мм.гггг"
                            invalidDateHint="Указана недоступная для выбора дата."
                            size={EComponentSize.SM}
                            status={EFormFieldStatus.DEFAULT}
                        />
                    </IslandWidget.Header.Controls>
                    <IslandWidget.Header.Description>Description</IslandWidget.Header.Description>
                </IslandWidget.Header>
            )}
        />
    );
};
