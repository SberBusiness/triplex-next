import React from "react";
import { HeaderTabsContent } from "@sber-business/triplex/components/Header/components/HeaderTabs/HeaderTabsContent";
import { HeaderTabsControls } from "@sber-business/triplex/components/Header/components/HeaderTabs/HeaderTabsControls";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderTabs. */
export interface IHeaderTabsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Второй уровень Header. Содержит в себе табы и кнопки действий. */
export const HeaderTabs = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderTabsProps>(function HeaderTabs({ children, className, ...rest }, ref) {
        return (
            <div className={classnames("cssClass[globalHeaderTabs]", className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: HeaderTabsContent,
        Controls: HeaderTabsControls,
    },
);

HeaderTabs.displayName = "HeaderTabs";
