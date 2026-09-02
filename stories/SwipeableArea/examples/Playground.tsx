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
import { action } from "storybook/actions";

export interface IPlaygroundProps {
    /** Показать область, открывающуюся свайпом вправо. */
    withLeftSwipeableArea: boolean;
    /** Показать область, открывающуюся свайпом влево. */
    withRightSwipeableArea: boolean;
}

export const Playground = ({ withLeftSwipeableArea, withRightSwipeableArea }: IPlaygroundProps) => {
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
                            withLeftSwipeableArea ? (
                                <ListItemControls>
                                    <ListItemControlsButton icon={<DefaulticonStrokePrdIcon20 paletteIndex={5} />}>
                                        В архив
                                    </ListItemControlsButton>
                                </ListItemControls>
                            ) : undefined
                        }
                        rightSwipeableArea={
                            withRightSwipeableArea ? (
                                <ListItemControls>
                                    <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                        Скачать
                                    </ListItemControlsButton>
                                </ListItemControls>
                            ) : undefined
                        }
                        onSwipeLeft={action("onSwipeLeft")}
                        onSwipeRight={action("onSwipeRight")}
                    >
                        {withLeftSwipeableArea ? <ListItemTailLeft /> : null}
                        {withRightSwipeableArea ? <ListItemTailRight /> : null}
                        {/* Минимальная высота, из-за блока с кнопками, появляющегося при свайпе. */}
                        <ListItemContent style={{ minHeight: "56px" }}>Контент карточки</ListItemContent>
                    </SwipeableArea>
                </ListItem>
            </List>
        </div>
    );
};
