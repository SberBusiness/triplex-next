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
import { Link } from "@sberbusiness/triplex-next/components/Link/Link";

/**
 * Статические субкомпоненты TableBasicSettings.
 *
 * Явная аннотация снимает проверку лишних свойств у Object.assign, поэтому при добавлении
 * или удалении статики этот интерфейс нужно править синхронно: иначе новая статика окажется
 * в рантайме, но не попадёт в публичный тип, и TypeScript промолчит.
 */
interface ITableBasicSettingsComposition extends React.ForwardRefExoticComponent<
    ITableBasicSettingsProps & React.RefAttributes<HTMLDivElement>
> {
    /** Тело выпадающего блока настроек. */
    Body: typeof TableBasicSettingsBody;
    /** Список колонок с управлением видимостью и порядком. */
    ColumnSettings: typeof ColumnSettings;
    /** Подвал выпадающего блока настроек. */
    Footer: typeof TableBasicSettingsFooter;
    /** Шапка выпадающего блока настроек. */
    Header: typeof TableBasicSettingsHeader;
}

/** Ссылка-триггер, открывающая выпадающий блок с настройками колонок таблицы. */
export const TableBasicSettings: ITableBasicSettingsComposition = Object.assign(
    React.forwardRef<HTMLDivElement, ITableBasicSettingsProps>(function TableBasicSettings(
        { children, className, linkTitle, ...rest },
        ref,
    ) {
        const targetRef = useRef<HTMLAnchorElement>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);

        const renderButton = ({ opened, setOpened }: IButtonDropdownExtendedButtonProvideProps) => (
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
                ref={ref}
            />
        );
    }),
    {
        Body: TableBasicSettingsBody,
        ColumnSettings: ColumnSettings,
        Footer: TableBasicSettingsFooter,
        Header: TableBasicSettingsHeader,
    },
);

TableBasicSettings.displayName = "TableBasicSettings";
