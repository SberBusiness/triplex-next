import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import {
    List,
    ListItem,
    ListItemContent,
    ListItemControls,
    ListItemSelectable,
    ListItemLoading,
    ListItemControlsButtonDropdown,
    ListItemControlsButton,
    ListItemTable,
} from "../../src/components/List";
import { EFontType, EFontWeightText, ETextSize, ETitleSize, Text, Title } from "../../src/components/Typography";
import {
    AttachmentStrokeSrvIcon20,
    DotshorizontalStrokeSrvIcon20,
    DefaulticonStrokePrdIcon20,
} from "@sberbusiness/icons-next";
import { SwipeableArea, ISwipeableAreaRef } from "../../src/components/SwipeableArea";

export default {
    title: "Components/List/ListItem",
    component: ListItem,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Элемент списка.
                `,
            },
        },
    },
} as const;

export const Default: StoryObj<typeof ListItem> = {
    render: () => (
        <List>
            <ListItem>
                <ListItemContent>Элемент списка</ListItemContent>
            </ListItem>
        </List>
    ),
    parameters: {
        docs: { description: { story: "Базовый элемент списка с контентом." } },
    },
};

export const Loading: StoryObj<typeof ListItem> = {
    render: () => (
        <List>
            <ListItem>
                <ListItemLoading />
            </ListItem>
        </List>
    ),
    parameters: {
        docs: {
            description: {
                story: "Элемент списка, отображающий подгрузку данных. Отображается последним, при доскролле до него загружаются новые элементы.",
            },
        },
    },
};

export const Selectable: StoryObj<typeof ListItem> = {
    render: () => {
        const [selected, setSelected] = useState(false);
        return (
            <div style={{ maxWidth: "400px" }}>
                <List>
                    <ListItem>
                        <ListItemSelectable selected={selected} onSelect={setSelected}>
                            <ListItemContent>Элемент списка</ListItemContent>
                        </ListItemSelectable>
                    </ListItem>
                </List>
            </div>
        );
    },
    parameters: {
        docs: { description: { story: "Элемент списка с возможностью выбора." } },
    },
};

export const Swipeable: StoryObj<typeof ListItem> = {
    render: () => {
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
            <div style={{ maxWidth: "400px" }}>
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
                                        <Text
                                            size={ETextSize.B4}
                                            type={EFontType.BRAND}
                                            weight={EFontWeightText.SEMIBOLD}
                                        >
                                            Button name
                                        </Text>
                                    </ListItemControlsButton>
                                    <ListItemControlsButtonDropdown
                                        icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />}
                                        options={options}
                                    >
                                        <Text
                                            size={ETextSize.B4}
                                            type={EFontType.BRAND}
                                            weight={EFontWeightText.SEMIBOLD}
                                        >
                                            Button name
                                        </Text>
                                    </ListItemControlsButtonDropdown>
                                </ListItemControls>
                            }
                        >
                            <ListItemContent>Свайп влево</ListItemContent>
                        </SwipeableArea>
                    </ListItem>
                </List>
            </div>
        );
    },
    parameters: {
        docs: { description: { story: "Эмуляция свайпа" } },
    },
};

export const ListItemForTable: StoryObj<typeof ListItem> = {
    render: () => {
        const options = [
            {
                id: "button-dropdown-card-option-1",
                label: "Текст пункта меню 1",
                onSelect: () => alert("Выбран пункт меню 1."),
            },
            {
                id: "button-dropdown-card-option-2",
                label: "Текст пункта меню 2",
                onSelect: () => alert("Выбран пункт меню 2."),
            },
            {
                id: "button-dropdown-card-option-3",
                label: "Текст пункта меню 3",
                onSelect: () => alert("Выбран пункт меню 3."),
            },
        ];

        return (
            <div style={{ maxWidth: "400px" }}>
                <List>
                    <ListItemTable
                        onClickItem={() => console.log("Клик по карточке.")}
                        controlButtons={
                            <>
                                <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                    Скачать
                                </ListItemControlsButton>
                                <ListItemControlsButtonDropdown
                                    icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                    options={options}
                                >
                                    Действия
                                </ListItemControlsButtonDropdown>
                            </>
                        }
                    >
                        <Title size={ETitleSize.H2}>1 220 000 000 RUB</Title>

                        <Text size={ETextSize.B3} tag="div">
                            №1 ООО Голубая Роза Голубая
                        </Text>
                        <Text size={ETextSize.B3} tag="div">
                            Длинное назначение платежа
                        </Text>
                        <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                            НДС не облагается
                        </Text>
                        <Text size={ETextSize.B3} tag="div" type={EFontType.SECONDARY}>
                            40702 810 2 0527 5000000 от 09.04.24
                        </Text>
                    </ListItemTable>
                </List>
            </div>
        );
    },
    parameters: {
        docs: { description: { story: "Элемент списка для отображения табличных данных на мобильных устройствах." } },
    },
};

export const ListItemForTableWithSwipeEmulation: StoryObj<typeof ListItem> = {
    render: () => {
        const options = [
            {
                id: "button-dropdown-swipe-emulation-option-1",
                label: "Текст пункта меню 1",
                onSelect: () => alert("Выбран пункт меню 1."),
            },
            {
                id: "button-dropdown-swipe-emulation-card-option-2",
                label: "Текст пункта меню 2",
                onSelect: () => alert("Выбран пункт меню 2."),
            },
            {
                id: "button-dropdown-swipe-emulation-card-option-3",
                label: "Текст пункта меню 3",
                onSelect: () => alert("Выбран пункт меню 3."),
            },
        ];

        const ref = React.useRef<ISwipeableAreaRef>(null);

        return (
            <div style={{ maxWidth: "400px" }}>
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
                    <ListItemTable
                        swipeableAreaRef={ref}
                        onClickItem={() => console.log("Клик по карточке.")}
                        controlButtons={
                            <>
                                <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                    Скачать
                                </ListItemControlsButton>
                                <ListItemControlsButtonDropdown
                                    icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                    options={options}
                                >
                                    Действия
                                </ListItemControlsButtonDropdown>
                            </>
                        }
                    >
                        <Title size={ETitleSize.H2}>1 220 000 000 RUB</Title>

                        <Text size={ETextSize.B3} tag="div">
                            №1 ООО Голубая Роза Голубая
                        </Text>
                        <Text size={ETextSize.B3} tag="div">
                            Длинное назначение платежа
                        </Text>
                        <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                            НДС не облагается
                        </Text>
                        <Text size={ETextSize.B3} tag="div" type={EFontType.SECONDARY}>
                            40702 810 2 0527 5000000 от 09.04.24
                        </Text>
                    </ListItemTable>
                </List>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Элемент списка для отображения табличных данных на мобильных устройствах с эмуляцией свайпа.",
            },
        },
    },
};

export const ListItemForTableWithSelectable: StoryObj<typeof ListItem> = {
    render: () => {
        const options = [
            {
                id: "button-dropdown-card-with-selectable-option-1",
                label: "Текст пункта меню 1",
                onSelect: () => alert("Выбран пункт меню 1."),
            },
            {
                id: "button-dropdown-card-with-selectable-option-2",
                label: "Текст пункта меню 2",
                onSelect: () => alert("Выбран пункт меню 2."),
            },
            {
                id: "button-dropdown-card-with-selectable-option-3",
                label: "Текст пункта меню 3",
                onSelect: () => alert("Выбран пункт меню 3."),
            },
        ];

        const [selected, setSelected] = React.useState(false);

        return (
            <div style={{ maxWidth: "400px" }}>
                <List>
                    <ListItemTable
                        selected={selected}
                        onSelect={setSelected}
                        onClickItem={() => console.log("Клик по карточке.")}
                        controlButtons={
                            <>
                                <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                                    Скачать
                                </ListItemControlsButton>
                                <ListItemControlsButtonDropdown
                                    icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                                    options={options}
                                >
                                    Действия
                                </ListItemControlsButtonDropdown>
                            </>
                        }
                    >
                        <Title size={ETitleSize.H2}>1 220 000 000 RUB</Title>

                        <Text size={ETextSize.B3} tag="div">
                            №1 ООО Голубая Роза Голубая
                        </Text>
                        <Text size={ETextSize.B3} tag="div">
                            Длинное назначение платежа
                        </Text>
                        <Text size={ETextSize.B3} type={EFontType.SECONDARY} tag="div">
                            НДС не облагается
                        </Text>
                        <Text size={ETextSize.B3} tag="div" type={EFontType.SECONDARY}>
                            40702 810 2 0527 5000000 от 09.04.24
                        </Text>
                    </ListItemTable>
                </List>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Элемент списка для отображения табличных данных на мобильных устройствах с возможностью выбора элемента.",
            },
        },
    },
};
