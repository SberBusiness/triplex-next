import React, { useState } from "react";
import { TabsExtended } from "../../src/components/TabsExtended";
import { ButtonDropdown, dotsTheme } from "../../src/components/Button/ButtonDropdown";
import { EButtonSize } from "../../src/components/Button/enums";
import { StoryObj } from "@storybook/react";
import "./styles.less";

export default {
    title: "Components/TabsExtended",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Базовый компонент табов. На его основе можно рендерить табы любого дизайна.

## Особенности

- Компонент формируется декларативно

## Использование

\`\`\`tsx
import { TabsExtended } from '@sberbusiness/triplex-next';

const [selectedId, setSelectedId] = useState('tab1');

<TabsExtended selectedId={selectedId} onSelectTab={setSelectedId}>
    <TabsExtended.Content>
        <TabsExtended.Content.TabsWrapper>
            <TabsExtended.Content.Tab id="tab1">
                {({ selected }) => (
                    <TabsExtended.Content.TabButton selected={selected}>
                        Первый таб
                    </TabsExtended.Content.TabButton>
                )}
            </TabsExtended.Content.Tab>
            <TabsExtended.Content.Tab id="tab2">
                {({ selected }) => (
                    <TabsExtended.Content.TabButton selected={selected}>
                        Второй таб
                    </TabsExtended.Content.TabButton>
                )}
            </TabsExtended.Content.Tab>
        </TabsExtended.Content.TabsWrapper>
        
        <TabsExtended.Content.DropdownWrapper>
            {({ dropdownItemsIds, onSelectTab }) => (
                <CustomDropdown items={dropdownItemsIds} onSelect={onSelectTab} />
            )}
        </TabsExtended.Content.DropdownWrapper>
    </TabsExtended.Content>
</TabsExtended>
\`\`\`
                `,
            },
        },
    },
};

export const Default: StoryObj<typeof TabsExtended> = {
    name: "Default",
    argTypes: {},
    render: () => {
        const [selectedTabId, setSelectedTabId] = useState("tabs-extended-tab-0-0");

        const getDropdownOptions = ({ dropdownItemsIds, onSelectTab }) =>
            options
                .filter((option) => dropdownItemsIds.includes(option.id))
                .map((option) => ({ ...option, onSelect: () => onSelectTab(option.id) }));

        const options = [
            { id: "tabs-extended-tab-0-0", label: "Tab Name" },
            { id: "tabs-extended-tab-0-1", label: "Tab Name" },
            { id: "tabs-extended-tab-0-2", label: "Tab Name" },
            { id: "tabs-extended-tab-0-3", label: "Tab Name" },
            { id: "tabs-extended-tab-0-4", label: "Tab Name" },
            { id: "tabs-extended-tab-0-5", label: "Tab Name" },
            { id: "tabs-extended-tab-0-6", label: "Tab Name" },
            { id: "tabs-extended-tab-0-7", label: "Tab Name" },
            { id: "tabs-extended-tab-0-8", label: "Tab Name" },
            { id: "tabs-extended-tab-0-9", label: "Tab Name" },
        ];

        return (
            <div style={{ width: "600px" }}>
                <TabsExtended className="tabs-extended" selectedId={selectedTabId} onSelectTab={setSelectedTabId}>
                    <TabsExtended.Content className="tabs-extended-content">
                        <TabsExtended.Content.TabsWrapper>
                            {options.map(({ id, label }) => (
                                <TabsExtended.Content.Tab key={id} id={id}>
                                    {({ selected }) => (
                                        <TabsExtended.Content.TabButton selected={selected}>
                                            {label}
                                        </TabsExtended.Content.TabButton>
                                    )}
                                </TabsExtended.Content.Tab>
                            ))}
                        </TabsExtended.Content.TabsWrapper>
                        <TabsExtended.Content.DropdownWrapper>
                            {({ dropdownItemsIds, onSelectTab }) => (
                                <ButtonDropdown
                                    theme={dotsTheme}
                                    size={EButtonSize.SM}
                                    options={getDropdownOptions({ dropdownItemsIds, onSelectTab })}
                                    selected={options.filter((option) => option.id == selectedTabId)[0]}
                                >
                                    Button text
                                </ButtonDropdown>
                            )}
                        </TabsExtended.Content.DropdownWrapper>
                    </TabsExtended.Content>
                </TabsExtended>
            </div>
        );
    },
};
