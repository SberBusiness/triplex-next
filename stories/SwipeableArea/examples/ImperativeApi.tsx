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

export const ImperativeApi = () => {
    const swipeableAreaRef = useRef<ISwipeableAreaRef>(null);

    return (
        <div style={{ maxWidth: "500px" }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EComponentSize.SM}
                    onClick={() => swipeableAreaRef.current?.swipeRight()}
                >
                    swipeRight
                </Button>
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EComponentSize.SM}
                    onClick={() => swipeableAreaRef.current?.swipeLeft()}
                >
                    swipeLeft
                </Button>
                <Button
                    theme={EButtonTheme.SECONDARY}
                    size={EComponentSize.SM}
                    onClick={() => swipeableAreaRef.current?.closeSwipe()}
                >
                    closeSwipe
                </Button>
            </div>

            <List>
                <ListItem>
                    <SwipeableArea
                        ref={swipeableAreaRef}
                        leftSwipeableArea={
                            <ListItemControls>
                                <ListItemControlsButton
                                    icon={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}
                                    onClick={() => {}}
                                >
                                    В архив
                                </ListItemControlsButton>
                            </ListItemControls>
                        }
                        rightSwipeableArea={
                            <ListItemControls>
                                <ListItemControlsButton
                                    icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}
                                    onClick={() => {}}
                                >
                                    Скачать
                                </ListItemControlsButton>
                            </ListItemControls>
                        }
                    >
                        <ListItemTailLeft />
                        <ListItemTailRight />
                        {/* Минимальная высота, из-за блока с кнопками, появляющегося при свайпе. */}
                        <ListItemContent style={{ minHeight: "56px" }}>Управление через ref</ListItemContent>
                    </SwipeableArea>
                </ListItem>
            </List>
        </div>
    );
};
