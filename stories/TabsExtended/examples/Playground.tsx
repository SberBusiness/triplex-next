import React, { useState } from "react";
import { action } from "storybook/actions";
import {
    ButtonDropdown,
    EButtonDotsTheme,
    EComponentSize,
    ETabsExtendedType,
    ITabsExtendedDropdownWrapperProvideProps,
    TabsExtended,
} from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
    { id: "tab-4", label: "Реквизиты" },
    { id: "tab-5", label: "Выписка" },
    { id: "tab-6", label: "Настройки" },
];

/**
 * Высоту триггера нужно согласовать с высотой кнопки таба: по умолчанию кнопка Dropdown
 * выше таба того же размера и растягивает по себе и контейнер, и сами табы.
 */
const DROPDOWN_TRIGGER_STYLE_BY_SIZE: Record<EComponentSize, React.CSSProperties> = {
    [EComponentSize.SM]: { minWidth: "20px", minHeight: "20px", height: "20px", padding: 0, justifyContent: "center" },
    [EComponentSize.MD]: { minWidth: "32px", minHeight: "32px", height: "32px", padding: 0, justifyContent: "center" },
    [EComponentSize.LG]: { minWidth: "40px", minHeight: "40px", height: "40px", padding: 0, justifyContent: "center" },
};

/** Свойства примера Playground. */
export interface IPlaygroundProps {
    /** Тип оформления табов. */
    type: ETabsExtendedType;
    /** Размер компонента. Задаётся на TabsExtended.Content и кнопках таба. */
    size: EComponentSize;
    /** Количество табов. */
    tabsCount: number;
    /** Ширина контейнера в пикселях: чем она меньше, тем больше табов уезжает в Dropdown. */
    containerWidth: number;
    /** Значок новых уведомлений на втором табе. */
    showNotificationIcon: boolean;
}

export const Playground = ({ type, size, tabsCount, containerWidth, showNotificationIcon }: IPlaygroundProps) => {
    const [selectedId, setSelectedId] = useState("tab-1");

    const tabs = TABS.slice(0, tabsCount);

    const handleSelectTab = (id: string) => {
        action("onSelectTab")(id);
        setSelectedId(id);
    };

    const getDropdownOptions = ({ dropdownItemsIds, onSelectTab }: ITabsExtendedDropdownWrapperProvideProps) =>
        tabs
            .filter(({ id }) => dropdownItemsIds.includes(id))
            .map((tab) => ({ ...tab, onSelect: () => onSelectTab(tab.id) }));

    return (
        <div style={{ width: `${containerWidth}px` }}>
            <TabsExtended type={type} selectedId={selectedId} onSelectTab={handleSelectTab}>
                <TabsExtended.Content size={size}>
                    <TabsExtended.Content.TabsWrapper>
                        {tabs.map(({ id, label }, index) => (
                            <TabsExtended.Content.Tab key={id} id={id}>
                                {({ selected }) => (
                                    <TabsExtended.Content.TabButton
                                        selected={selected}
                                        size={size}
                                        showNotificationIcon={showNotificationIcon && index === 1}
                                    >
                                        {label}
                                    </TabsExtended.Content.TabButton>
                                )}
                            </TabsExtended.Content.Tab>
                        ))}
                    </TabsExtended.Content.TabsWrapper>

                    <TabsExtended.Content.DropdownWrapper>
                        {(provideProps) => (
                            <ButtonDropdown
                                theme={EButtonDotsTheme.DOTS_SECONDARY}
                                size={size}
                                options={getDropdownOptions(provideProps)}
                                selected={tabs.find(({ id }) => id === selectedId)}
                                buttonAttributes={{
                                    "aria-label": "Ещё табы",
                                    style: DROPDOWN_TRIGGER_STYLE_BY_SIZE[size],
                                }}
                            />
                        )}
                    </TabsExtended.Content.DropdownWrapper>
                </TabsExtended.Content>
            </TabsExtended>
        </div>
    );
};
