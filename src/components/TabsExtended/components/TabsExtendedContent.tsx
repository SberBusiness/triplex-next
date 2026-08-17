import React from "react";
import clsx from "clsx";
import { TabsExtendedTabsWrapper } from "./TabsExtendedTabsWrapper";
import { TabsExtendedTab } from "./TabsExtendedTab";
import { TabsExtendedTabButton } from "./TabsExtendedTabButton";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { TabsExtendedDropdownWrapper } from "./TabsExtendedDropdownWrapper";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "../styles/TabsExtended.module.less";

/** Свойства компонента TabsExtendedContent. */
export interface ITabsExtendedContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Размер компонента. Задаёт скругление и внутренние отступы контейнера. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
}

/** Внутренние составляющие TabsExtendedContent. */
export interface ITabsExtendedContentComposition {
    /** Контейнер табов, определяющий, какие табы уезжают в Dropdown. */
    TabsWrapper: typeof TabsExtendedTabsWrapper;
    /** Контейнер содержимого одного таба. */
    Tab: typeof TabsExtendedTab;
    /** Кнопка таба. */
    TabButton: typeof TabsExtendedTabButton;
    /** Контейнер для Dropdown со скрытыми табами. */
    DropdownWrapper: typeof TabsExtendedDropdownWrapper;
}

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Контейнер табов и Dropdown. Задаёт фон и размер компонента. */
export const TabsExtendedContent = Object.assign(
    React.forwardRef<HTMLDivElement, ITabsExtendedContentProps>(
        ({ children, className, size = EComponentSize.MD, ...htmlDivAttributes }, ref) => (
            <div
                className={clsx(styles.tabsExtendedContent, sizeToClassNameMap[size], className)}
                {...htmlDivAttributes}
                ref={ref}
            >
                {children}
            </div>
        ),
    ),
    {
        TabsWrapper: TabsExtendedTabsWrapper,
        Tab: TabsExtendedTab,
        TabButton: TabsExtendedTabButton,
        DropdownWrapper: TabsExtendedDropdownWrapper,
    } satisfies ITabsExtendedContentComposition,
);

TabsExtendedContent.displayName = "TabsExtendedContent";
