import React from "react";
import {
    CardStatic,
    ECardTheme,
    ECardRoundingSize,
    ECardContentPaddingSize,
    Text,
    EFontType,
    ETextSize,
    EFontWeightText,
    Link,
    Gap,
} from "@sberbusiness/triplex-next";

interface IPlaygroundExampleProps {
    paddingSize: ECardContentPaddingSize;
    roundingSize: ECardRoundingSize;
    theme: ECardTheme;
}

export const PlaygroundExample = ({ paddingSize, roundingSize, theme }: IPlaygroundExampleProps) => (
    <div style={{ width: "216px" }}>
        <CardStatic roundingSize={roundingSize} theme={theme}>
            <CardStatic.Content paddingSize={paddingSize}>
                <CardStatic.Content.Header>
                    <Text size={ETextSize.B3}>Subtitle text</Text>
                </CardStatic.Content.Header>
                <CardStatic.Content.Body>
                    <Text tag="div" size={ETextSize.B3}>
                        This message provides context or highlights important information to note.
                    </Text>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        This message provides additional context or highlights important information to note.
                    </Text>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                        1234567,00
                    </Text>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Текст пояснения
                    </Text>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                        1234567,00
                    </Text>
                    <Text tag="div" size={ETextSize.B4} type={EFontType.SECONDARY}>
                        Текст пояснения
                    </Text>
                    <Gap size={8} />
                    <Text tag="div" size={ETextSize.B2} weight={EFontWeightText.SEMIBOLD}>
                        1234567,00
                    </Text>
                    <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                        Текст пояснения
                    </Text>
                    <Gap size={8} />
                    <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B4}>
                        <Link onClick={() => {}}>Link text</Link>
                    </Text>
                </CardStatic.Content.Body>
            </CardStatic.Content>
        </CardStatic>
    </div>
);
