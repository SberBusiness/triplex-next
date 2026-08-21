import React, { useState } from "react";
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
];

const OVERFLOW_TABS = [
    { id: "tab-1", label: "Обзор" },
    { id: "tab-2", label: "Операции" },
    { id: "tab-3", label: "Документы" },
    { id: "tab-4", label: "Реквизиты" },
    { id: "tab-5", label: "Выписка" },
    { id: "tab-6", label: "Настройки" },
];

interface IVariantProps {
    caption: string;
    size?: EComponentSize;
    type?: ETabsExtendedType;
    withNotificationIcon?: boolean;
}

/** Высота триггера Dropdown, согласованная с высотой кнопки таба размера MD. */
const DROPDOWN_TRIGGER_STYLE: React.CSSProperties = {
    minWidth: "32px",
    minHeight: "32px",
    height: "32px",
    padding: 0,
    justifyContent: "center",
};

/** Статичный набор табов: выбран второй таб, состояние не меняется. */
const Variant = ({
    caption,
    size = EComponentSize.MD,
    type = ETabsExtendedType.TYPE_1,
    withNotificationIcon,
}: IVariantProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "700" }}>{caption}</div>
        <TabsExtended type={type} selectedId="tab-2" onSelectTab={() => {}}>
            <TabsExtended.Content size={size}>
                <TabsExtended.Content.TabsWrapper>
                    {TABS.map(({ id, label }, index) => (
                        <TabsExtended.Content.Tab key={id} id={id}>
                            {({ selected }) => (
                                <TabsExtended.Content.TabButton
                                    selected={selected}
                                    size={size}
                                    showNotificationIcon={withNotificationIcon && index === 2}
                                >
                                    {label}
                                </TabsExtended.Content.TabButton>
                            )}
                        </TabsExtended.Content.Tab>
                    ))}
                </TabsExtended.Content.TabsWrapper>
            </TabsExtended.Content>
        </TabsExtended>
    </div>
);

/** Табы, часть которых уехала в раскрытый Dropdown. Состояние открытости зафиксировано. */
const OpenedDropdown = () => {
    const [selectedId, setSelectedId] = useState("tab-1");

    const getDropdownOptions = ({ dropdownItemsIds, onSelectTab }: ITabsExtendedDropdownWrapperProvideProps) =>
        OVERFLOW_TABS.filter(({ id }) => dropdownItemsIds.includes(id)).map((tab) => ({
            ...tab,
            onSelect: () => onSelectTab(tab.id),
        }));

    return (
        <div>
            <div style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "700" }}>Раскрытый dropdown</div>
            <div style={{ width: "420px", paddingBottom: "220px" }}>
                <TabsExtended selectedId={selectedId} onSelectTab={setSelectedId}>
                    <TabsExtended.Content>
                        <TabsExtended.Content.TabsWrapper>
                            {OVERFLOW_TABS.map(({ id, label }) => (
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
                                    selected={OVERFLOW_TABS.find(({ id }) => id === selectedId)}
                                    buttonAttributes={{ "aria-label": "Ещё табы", style: DROPDOWN_TRIGGER_STYLE }}
                                    // Открытое состояние зафиксировано: скриншот снимается без взаимодействия.
                                    opened
                                />
                            )}
                        </TabsExtended.Content.DropdownWrapper>
                    </TabsExtended.Content>
                </TabsExtended>
            </div>
        </div>
    );
};

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "24px" }}>
        <Variant caption="type1, MD" />
        <Variant caption="type1, SM" size={EComponentSize.SM} />
        <Variant caption="type1, LG" size={EComponentSize.LG} />
        <Variant caption="type2, MD" type={ETabsExtendedType.TYPE_2} />
        <Variant caption="type2, LG" type={ETabsExtendedType.TYPE_2} size={EComponentSize.LG} />
        <Variant caption="Значок уведомлений" withNotificationIcon />
        <OpenedDropdown />
    </div>
);
