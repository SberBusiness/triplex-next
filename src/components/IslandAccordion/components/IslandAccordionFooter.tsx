import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandAccordion.module.less";
import { Island, IIslandFooterProps } from "../../Island";

/** Свойства компонента IslandAccordionFooter. */
export interface IIslandAccordionFooterProps extends IIslandFooterProps {}

/** Компонент подвала элемента акоордеона. */
export const IslandAccordionFooter = React.forwardRef<HTMLDivElement, IIslandAccordionFooterProps>(
    ({ className, ...rest }, ref) => <Island.Footer className={clsx(styles.footer, className)} {...rest} ref={ref} />,
);

IslandAccordionFooter.displayName = "IslandAccordionFooter";
