import React from "react";
import { HeaderTitleContentText } from "@sber-business/triplex/components/Header/components/HeaderTitle/HeaderTitleContentText";
import { HeaderTitleContentSubhead } from "@sber-business/triplex/components/Header/components/HeaderTitle/HeaderTitleContentSubhead";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderTitleContent. */
export interface IHeaderTitleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Часть HeaderTitle с заголовком и подзаголовком. */
export const HeaderTitleContent = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderTitleContentProps>(function HeaderTitleContent(
        { children, className, ...rest },
        ref,
    ) {
        return (
            <div className={classnames(className, "cssClass[headerTitleContent]")} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Subhead: HeaderTitleContentSubhead,
        Text: HeaderTitleContentText,
    },
);

HeaderTitleContent.displayName = "HeaderTitleContent";
