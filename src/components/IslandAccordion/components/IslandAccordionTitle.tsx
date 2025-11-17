import React from "react";
import { Title, ETitleSize } from "../../Typography";

export interface IIslandAccordionTitleProps {
    children?: React.ReactNode;
    size?: ETitleSize;
}

export const IslandAccordionTitle: React.FC<IIslandAccordionTitleProps> = ({ children, size = ETitleSize.H2 }) => (
    <Title size={size}>{children}</Title>
);

IslandAccordionTitle.displayName = "IslandAccordionTitle";
