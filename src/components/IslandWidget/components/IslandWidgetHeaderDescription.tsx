import React, { useContext } from "react";
import clsx from "clsx";
import styles from "../styles/IslandWidgetHeader.module.less";
import { Text, ETextSize, EFontType } from "@sberbusiness/triplex-next/components/Typography";
import { IslandWidgetContext } from "../IslandWidgetContext";
import { EComponentSize } from "../../../enums/EComponentSize";

/** Соответствие размера компонента размеру текста описания в адаптиве. На десктопе во всех размерах B4. */
const SIZE_TO_ADAPTIVE_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.SM]: ETextSize.B4,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B3,
};

/** Свойства компонента IslandWidgetHeaderDescription. */
interface IIslandWidgetHeaderDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const IslandWidgetHeaderDescription: React.FC<IIslandWidgetHeaderDescriptionProps> = ({
    children,
    className,
    ...htmlDivAttributes
}) => {
    const { adaptive, size } = useContext(IslandWidgetContext);
    const textSize = adaptive ? SIZE_TO_ADAPTIVE_TEXT_SIZE_MAP[size] : ETextSize.B4;

    return (
        <Text
            tag="div"
            size={textSize}
            type={EFontType.SECONDARY}
            {...htmlDivAttributes}
            className={clsx(styles.islandWidgetHeaderDescription, className)}
        >
            {children}
        </Text>
    );
};

IslandWidgetHeaderDescription.displayName = "IslandWidgetHeaderDescription";
