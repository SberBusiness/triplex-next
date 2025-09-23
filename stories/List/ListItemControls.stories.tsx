import React from "react";
import { StoryObj } from "@storybook/react";
import { ListItemControls, ListItemControlsButtonDropdown, ListItemControlsButton } from "../../src/components/List";
import { AttachmentStrokeSrvIcon20, DotshorizontalStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export default {
    title: "Components/List/ListItemControls",
    component: ListItemControls,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент ListItemControls — контейнер с кнопками действий..
                `,
            },
        },
    },
} as const;

export const Basic: StoryObj<typeof ListItemControls> = {
    render: () => {
        const options = [
            {
                id: "list-controls-dropdown-option-1",
                label: "Текст пункта меню 1",
                onSelect: () => alert("Выбран пункт меню 1."),
            },
            {
                id: "list-controls-dropdown-option-2",
                label: "Текст пункта меню 2",
                onSelect: () => alert("Выбран пункт меню 2."),
            },
            {
                id: "list-controls-dropdown-option-3",
                label: "Текст пункта меню 3",
                onSelect: () => alert("Выбран пункт меню 3."),
            },
        ];
        return (
            <>
                <ListItemControls>
                    <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                        Скачать
                    </ListItemControlsButton>
                    <ListItemControlsButtonDropdown
                        icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                        options={options}
                    >
                        Еще
                    </ListItemControlsButtonDropdown>
                </ListItemControls>

                <br />

                <ListItemControls style={{ height: "100px" }}>
                    <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />}>
                        Скачать
                    </ListItemControlsButton>
                    <ListItemControlsButtonDropdown
                        icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                        options={options}
                    >
                        Длинная подпись
                    </ListItemControlsButtonDropdown>
                </ListItemControls>

                <br />

                <ListItemControls>
                    <ListItemControlsButton icon={<AttachmentStrokeSrvIcon20 paletteIndex={5} />} />
                    <ListItemControlsButtonDropdown
                        icon={<DotshorizontalStrokeSrvIcon20 paletteIndex={5} />}
                        options={options}
                    />
                </ListItemControls>

                <br />

                <ListItemControls>
                    <ListItemControlsButton>Кнопка</ListItemControlsButton>
                    <ListItemControlsButtonDropdown options={options}>Дропдаун</ListItemControlsButtonDropdown>
                </ListItemControls>
            </>
        );
    },
};
