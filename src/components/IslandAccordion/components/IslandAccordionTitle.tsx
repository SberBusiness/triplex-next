import React, { useContext } from "react";
import { Title, ETitleSize, TTitleProps } from "../../Typography";
import { IslandAccordionContext } from "../IslandAccordionContext";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

export type IIslandAccordionTitleProps = Omit<TTitleProps<keyof JSX.IntrinsicElements>, "size"> & {
    children?: React.ReactNode;
};

const sizeToTitleSizeMap: Record<EComponentSize, ETitleSize> = {
    [EComponentSize.SM]: ETitleSize.H3,
    [EComponentSize.MD]: ETitleSize.H2,
    [EComponentSize.LG]: ETitleSize.H1,
};

export const IslandAccordionTitle: React.FC<IIslandAccordionTitleProps> = ({ children }) => {
    const { size } = useContext(IslandAccordionContext);

    return <Title size={sizeToTitleSizeMap[size]}>{children}</Title>;
};

IslandAccordionTitle.displayName = "IslandAccordionTitle";
