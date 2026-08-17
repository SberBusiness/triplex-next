import React, { useState } from "react";
import {
    ButtonDropdown,
    EButtonDotsTheme,
    EComponentSize,
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
 * Высоту триггера нужно согласовать с высотой кнопки таба: по умолчанию кнопка размера MD
 * выше таба (40px против 32px) и растягивает по себе и контейнер, и сами табы.
 */
const DROPDOWN_TRIGGER_STYLE: React.CSSProperties = {
    minWidth: "32px",
    minHeight: "32px",
    height: "32px",
    padding: 0,
    justifyContent: "center",
};

export const WithDropdown = () => {
    const [selectedId, setSelectedId] = useState("tab-1");

    /** Табы, не поместившиеся в строку, превращаются в опции выпадающего списка. */
    const getDropdownOptions = ({ dropdownItemsIds, onSelectTab }: ITabsExtendedDropdownWrapperProvideProps) =>
        TABS.filter(({ id }) => dropdownItemsIds.includes(id)).map((tab) => ({
            ...tab,
            onSelect: () => onSelectTab(tab.id),
        }));

    return (
        // Ширина контейнера ограничена, чтобы часть табов не поместилась в строку.
        <div style={{ maxWidth: "420px" }}>
            <TabsExtended selectedId={selectedId} onSelectTab={setSelectedId}>
                <TabsExtended.Content>
                    <TabsExtended.Content.TabsWrapper>
                        {TABS.map(({ id, label }) => (
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
                        {(provideProps) => (
                            <ButtonDropdown
                                theme={EButtonDotsTheme.DOTS_SECONDARY}
                                size={EComponentSize.MD}
                                options={getDropdownOptions(provideProps)}
                                selected={TABS.find(({ id }) => id === selectedId)}
                                buttonAttributes={{ "aria-label": "Ещё табы", style: DROPDOWN_TRIGGER_STYLE }}
                            />
                        )}
                    </TabsExtended.Content.DropdownWrapper>
                </TabsExtended.Content>
            </TabsExtended>
        </div>
    );
};
