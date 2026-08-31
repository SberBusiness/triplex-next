import React, { useRef } from "react";
import {
    Button,
    EButtonTheme,
    EComponentSize,
    ISwipeableAreaRef,
    List,
    ListItem,
    ListItemContent,
    ListItemControls,
    ListItemControlsButton,
    ListItemTailLeft,
    ListItemTailRight,
    SwipeableArea,
} from "@sberbusiness/triplex-next";
import { AttachmentStrokeSrvIcon20, DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

interface IVisualItemProps {
    /** Подпись состояния. */
    title: string;
    /** Открываемая область. Закрытое состояние остаётся без кнопки. */
    openedArea?: "left" | "right";
}

const VisualItem = ({ title, openedArea }: IVisualItemProps) => {
    const swipeableAreaRef = useRef<ISwipeableAreaRef>(null);

    const handleOpen = () => {
        if (openedArea === "left") {
            swipeableAreaRef.current?.swipeRight();
        } else {
            swipeableAreaRef.current?.swipeLeft();
        }
    };

    return (
        <div style={{ width: "400px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>{title}</div>

            {openedArea ? (
                <div style={{ marginBottom: "8px" }}>
                    <Button theme={EButtonTheme.SECONDARY} size={EComponentSize.SM} onClick={handleOpen}>
                        {openedArea === "left" ? "Открыть левую область" : "Открыть правую область"}
                    </Button>
                </div>
            ) : null}

            <List>
                <ListItem>
                    <SwipeableArea
                        ref={swipeableAreaRef}
                        leftSwipeableArea={
                            <ListItemControls>
                                <ListItemControlsButton icon={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}>
                                    В архив
                                </ListItemControlsButton>
                            </ListItemControls>
                        }
                        rightSwipeableArea={
                            <ListItemControls>
                                <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                    Скачать
                                </ListItemControlsButton>
                            </ListItemControls>
                        }
                    >
                        <ListItemTailLeft />
                        <ListItemTailRight />
                        {/* Минимальная высота, из-за блока с кнопками, появляющегося при свайпе. */}
                        <ListItemContent style={{ minHeight: "56px" }}>{title}</ListItemContent>
                    </SwipeableArea>
                </ListItem>
            </List>
        </div>
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <VisualItem title="Закрытое состояние" />
        <VisualItem title="Открыта левая область" openedArea="left" />
        <VisualItem title="Открыта правая область" openedArea="right" />
    </div>
);
