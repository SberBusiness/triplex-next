import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Controls, Description, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Tabs } from "../../src/components/Tabs";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Gap } from "../../src/components/Gap";
import { ETabsExtendedType } from "../../src/components/TabsExtended";
import "./Tabs.less";

export default {
    title: "Components/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент навигации первого уровня, используемый для организации и переключения между основными разделами приложения.
Визуально и структурно доминирует над другими элементами интерфейса, располагаясь непосредственно под шапкой.

## Особенности

- **Типы**: type1, type2
- **Размеры**: small (SM), medium (MD), large (LG)

                `,
            },
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof Tabs> = {
    name: "Playground",
    args: {
        size: EComponentSize.MD,
        type: ETabsExtendedType.TYPE_1,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                defaultValue: { summary: EComponentSize.MD },
            },
        },
        type: {
            control: { type: "select" },
            options: Object.values(ETabsExtendedType),
            description: "Тип компонента",
            table: {
                defaultValue: { summary: ETabsExtendedType.TYPE_1 },
            },
        },
    },
    parameters: {
        controls: {
            include: ["size", "type"],
        },
    },
    render: (args) => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-tab-0");

        const tabs = [
            { id: "tabs-tab-0", label: "Tab Name" },
            { id: "tabs-tab-1", label: "Tab Name" },
            { id: "tabs-tab-2", label: "Tab Name", showNotificationIcon: true },
            { id: "tabs-tab-3", label: "Tab Name" },
            { id: "tabs-tab-4", label: "Tab Name" },
            { id: "tabs-tab-5", label: "Tab Name" },
            { id: "tabs-tab-6", label: "Tab Name" },
            { id: "tabs-tab-7", label: "Tab Name" },
            { id: "tabs-tab-8", label: "Tab Name" },
            { id: "tabs-tab-9", label: "Tab Name", showNotificationIcon: true },
        ];

        return (
            <Tabs
                {...args}
                tabs={tabs}
                selectedId={selectedTabId}
                onSelectTab={(id) => setSelectedTabId(id)}
                buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
            />
        );
    },
};

export const Type1: StoryObj<typeof Tabs> = {
    name: "Type 1",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-tab-0");

        const tabs_0 = [
            { id: "tabs-tab-0-0", label: "Tab Name" },
            { id: "tabs-tab-0-1", label: "Tab Name" },
            { id: "tabs-tab-0-2", label: "Tab Name" },
            { id: "tabs-tab-0-3", label: "Tab Name" },
            { id: "tabs-tab-0-4", label: "Tab Name" },
            { id: "tabs-tab-0-5", label: "Tab Name" },
            { id: "tabs-tab-0-6", label: "Tab Name" },
            { id: "tabs-tab-0-7", label: "Tab Name" },
            { id: "tabs-tab-0-8", label: "Tab Name" },
            { id: "tabs-tab-0-9", label: "Tab Name" },
        ];

        const tabs_1 = [
            { id: "tabs-tab-1-0", label: "Tab Name" },
            { id: "tabs-tab-1-1", label: "Tab Name" },
            { id: "tabs-tab-1-2", label: "Tab Name" },
            { id: "tabs-tab-1-3", label: "Tab Name" },
            { id: "tabs-tab-1-4", label: "Tab Name" },
            { id: "tabs-tab-1-5", label: "Tab Name" },
            { id: "tabs-tab-1-6", label: "Tab Name" },
            { id: "tabs-tab-1-7", label: "Tab Name" },
            { id: "tabs-tab-1-8", label: "Tab Name" },
            { id: "tabs-tab-1-9", label: "Tab Name" },
        ];

        const tabs_2 = [
            { id: "tabs-tab-2-0", label: "Tab Name" },
            { id: "tabs-tab-2-1", label: "Tab Name" },
            { id: "tabs-tab-2-2", label: "Tab Name" },
            { id: "tabs-tab-2-3", label: "Tab Name" },
            { id: "tabs-tab-2-4", label: "Tab Name" },
            { id: "tabs-tab-2-5", label: "Tab Name" },
            { id: "tabs-tab-2-6", label: "Tab Name" },
            { id: "tabs-tab-2-7", label: "Tab Name" },
            { id: "tabs-tab-2-8", label: "Tab Name" },
            { id: "tabs-tab-2-9", label: "Tab Name" },
        ];

        return (
            <div className="tabs-type1-example">
                <Tabs
                    tabs={tabs_0}
                    selectedId={selectedTabId}
                    onSelectTab={(id) => setSelectedTabId(id)}
                    size={EComponentSize.SM}
                    buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                />
                <Gap size={16} />
                <Tabs
                    tabs={tabs_1}
                    selectedId={selectedTabId}
                    onSelectTab={(id) => setSelectedTabId(id)}
                    size={EComponentSize.MD}
                    buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                />
                <Gap size={16} />
                <Tabs
                    tabs={tabs_2}
                    selectedId={selectedTabId}
                    onSelectTab={(id) => setSelectedTabId(id)}
                    size={EComponentSize.LG}
                    buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                />
            </div>
        );
    },
};

export const Type2: StoryObj<typeof Tabs> = {
    name: "Type 2",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-tab-0");

        const tabs_0 = [
            { id: "tabs-tab-0-0", label: "Tab Name" },
            { id: "tabs-tab-0-1", label: "Tab Name" },
            { id: "tabs-tab-0-2", label: "Tab Name" },
            { id: "tabs-tab-0-3", label: "Tab Name" },
            { id: "tabs-tab-0-4", label: "Tab Name" },
            { id: "tabs-tab-0-5", label: "Tab Name" },
            { id: "tabs-tab-0-6", label: "Tab Name" },
            { id: "tabs-tab-0-7", label: "Tab Name" },
            { id: "tabs-tab-0-8", label: "Tab Name" },
            { id: "tabs-tab-0-9", label: "Tab Name" },
        ];

        const tabs_1 = [
            { id: "tabs-tab-1-0", label: "Tab Name" },
            { id: "tabs-tab-1-1", label: "Tab Name" },
            { id: "tabs-tab-1-2", label: "Tab Name" },
            { id: "tabs-tab-1-3", label: "Tab Name" },
            { id: "tabs-tab-1-4", label: "Tab Name" },
            { id: "tabs-tab-1-5", label: "Tab Name" },
            { id: "tabs-tab-1-6", label: "Tab Name" },
            { id: "tabs-tab-1-7", label: "Tab Name" },
            { id: "tabs-tab-1-8", label: "Tab Name" },
            { id: "tabs-tab-1-9", label: "Tab Name" },
        ];

        const tabs_2 = [
            { id: "tabs-tab-2-0", label: "Tab Name" },
            { id: "tabs-tab-2-1", label: "Tab Name" },
            { id: "tabs-tab-2-2", label: "Tab Name" },
            { id: "tabs-tab-2-3", label: "Tab Name" },
            { id: "tabs-tab-2-4", label: "Tab Name" },
            { id: "tabs-tab-2-5", label: "Tab Name" },
            { id: "tabs-tab-2-6", label: "Tab Name" },
            { id: "tabs-tab-2-7", label: "Tab Name" },
            { id: "tabs-tab-2-8", label: "Tab Name" },
            { id: "tabs-tab-2-9", label: "Tab Name" },
        ];

        return (
            <div className="tabs-type2-example">
                <Tabs
                    tabs={tabs_0}
                    selectedId={selectedTabId}
                    onSelectTab={(id) => setSelectedTabId(id)}
                    type={ETabsExtendedType.TYPE_2}
                    size={EComponentSize.SM}
                    buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                />
                <Gap size={16} />
                <Tabs
                    tabs={tabs_1}
                    selectedId={selectedTabId}
                    onSelectTab={(id) => setSelectedTabId(id)}
                    type={ETabsExtendedType.TYPE_2}
                    size={EComponentSize.MD}
                    buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                />
                <Gap size={16} />
                <Tabs
                    tabs={tabs_2}
                    selectedId={selectedTabId}
                    onSelectTab={(id) => setSelectedTabId(id)}
                    type={ETabsExtendedType.TYPE_2}
                    size={EComponentSize.LG}
                    buttonDropdownAttributes={{ "aria-label": "Другие вкладки" }}
                />
            </div>
        );
    },
};
