import React, { useState } from "react";
import clsx from "clsx";
import { EFormFieldStatus } from "@sberbusiness/triplex-next/components/FormField";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { SMSFieldContext } from "./SMSFieldContext";
import { ISMSFieldProps } from "./types";
import { SMSFieldInput } from "./components/SMSFieldInput";
import { SMSFieldRefresh } from "./components/SMSFieldRefresh";
import { SMSFieldSubmit } from "./components/SMSFieldSubmit";
import { SMSFieldTooltip } from "./components/SMSFieldTooltip";
import styles from "./styles/SMSField.module.less";

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Компонент для ввода СМС. Ref указывает на корневой div. */
export const SMSField = Object.assign(
    React.forwardRef<HTMLDivElement, ISMSFieldProps>((props, ref) => {
        const {
            children,
            className,
            code,
            onChangeCode,
            onSubmitCode,
            size,
            status = EFormFieldStatus.DEFAULT,
            ...htmlDivAttributes
        } = props;

        const [disabledSubmit, setDisabledSubmit] = useState(true);
        const [tooltipId, setTooltipId] = useState<string>();
        const classSMSField = clsx(styles.smsField, className);

        return (
            <SMSFieldContext.Provider
                value={{
                    code,
                    disabledSubmit,
                    onChangeCode,
                    onSubmitCode,
                    setDisabledSubmit,
                    setTooltipId,
                    size,
                    sizeClassName: SIZE_TO_CLASS_NAME_MAP[size],
                    status,
                    tooltipId,
                }}
            >
                <div
                    className={classSMSField}
                    {...htmlDivAttributes}
                    data-tx={process.env.npm_package_version}
                    ref={ref}
                >
                    {children}
                </div>
            </SMSFieldContext.Provider>
        );
    }),
    {
        Tooltip: SMSFieldTooltip,
        Refresh: SMSFieldRefresh,
        Input: SMSFieldInput,
        Submit: SMSFieldSubmit,
    },
);

SMSField.displayName = "SMSField";
