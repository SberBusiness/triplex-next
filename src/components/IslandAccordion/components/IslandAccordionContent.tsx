import React from "react";
import styles from "../styles/IslandAccordion.module.less";
import { Island } from "../../Island";

/** Свойства компонента IslandAccordionContent. */
export interface IIslandAccordionContentProps {
    /** Содержимое раскрывающейся части элемента аккордеона. */
    children?: React.ReactNode;
}

/** Компонент содержимого элемента аккордеона. Обёртка над Island.Body с отступами аккордеона. */
export const IslandAccordionContent: React.FC<IIslandAccordionContentProps> = ({ children }) => (
    <Island.Body className={styles.body}>{children}</Island.Body>
);

IslandAccordionContent.displayName = "IslandAccordionContent";
