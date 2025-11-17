import React from "react";
import styles from "../styles/IslandAccordion.module.less";
import { Island } from "../../Island/";

/** Свойства компонента IslandAccordionContent. */
export interface IIslandAccordionContentProps {
    children?: React.ReactNode;
}

/** Компонент содержимого элемента аккордеона. */
export const IslandAccordionContent: React.FC<IIslandAccordionContentProps> = ({ children }) => (
    <Island.Body className={styles.body}>{children}</Island.Body>
);

IslandAccordionContent.displayName = "IslandAccordionContent";
