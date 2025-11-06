import React from "react";
import clsx from "clsx";
import { MobileView } from "../MobileView";
import { TabsLineDesktop, ITabsLineDesktopProps } from "./components/TabsLineDesktop";
import { TabsLineMobile } from "./components/TabsLineMobile";
import styles from "./styles/TabsLine.module.less";

/** Состояние компонента TabsLine. */
export interface ITabsLineProps extends ITabsLineDesktopProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    /** Горизонтальный отступ от первого таба слева и последнего таба справа. */
    paddingX?: 0 | 8 | 16 | 24;
}

/** Компонент TabsLine. */
export const TabsLine: React.FC<ITabsLineProps> = ({
    className,
    dropdownTargetHtmlAttributes,
    maxVisible,
    onChangeTab,
    paddingX,
    selectedId,
    tabs,
    size,
    ...htmlDivAttributes
}) => {
    return (
        <div
            role="tablist"
            className={clsx(className, styles.tabsLineWrapper)}
            {...htmlDivAttributes}
            data-paddingx-size={paddingX}
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
    );
};
