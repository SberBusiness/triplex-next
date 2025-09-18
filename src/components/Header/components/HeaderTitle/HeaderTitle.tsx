import React from "react";
import { HeaderTitleContent } from "@sber-business/triplex/components/Header/components/HeaderTitle/HeaderTitleContent";
import { HeaderTitleControls } from "@sber-business/triplex/components/Header/components/HeaderTitle/HeaderTitleControls";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

/** Свойства компонента HeaderTitle. */
export interface IHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Первый уровень Header. Содержит заголовок, подзаголовок и кнопки действий. */
export const HeaderTitle = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderTitleProps>(function HeaderTitle({ children, className, ...rest }, ref) {
        return (
            <div className={classnames("cssClass[globalHeaderTitle]", className)} {...rest} ref={ref}>
                {children}
            </div>
        );
    }),
    {
        Content: HeaderTitleContent,
        Controls: HeaderTitleControls,
    },
);

HeaderTitle.displayName = "HeaderTitle";
