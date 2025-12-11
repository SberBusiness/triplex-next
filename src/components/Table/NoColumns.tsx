import React from "react";
import { clsx } from "clsx";
import { INoColumnsProps } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";
import { Gap } from "@sberbusiness/triplex-next/components/Gap";
import styles from "./styles/NoColumns.module.less";
import { ServicesetupSysIcon96 } from "@sberbusiness/icons-next";

/** Компонент отображающий информацию, когда скрыты все колонки таблицы. */
export const NoColumns: React.FC<INoColumnsProps> = ({ children, className, ...htmlDivAttributes }) => (
    <div className={clsx(styles.noColumns, className)} {...htmlDivAttributes}>
        <ServicesetupSysIcon96 />
        <Gap size={8} />
        <div className={styles.content}>{children}</div>
    </div>
);

NoColumns.displayName = "NoColumns";
