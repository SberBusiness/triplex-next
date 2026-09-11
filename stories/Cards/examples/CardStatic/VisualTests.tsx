import React from "react";
import {
    Button,
    CardStatic,
    EButtonTheme,
    ECardContentPaddingSize,
    ECardRoundingSize,
    ECardTheme,
    EComponentSize,
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Gap,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

const MEDIA_HEIGHT = "129px";

interface IVisualTestsCardProps {
    /** Размер внутреннего отступа контента карточки. */
    paddingSize: ECardContentPaddingSize;
    /** Размер скругления карточки. */
    roundingSize: ECardRoundingSize;
    /** Тема карточки. */
    theme: ECardTheme;
    /** Подпись варианта карточки. */
    title: string;
}

/** Карточка с медийной областью, заголовком, телом и подвалом — состояния, которых нет в документационных стори. */
const VisualTestsCard = ({ paddingSize, roundingSize, theme, title }: IVisualTestsCardProps) => (
    <div style={{ width: "216px" }}>
        <CardStatic roundingSize={roundingSize} theme={theme}>
            <CardStatic.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
            <CardStatic.Content paddingSize={paddingSize}>
                <CardStatic.Content.Header>
                    <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                        {title}
                    </Title>
                </CardStatic.Content.Header>
                <CardStatic.Content.Body>
                    <Text tag="div" size={ETextSize.B3}>
                        This message provides context or highlights important information to note.
                    </Text>
                    <Gap size={8} />
                    <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
                        Текст пояснения
                    </Text>
                </CardStatic.Content.Body>
                <CardStatic.Content.Footer>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM}>
                        Button
                    </Button>
                </CardStatic.Content.Footer>
            </CardStatic.Content>
        </CardStatic>
    </div>
);

export const VisualTestsExample = () => (
    <div style={{ width: "448px", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "16px" }}>
        <VisualTestsCard
            theme={ECardTheme.GENERAL}
            roundingSize={ECardRoundingSize.MD}
            paddingSize={ECardContentPaddingSize.MD}
            title="General media"
        />
        <VisualTestsCard
            theme={ECardTheme.SECONDARY}
            roundingSize={ECardRoundingSize.MD}
            paddingSize={ECardContentPaddingSize.MD}
            title="Secondary media"
        />
        <VisualTestsCard
            theme={ECardTheme.GENERAL}
            roundingSize={ECardRoundingSize.LG}
            paddingSize={ECardContentPaddingSize.SM}
            title="Rounding LG, padding SM"
        />
        <VisualTestsCard
            theme={ECardTheme.SECONDARY}
            roundingSize={ECardRoundingSize.SM}
            paddingSize={ECardContentPaddingSize.SM}
            title="Rounding SM, padding SM"
        />
    </div>
);
