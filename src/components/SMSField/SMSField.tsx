import clsx from "clsx";
import React, { useState } from "react";
import { SMSFieldContext } from "@sberbusiness/triplex-next/components/SMSField/SMSFieldContext";
import { ISMSFieldProps } from "@sberbusiness/triplex-next/components/SMSField/types";
import { SMSFieldInput } from "@sberbusiness/triplex-next/components/SMSField/components/SMSFieldInput";
import { SMSFieldRefresh } from "@sberbusiness/triplex-next/components/SMSField/components/SMSFieldRefresh";
import { SMSFieldSubmit } from "@sberbusiness/triplex-next/components/SMSField/components/SMSFieldSubmit";
import { SMSFieldTooltip } from "@sberbusiness/triplex-next/components/SMSField/components/SMSFieldTooltip";
import styles from "@sberbusiness/triplex-next/components/SMSField/styles/SMSField.module.less";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

// Соответствие размера имени класса.
const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Внутренние составляющие SMSField. */
interface ISMSFieldComposition {
    Tooltip: typeof SMSFieldTooltip;
    Refresh: typeof SMSFieldRefresh;
    Input: typeof SMSFieldInput;
    Submit: typeof SMSFieldSubmit;
}

/** Компонент для ввода СМС. */
export const SMSField: React.FC<ISMSFieldProps> & ISMSFieldComposition = (props) => {
    const { children, className, code, disabled, error, onChangeCode, onSubmitCode, size, ...htmlDivAttributes } =
        props;

    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [tooltipId, setTooltipId] = useState<string>();
    const classSMSField = clsx(styles.smsField, className);

    return (
        <SMSFieldContext.Provider
            value={{
                code,
                disabled: !!disabled,
                disabledSubmit,
                error: !!error,
                onChangeCode,
                onSubmitCode,
                setDisabledSubmit,
                setTooltipId,
                size,
                sizeClassName: sizeToClassNameMap[size],
                tooltipId,
            }}
        >
            <div className={classSMSField} {...htmlDivAttributes} data-tx={process.env.npm_package_version}>
                {children}
            </div>
        </SMSFieldContext.Provider>
    );
};

SMSField.displayName = "SMSField";
SMSField.Tooltip = SMSFieldTooltip;
SMSField.Refresh = SMSFieldRefresh;
SMSField.Input = SMSFieldInput;
SMSField.Submit = SMSFieldSubmit;
