import React from "react";
import { EComponentSize, ETabsExtendedType, Tabs } from "@sberbusiness/triplex-next";

const TABS = [
    { id: "tab-1", label: "Tab Name 1" },
    { id: "tab-2", label: "Tab Name 2" },
    { id: "tab-3", label: "Tab Name 3" },
];

const OVERFLOW_TABS = [
    { id: "tab-1", label: "Tab Name 1" },
    { id: "tab-2", label: "Tab Name 2" },
    { id: "tab-3", label: "Tab Name 3" },
    { id: "tab-4", label: "Tab Name 4" },
    { id: "tab-5", label: "Tab Name 5" },
    { id: "tab-6", label: "Tab Name 6" },
];

/** Ширина, при которой часть табов не помещается в строку. Фиксирована, чтобы скриншоты не зависели от viewport. */
const OVERFLOW_CONTAINER_WIDTH = "420px";

interface IVariantProps {
    caption: string;
    size?: EComponentSize;
    type?: ETabsExtendedType;
    withNotificationIcon?: boolean;
}

/** Статичный набор табов: выбран второй таб, состояние не меняется. */
const Variant = ({
    caption,
    size = EComponentSize.MD,
    type = ETabsExtendedType.TYPE_1,
    withNotificationIcon,
}: IVariantProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "700" }}>{caption}</div>
        <Tabs
            tabs={TABS.map((tab, index) => ({
                ...tab,
                showNotificationIcon: withNotificationIcon && index === 2,
            }))}
            type={type}
            size={size}
            selectedId="tab-2"
            onSelectTab={() => {}}
            buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
        />
    </div>
);

interface IOverflowVariantProps {
    caption: string;
    selectedId: string;
}

/** Табы в узком контейнере: часть из них уезжает в выпадающий список. */
const OverflowVariant = ({ caption, selectedId }: IOverflowVariantProps) => (
    <div>
        <div style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "700" }}>{caption}</div>
        <div style={{ width: OVERFLOW_CONTAINER_WIDTH }}>
            <Tabs
                tabs={OVERFLOW_TABS}
                selectedId={selectedId}
                onSelectTab={() => {}}
                buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
            />
        </div>
    </div>
);

export const VisualTests = () => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "24px" }}>
        <Variant caption="type1, MD" />
        <Variant caption="type1, SM" size={EComponentSize.SM} />
        <Variant caption="type1, LG" size={EComponentSize.LG} />
        <Variant caption="type2, MD" type={ETabsExtendedType.TYPE_2} />
        <Variant caption="type2, LG" type={ETabsExtendedType.TYPE_2} size={EComponentSize.LG} />
        <Variant caption="Значок уведомлений" withNotificationIcon />
        <OverflowVariant caption="Часть табов в выпадающем списке" selectedId="tab-1" />
        <OverflowVariant caption="Выбранный таб уехал в выпадающий список" selectedId="tab-6" />
    </div>
);

/** Раскрытый выпадающий список: открывается play-функцией стори. */
export const VisualTestsOpen = () => (
    // Запас снизу, чтобы раскрытый список не обрезался на скриншоте.
    <div style={{ width: OVERFLOW_CONTAINER_WIDTH, paddingBottom: "220px" }}>
        <Tabs
            tabs={OVERFLOW_TABS}
            selectedId="tab-1"
            onSelectTab={() => {}}
            buttonDropdownAttributes={{ "aria-label": "Ещё табы" }}
        />
    </div>
);
