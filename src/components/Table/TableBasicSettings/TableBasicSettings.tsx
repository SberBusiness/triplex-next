import React, { useRef } from "react";
import {
    ButtonDropdownExtended,
    IButtonDropdownExtendedButtonProvideProps,
    IButtonDropdownExtendedDropdownProvideProps,
} from "@sberbusiness/triplex-next/components/Button/ButtonDropdownExtended";
import { clsx } from "clsx";
import styles from "./styles/TableBasicSettings.module.less";
import { TableBasicSettingsBody } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/TableBasicSettingsBody";
import { ColumnSettings } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/ColumnSettings";
import { TableBasicSettingsFooter } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/TableBasicSettingsFooter";
import { TableBasicSettingsHeader } from "@sberbusiness/triplex-next/components/Table/TableBasicSettings/components/TableBasicSettingsHeader";
import { ITableBasicSettingsProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { Link } from "@sberbusiness/triplex-next/components/Link/Link";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";

interface ITableBasicSettingsFC extends React.FC<ITableBasicSettingsProps> {
    Body: typeof TableBasicSettingsBody;
    ColumnSettings: typeof ColumnSettings;
    Footer: typeof TableBasicSettingsFooter;
    Header: typeof TableBasicSettingsHeader;
}

/** Компонент панели под элементы фильтрации данных для таблицы. */
export const TableBasicSettings: ITableBasicSettingsFC = ({ children, className, linkTitle, ...rest }) => {
    const targetRef = useRef<HTMLAnchorElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => (
        <Text size={ETextSize.B3}>
            <Link
                href="#"
                aria-haspopup="listbox"
                aria-controls="button-dropdown-extended-list"
                aria-expanded={opened}
                onClick={(event) => {
                    event.preventDefault();
                    setOpened(!opened);
                }}
                ref={targetRef}
            >
                {linkTitle}
            </Link>
        </Text>
    );

    const renderDropdown = ({ className, ...dropdownProps }: IButtonDropdownExtendedDropdownProvideProps) => (
        <ButtonDropdownExtended.Dropdown
            className={clsx(styles.tableSettingsDropdown, className)}
            {...dropdownProps}
            targetRef={targetRef}
            ref={dropdownRef}
        >
            {children}
        </ButtonDropdownExtended.Dropdown>
    );

    return (
        <ButtonDropdownExtended
            className={clsx(styles.tableSettingsLink, className)}
            renderButton={renderButton}
            renderDropdown={renderDropdown}
            dropdownRef={dropdownRef}
            {...rest}
        />
    );
};

TableBasicSettings.displayName = "TableBasicSettings";
TableBasicSettings.Body = TableBasicSettingsBody;
TableBasicSettings.ColumnSettings = ColumnSettings;
TableBasicSettings.Footer = TableBasicSettingsFooter;
TableBasicSettings.Header = TableBasicSettingsHeader;
