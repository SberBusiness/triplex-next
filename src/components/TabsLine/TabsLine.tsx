import React from "react";
import clsx from "clsx";
import { MobileView } from "../MobileView";
import { ITabsLineDesktopProps, TabsLineDesktop } from "./components/TabsLineDesktop";
import { TabsLineMobile } from "./components/TabsLineMobile";
import styles from "./styles/TabsLine.module.less";

/** Свойства компонента TabsLine. */
export interface ITabsLineProps extends ITabsLineDesktopProps {
    /** Горизонтальный отступ от первого таба слева и последнего таба справа. */
    paddingX?: 0 | 8 | 16 | 24;
    /** Разделитель в виде нижнего бордера. По умолчанию false. */
    withSeparator?: boolean;
}

/**
 * Линейка табов-подчёркиваний. На десктопе не поместившиеся по maxVisible табы уезжают в дропдаун,
 * на мобильном (<768px) все табы остаются в строке с горизонтальной прокруткой.
 */
export const TabsLine = React.forwardRef<HTMLDivElement, ITabsLineProps>(
    (
        {
            className,
            dropdownTargetHtmlAttributes,
            maxVisible,
            onChangeTab,
            paddingX,
            selectedId,
            tabs,
            size,
            withSeparator,
            ...htmlDivAttributes
        },
        ref,
    ) => (
        <div
            role="tablist"
            className={clsx(className, styles.tabsLineWrapper, { [styles.withSeparator]: withSeparator })}
            {...htmlDivAttributes}
            data-paddingx-size={paddingX}
            ref={ref}
        >
            <MobileView
                fallback={
                    <TabsLineDesktop
                        tabs={tabs}
                        onChangeTab={onChangeTab}
                        selectedId={selectedId}
                        dropdownTargetHtmlAttributes={dropdownTargetHtmlAttributes}
                        maxVisible={maxVisible}
                        size={size}
                    />
                }
            >
                <TabsLineMobile tabs={tabs} onChangeTab={onChangeTab} selectedId={selectedId} />
            </MobileView>
        </div>
    ),
);

TabsLine.displayName = "TabsLine";
