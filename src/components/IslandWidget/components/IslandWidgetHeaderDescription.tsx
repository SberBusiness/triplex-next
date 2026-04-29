import React from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetHeader.module.less";
import { Text, ETextSize, EFontType } from "@sberbusiness/triplex-next/components/Typography";

/** Свойства компонента IslandWidgetHeaderDescription. */
interface IIslandWidgetHeaderDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetHeaderDescription: React.FC<IIslandWidgetHeaderDescriptionProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <Text
        size={ETextSize.B4}
        type={EFontType.SECONDARY}
        {...htmlDivAttributes}
        className={clsx(styles.islandWidgetHeaderDescription, className)}
    >
        {children}
    </Text>
);

IslandWidgetHeaderDescription.displayName = "IslandWidgetHeaderDescription";
