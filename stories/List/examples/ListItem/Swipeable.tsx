import React from "react";
import {
    ISwipeableAreaRef,
    List,
    ListItem,
    ListItemContent,
    ListItemControls,
    ListItemControlsButton,
    ListItemControlsButtonDropdown,
    ListItemTailRight,
    SwipeableArea,
} from "@sberbusiness/triplex-next";
import { DefaulticonStrokePrdIcon20 } from "@sberbusiness/icons-next";

export const Swipeable = () => {
    const options = [
        {
            id: "list-item-swipe-controls-dropdown-option-1",
            label: "Текст пункта меню 1",
            onSelect: () => alert("Выбран пункт меню 1."),
        },
        {
            id: "list-item-swipe-controls-dropdown-option-2",
            label: "Текст пункта меню 2",
            onSelect: () => alert("Выбран пункт меню 2."),
        },
        {
            id: "list-item-swipe-controls-dropdown-option-3",
            label: "Текст пункта меню 3",
            onSelect: () => alert("Выбран пункт меню 3."),
        },
    ];

    const ref = React.useRef<ISwipeableAreaRef>(null);

    return (
        <div style={{ maxWidth: "500px" }}>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.swipeLeft();
                    }
                }}
            >
                swipe
            </button>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.closeSwipe();
                    }
                }}
            >
                close
            </button>
            <br />

            <List>
                <ListItem>
                    <SwipeableArea
                        ref={ref}
                        rightSwipeableArea={
                            <ListItemControls>
                                <ListItemControlsButton icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}>
                                    Button name
                                </ListItemControlsButton>
                                <ListItemControlsButtonDropdown
                                    icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                                    options={options}
                                >
                                    Button name
                                </ListItemControlsButtonDropdown>
                            </ListItemControls>
                        }
                    >
                        <ListItemTailRight />
                        <ListItemContent>Свайп влево</ListItemContent>
                    </SwipeableArea>
                </ListItem>
            </List>
        </div>
    );
};
