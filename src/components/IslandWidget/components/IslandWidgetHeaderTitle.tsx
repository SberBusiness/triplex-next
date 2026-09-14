import React from "react";
import clsx from "clsx";
import { Title } from "@sberbusiness/triplex-next/components/Typography";
import { ETitleSize, EFontWeightTitle } from "@sberbusiness/triplex-next/components/Typography/enums";
import styles from "../styles/IslandWidgetHeader.module.less";

/** Свойства компонента IslandWidgetHeaderTitle. */
export interface IIslandWidgetHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Заголовок шапки виджета. Однострочный на десктопе, с переносом в адаптиве. */
export const IslandWidgetHeaderTitle: React.FC<IIslandWidgetHeaderTitleProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => (
    <Title
        size={ETitleSize.H3}
        weight={EFontWeightTitle.MEDIUM}
        {...htmlDivAttributes}
        className={clsx(styles.islandWidgetHeaderTitle, className)}
    >
        {children}
    </Title>
);

IslandWidgetHeaderTitle.displayName = "IslandWidgetHeaderTitle";
