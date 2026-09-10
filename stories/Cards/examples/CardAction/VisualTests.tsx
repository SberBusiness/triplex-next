import React, { useState } from "react";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";
import {
    CardAction,
    ECardContentPaddingSize,
    ECardTheme,
    EFontType,
    EFontWeightTitle,
    ETextSize,
    ETitleSize,
    Gap,
    Link,
    Text,
    Title,
} from "@sberbusiness/triplex-next";

const MEDIA_HEIGHT = "129px";

const CardBody = () => (
    <CardAction.Content.Body>
        <div style={{ display: "flex", alignItems: "center" }}>
            <DefaulticonStrokePrdIcon20 paletteIndex={5} />
            <Text size={ETextSize.B3} style={{ marginLeft: "8px" }}>
                List item text
            </Text>
        </div>
        <Gap size={8} />
        <Text tag="div" type={EFontType.SECONDARY} size={ETextSize.B4}>
            This message provides additional context or highlights important information to note.
        </Text>
        <Gap size={8} />
        <Text tag="div" type={EFontType.PRIMARY} size={ETextSize.B3}>
            <Link onClick={() => {}}>Link text</Link>
        </Text>
    </CardAction.Content.Body>
);

interface IVisualTestsCardProps {
    /** Тема карточки. */
    theme: ECardTheme;
    /** Подпись состояния карточки. */
    title: string;
}

const VisualTestsCard = ({ theme, title }: IVisualTestsCardProps) => {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div style={{ width: "216px" }}>
            <CardAction theme={theme} selected={isSelected} toggle={setIsSelected}>
                <CardAction.Media style={{ backgroundImage: "url(assets/images/evotor.png)", height: MEDIA_HEIGHT }} />
                <CardAction.Content paddingSize={ECardContentPaddingSize.MD}>
                    <CardAction.Content.Header>
                        <Title tag="div" size={ETitleSize.H3} weight={EFontWeightTitle.REGULAR}>
                            {title}
                        </Title>
                    </CardAction.Content.Header>
                    <CardBody />
                </CardAction.Content>
            </CardAction>
        </div>
    );
};

// Фокус может быть только у одного элемента, поэтому в одной story клавиатурная обводка
// снимается лишь для темы GENERAL. Ветка `.secondary:focus.focusVisible` (своя реализация
// в Action.module.less) скриншотами не покрыта — осознанный компромисс, а не упущение.
export const VisualTestsExample = () => (
    <div style={{ width: "448px", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "16px" }}>
        <VisualTestsCard theme={ECardTheme.GENERAL} title="General selected" />
        <VisualTestsCard theme={ECardTheme.GENERAL} title="General focused" />
        <VisualTestsCard theme={ECardTheme.SECONDARY} title="Secondary selected" />
        <VisualTestsCard theme={ECardTheme.SECONDARY} title="Secondary default" />
    </div>
);
