import React from "react";
import {
    List,
    ListItem,
    ListItemContent,
    ListItemControls,
    ListItemControlsButton,
    ListItemTailRight,
    SwipeableArea,
} from "@sberbusiness/triplex-next";
import { AttachmentStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export const Default = () => (
    <div style={{ maxWidth: "500px" }}>
        <List>
            <ListItem>
                <SwipeableArea
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
                >
                    <ListItemTailRight />
                    {/* Минимальная высота, из-за блока с кнопками, появляющегося при свайпе. */}
                    <ListItemContent style={{ minHeight: "56px" }}>Свайп влево открывает кнопки</ListItemContent>
                </SwipeableArea>
            </ListItem>
        </List>
    </div>
);
