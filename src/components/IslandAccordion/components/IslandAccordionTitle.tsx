import React from "react";
import { Title, ETitleSize, TTitleProps } from "../../Typography";

export type IIslandAccordionTitleProps = Omit<TTitleProps<keyof JSX.IntrinsicElements>, "size"> & {
    children?: React.ReactNode;
    size?: ETitleSize;
};

export const IslandAccordionTitle: React.FC<IIslandAccordionTitleProps> = ({ children, size = ETitleSize.H2 }) => (
    <Title size={size}>{children}</Title>
);

IslandAccordionTitle.displayName = "IslandAccordionTitle";
