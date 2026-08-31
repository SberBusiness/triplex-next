import React from "react";
import { HeaderTitleContent } from "./HeaderTitleContent";
import { HeaderTitleControls } from "./HeaderTitleControls";
import clsx from "clsx";
import styles from "../../styles/HeaderTitle.module.less";

/** Свойства компонента HeaderTitle. */
export interface IHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Содержимое уровня. Обычно составные HeaderTitle.Content и HeaderTitle.Controls. */
    children?: React.ReactNode;
}

/**
 * Первый уровень Header. Содержит заголовок, подзаголовок и кнопки действий.
 * Раскладывает `HeaderTitle.Content` и `HeaderTitle.Controls` в строку,
 * на ширине экрана до 767px кнопки переносятся под контент.
 */
export const HeaderTitle = Object.assign(
    React.forwardRef<HTMLDivElement, IHeaderTitleProps>(function HeaderTitle({ children, className, ...rest }, ref) {
        return (
            <div className={clsx(styles.headerTitle, className)} {...rest} ref={ref}>
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
