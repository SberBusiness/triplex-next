import React from "react";
import { Title } from "@sberbusiness/triplex-next/components/Typography";
import { ETitleSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import styles from "../styles/IslandWidgetHeader.module.less";
import clsx from "clsx";

interface IIslandWidgetHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetHeaderTitle: React.FC<IIslandWidgetHeaderTitleProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <Title size={ETitleSize.H3} {...htmlDivAttributes} className={clsx(styles.islandWidgetHeaderTitle, className)}>
        {children}
    </Title>
);

IslandWidgetHeaderTitle.displayName = "IslandWidgetHeaderTitle";
