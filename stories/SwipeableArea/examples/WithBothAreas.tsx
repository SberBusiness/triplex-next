import React from "react";
import {
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

export const WithBothAreas = () => (
    <div style={{ maxWidth: "500px" }}>
        <List>
            <ListItem>
                <SwipeableArea
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
                    onSwipeLeft={() => {}}
                    onSwipeRight={() => {}}
                >
                    <ListItemTailLeft />
                    <ListItemTailRight />
                    {/* Минимальная высота, из-за блока с кнопками, появляющегося при свайпе. */}
                    <ListItemContent style={{ minHeight: "56px" }}>Свайп влево и вправо</ListItemContent>
                </SwipeableArea>
            </ListItem>
        </List>
    </div>
);
