import React from "react";
import clsx from "clsx";
import styles from "../styles/CalendarFooter.module.less";

/** Свойства компонента CalendarFooter. */
export interface ICalendarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер календаря. */
export const CalendarFooter: React.FC<ICalendarFooterProps> = ({ children, className, ...rest }) => (
    <div className={clsx(styles.calendarFooter, className)} {...rest}>
        {children}
    </div>
);

CalendarFooter.displayName = "CalendarFooter";
