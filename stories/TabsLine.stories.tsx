import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { TabsLine } from "../src/components/TabsLine";
import { EComponentSize } from "../src/enums/EComponentSize";
import { Gap } from "../src/components/Gap";

export default {
    title: "Components/TabsLine",
    component: TabsLine,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

interface ITabsLineStoriesProps extends React.ComponentProps<typeof TabsLine> {
    maxVisible: number;
    size?: EComponentSize;
    showNotificationIcon?: boolean;
    withSeparator?: boolean;
}

export const Playground: StoryObj<ITabsLineStoriesProps> = {
    name: "Playground",
    args: {
        paddingX: 0,
        maxVisible: 3,
        size: EComponentSize.MD,
        showNotificationIcon: true,
        withSeparator: false,
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
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        showNotificationIcon: {
            description: "Флаг отображения значка новых уведомлений",
        },
        withSeparator: {
            description: "Разделитель в виде нижнего бордера",
            control: { type: "boolean" },
        },
    },
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        controls: {
            include: ["paddingX", "maxVisible", "size", "showNotificationIcon", "withSeparator"],
        },
        testRunner: { skip: true },
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
                selectedId={selectedTabId}
                onChangeTab={setSelectedTabId}
                dropdownTargetHtmlAttributes={{
                    "data-test-id": "TabsLine__DropdownTarget",
                }}
            />
        );
    },
};

export const Default: StoryObj<ITabsLineStoriesProps> = {
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
    },
    render: () => {
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
                tabs={tabs}
                selectedId={selectedTabId}
                onChangeTab={setSelectedTabId}
                dropdownTargetHtmlAttributes={{
                    "data-test-id": "TabsLine__DropdownTarget",
                }}
                maxVisible={4}
            />
        );
    },
};

export const Sizes: StoryObj<ITabsLineStoriesProps> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>SM</div>
                    <TabsLine
                        tabs={tabs}
                        selectedId={selectedTabId}
                        size={EComponentSize.SM}
                        onChangeTab={setSelectedTabId}
                        dropdownTargetHtmlAttributes={{
                            "data-test-id": "TabsLine__DropdownTarget",
                        }}
                        maxVisible={4}
                    />
                </div>

                <div>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>MD</div>
                    <TabsLine
                        tabs={tabs}
                        selectedId={selectedTabId}
                        size={EComponentSize.MD}
                        onChangeTab={setSelectedTabId}
                        dropdownTargetHtmlAttributes={{
                            "data-test-id": "TabsLine__DropdownTarget",
                        }}
                        maxVisible={4}
                    />
                </div>

                <div>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>LG</div>
                    <TabsLine
                        tabs={tabs}
                        selectedId={selectedTabId}
                        size={EComponentSize.LG}
                        onChangeTab={setSelectedTabId}
                        dropdownTargetHtmlAttributes={{
                            "data-test-id": "TabsLine__DropdownTarget",
                        }}
                        maxVisible={4}
                    />
                </div>
            </div>
        );
    },
};

export const Paddings: StoryObj<ITabsLineStoriesProps> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>0</div>
                    <TabsLine
                        tabs={tabs}
                        selectedId={selectedTabId}
                        paddingX={0}
                        onChangeTab={setSelectedTabId}
                        dropdownTargetHtmlAttributes={{
                            "data-test-id": "TabsLine__DropdownTarget",
                        }}
                        maxVisible={4}
                    />
                </div>

                <div>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>8</div>
                    <TabsLine
                        tabs={tabs}
                        selectedId={selectedTabId}
                        paddingX={8}
                        onChangeTab={setSelectedTabId}
                        dropdownTargetHtmlAttributes={{
                            "data-test-id": "TabsLine__DropdownTarget",
                        }}
                        maxVisible={4}
                    />
                </div>

                <div>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>16</div>
                    <TabsLine
                        tabs={tabs}
                        selectedId={selectedTabId}
                        paddingX={16}
                        onChangeTab={setSelectedTabId}
                        dropdownTargetHtmlAttributes={{
                            "data-test-id": "TabsLine__DropdownTarget",
                        }}
                        maxVisible={4}
                    />
                </div>

                <div>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 700 }}>24</div>
                    <TabsLine
                        tabs={tabs}
                        selectedId={selectedTabId}
                        paddingX={24}
                        onChangeTab={setSelectedTabId}
                        dropdownTargetHtmlAttributes={{
                            "data-test-id": "TabsLine__DropdownTarget",
                        }}
                        maxVisible={4}
                    />
                </div>
            </div>
        );
    },
};

export const WithSeparator: StoryObj<ITabsLineStoriesProps> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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
                tabs={tabs}
                selectedId={selectedTabId}
                onChangeTab={setSelectedTabId}
                dropdownTargetHtmlAttributes={{
                    "data-test-id": "TabsLine__DropdownTarget",
                }}
                withSeparator
                maxVisible={4}
            />
        );
    },
};
