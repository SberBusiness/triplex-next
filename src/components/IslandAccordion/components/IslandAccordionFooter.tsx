import React from "react";
import styles from "../styles/IslandAccordion.module.less";
import { Island } from "../../Island/";

/** Свойства компонента IslandAccordionFooter. */
export interface IIslandAccordionFooterProps {
    children?: React.ReactNode;
}

/** Компонент подвала элемента акоордеона. */
export const IslandAccordionFooter: React.FC<IIslandAccordionFooterProps> = ({ children }) => (
    <Island.Footer className={styles.footer}>{children}</Island.Footer>
);

IslandAccordionFooter.displayName = "IslandAccordionFooter";
