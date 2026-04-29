import React from "react";
import { Title } from "@sberbusiness/triplex-next/components/Typography";
import { ETitleSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import styles from "../styles/IslandWidgetHeader.module.less";

interface IIslandWidgetHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetHeaderTitle: React.FC<IIslandWidgetHeaderTitleProps> = ({
    children,
    ...htmlDivAttributes
}) => (
    <Title size={ETitleSize.H3} {...htmlDivAttributes} className={styles.islandWidgetHeaderTitle}>
        {children}
    </Title>
);

IslandWidgetHeaderTitle.displayName = "IslandWidgetHeaderTitle";
