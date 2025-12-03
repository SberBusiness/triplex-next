import React from "react";
import styles from "../styles/CalendarFooter.module.less";

/** Свойства компонента CalendarFooter. */
export interface ICalendarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Футер календаря. */
export const CalendarFooter: React.FC<ICalendarFooterProps> = ({ children }) => (
    <div className={styles.calendarFooter}>{children}</div>
);

CalendarFooter.displayName = "CalendarFooter";
