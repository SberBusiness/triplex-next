import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ETabsSize, TabsLine } from "../src/components/TabsLine";
import { Gap } from "../src/components/Gap";

export default {
    title: "Components/TabsLine",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент навигации, который позволяет переключаться между логически сгруппированными разделами контента в пределах одного контекста.

## Особенности

- **Размеры**: small (SM), medium (MD), large (LG)
- **Горизонтальные отступы до первого и от последнего табов**: 0, 8, 16, 24
- Добавление значка новых уведомлений возможно через свойство showNotificationIcon у конкретного таба
                `,
            },
        },
    },
};

interface ITabsLineStoriesProps extends React.ComponentProps<typeof TabsLine> {
    maxVisible: number;
    size?: ETabsSize;
    showNotificationIcon?: boolean;
}

export const Playground: StoryObj<ITabsLineStoriesProps> = {
    name: "Playground",
    args: {
        paddingX: 0,
        maxVisible: 3,
        size: ETabsSize.MD,
        showNotificationIcon: true,
    },
    argTypes: {
        paddingX: {
            description: "Горизонтальный отступ от первого таба слева и последнего таба справа",
            control: { type: "select" },
            options: [0, 8, 16, 24],
        },
        maxVisible: {
            description: "Количество табов, видимых до дропдауна включительно",
            control: { type: "number" },
        },
        size: {
            control: { type: "select" },
            options: Object.values(ETabsSize),
            description: "Размер компонента",
            table: {
                defaultValue: { summary: ETabsSize.MD },
            },
        },
        showNotificationIcon: {
            description: "Флаг отображения значка новых уведомлений",
        },
    },
    render: (args) => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-line-all");

        const tabs = [
            {
                id: "tabs-line-all",
                label: "Все",
                "aria-label": "Все",
                "data-test-id": "TabsLine__All",
            },
            {
                id: "tabs-line-draft",
                label: "Черновики",
                "aria-label": "Черновик",
                "data-test-id": "TabsLine__Draft",
                showNotificationIcon: args.showNotificationIcon,
            },
            {
                id: "tabs-line-sign",
                label: "На подпись и отправку",
                "aria-label": "На подпись и отправку",
                "data-test-id": "TabsLine__Sign",
            },
            {
                id: "tabs-line-executed",
                label: "Исполненные",
                "aria-label": "Исполненные",
                "data-test-id": "TabsLine__Executed",
            },
            {
                id: "tabs-line-rejected",
                label: "Отклоненные",
                "aria-label": "Отклоненные",
                "data-test-id": "TabsLine__Rejected",
            },
        ];

        return (
            <TabsLine
                {...args}
                tabs={tabs}
                selectedTabId={selectedTabId}
                onChangeTab={setSelectedTabId}
                dropdownTargetHtmlAttributes={{
                    "data-test-id": "TabsLine__DropdownTarget",
                }}
            />
        );
    },
};

export const Default: StoryObj<ITabsLineStoriesProps> = {
    name: "Default",
    args: {
        maxVisible: 4,
    },
    argTypes: {
        maxVisible: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-line-all");

        const tabs = [
            {
                id: "tabs-line-all",
                label: "Все",
                "aria-label": "Все",
                "data-test-id": "TabsLine__All",
            },
            {
                id: "tabs-line-draft",
                label: "Черновики",
                "aria-label": "Черновик",
                "data-test-id": "TabsLine__Draft",
            },
            {
                id: "tabs-line-sign",
                label: "На подпись и отправку",
                "aria-label": "На подпись и отправку",
                "data-test-id": "TabsLine__Sign",
            },
            {
                id: "tabs-line-executed",
                label: "Исполненные",
                "aria-label": "Исполненные",
                "data-test-id": "TabsLine__Executed",
            },
            {
                id: "tabs-line-rejected",
                label: "Отклоненные",
                "aria-label": "Отклоненные",
                "data-test-id": "TabsLine__Rejected",
            },
        ];

        return (
            <TabsLine
                {...args}
                tabs={tabs}
                selectedTabId={selectedTabId}
                onChangeTab={setSelectedTabId}
                dropdownTargetHtmlAttributes={{
                    "data-test-id": "TabsLine__DropdownTarget",
                }}
            />
        );
    },
};

export const DifferentSizes: StoryObj<ITabsLineStoriesProps> = {
    name: "DifferentSizes",
    args: {
        maxVisible: 4,
    },
    argTypes: {
        maxVisible: {
            table: {
                disable: true,
            },
        },
    },
    render: (args) => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-line-all");

        const tabs = [
            {
                id: "tabs-line-all",
                label: "Все",
                "aria-label": "Все",
                "data-test-id": "TabsLine__All",
            },
            {
                id: "tabs-line-draft",
                label: "Черновики",
                "aria-label": "Черновик",
                "data-test-id": "TabsLine__Draft",
            },
            {
                id: "tabs-line-sign",
                label: "На подпись и отправку",
                "aria-label": "На подпись и отправку",
                "data-test-id": "TabsLine__Sign",
            },
            {
                id: "tabs-line-executed",
                label: "Исполненные",
                "aria-label": "Исполненные",
                "data-test-id": "TabsLine__Executed",
            },
            {
                id: "tabs-line-rejected",
                label: "Отклоненные",
                "aria-label": "Отклоненные",
                "data-test-id": "TabsLine__Rejected",
            },
        ];

        return (
            <>
                <TabsLine
                    {...args}
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    size={ETabsSize.SM}
                    onChangeTab={setSelectedTabId}
                    dropdownTargetHtmlAttributes={{
                        "data-test-id": "TabsLine__DropdownTarget",
                    }}
                />
                <Gap size={16} />
                <TabsLine
                    {...args}
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    size={ETabsSize.MD}
                    onChangeTab={setSelectedTabId}
                    dropdownTargetHtmlAttributes={{
                        "data-test-id": "TabsLine__DropdownTarget",
                    }}
                />
                <Gap size={16} />
                <TabsLine
                    {...args}
                    tabs={tabs}
                    selectedTabId={selectedTabId}
                    size={ETabsSize.LG}
                    onChangeTab={setSelectedTabId}
                    dropdownTargetHtmlAttributes={{
                        "data-test-id": "TabsLine__DropdownTarget",
                    }}
                />
            </>
        );
    },
};
