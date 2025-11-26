import React from "react";
import { clsx } from "clsx";
import styles from "../styles/TableBasicSettingsHeader.module.less";
import { ITableBasicSettingsHeaderProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { EFontWeightText, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";

export const TableBasicSettingsHeader: React.FC<ITableBasicSettingsHeaderProps> = ({
    children,
    className,
    ...rest
}) => (
    <Text
        className={clsx(styles.tableBasicSettingsHeader, className)}
        size={ETextSize.B3}
        weight={EFontWeightText.SEMIBOLD}
        tag="div"
        {...rest}
    >
        {children}
    </Text>
);

TableBasicSettingsHeader.displayName = "TableBasicSettingsHeader";
