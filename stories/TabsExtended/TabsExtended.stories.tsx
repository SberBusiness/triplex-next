import React, { useState } from "react";
import { Controls, Description, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { TabsExtended } from "../../src/components/TabsExtended";
import { ButtonDropdown } from "../../src/components/Button/ButtonDropdown";
import { EButtonDotsTheme } from "../../src/components/Button/enums";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { StoryObj } from "@storybook/react";
import "./styles.less";

export default {
    title: "Components/TabsExtended",
    component: TabsExtended,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Базовый компонент табов. На его основе можно рендерить табы любого дизайна.

## Особенности

- Компонент формируется декларативно

                `,
            },
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Default: StoryObj<typeof TabsExtended> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-extended-tab-0-0");

        const getDropdownOptions = ({ dropdownItemsIds, onSelectTab }) =>
            options
                .filter((option) => dropdownItemsIds.includes(option.id))
                .map((option) => ({ ...option, onSelect: () => onSelectTab(option.id) }));

        const options = [
            { id: "tabs-extended-tab-0-0", label: "Tab Name" },
            { id: "tabs-extended-tab-0-1", label: "Tab Name" },
            { id: "tabs-extended-tab-0-2", label: "Tab Name", showNotificationIcon: true },
            { id: "tabs-extended-tab-0-3", label: "Tab Name" },
            { id: "tabs-extended-tab-0-4", label: "Tab Name" },
            { id: "tabs-extended-tab-0-5", label: "Tab Name" },
            { id: "tabs-extended-tab-0-6", label: "Tab Name" },
            { id: "tabs-extended-tab-0-7", label: "Tab Name" },
            { id: "tabs-extended-tab-0-8", label: "Tab Name" },
            { id: "tabs-extended-tab-0-9", label: "Tab Name", showNotificationIcon: true },
        ];

        return (
            <div style={{ maxWidth: "600px" }}>
                <TabsExtended className="tabs-extended" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
                    <TabsExtended.Content className="tabs-extended-content">
                        <TabsExtended.Content.TabsWrapper>
                            {options.map(({ id, label, showNotificationIcon }) => (
                                <TabsExtended.Content.Tab key={id} id={id}>
                                    {({ selected }) => (
                                        <TabsExtended.Content.TabButton
                                            selected={selected}
                                            showNotificationIcon={showNotificationIcon}
                                        >
                                            {label}
                                        </TabsExtended.Content.TabButton>
                                    )}
                                </TabsExtended.Content.Tab>
                            ))}
                        </TabsExtended.Content.TabsWrapper>
                        <TabsExtended.Content.DropdownWrapper>
                            {({ dropdownItemsIds, onSelectTab }) => (
                                <ButtonDropdown
                                    className="button-icon-dropdown-tabs-extended"
                                    theme={EButtonDotsTheme.DOTS_SECONDARY}
                                    size={EComponentSize.MD}
                                    options={getDropdownOptions({ dropdownItemsIds, onSelectTab })}
                                    selected={options.filter((option) => option.id == selectedTabId)[0]}
                                />
                            )}
                        </TabsExtended.Content.DropdownWrapper>
                    </TabsExtended.Content>
                </TabsExtended>
            </div>
        );
    },
};
