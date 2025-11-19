import clsx from "clsx";
import React, { useState } from "react";
import { SMSInputContext } from "@sberbusiness/triplex-next/components/SMSInput/SMSInputContext";
import { ISMSInputProps } from "@sberbusiness/triplex-next/components/SMSInput/types";
import { SMSInputInput } from "@sberbusiness/triplex-next/components/SMSInput/components/SMSInputInput";
import { SMSInputRefresh } from "@sberbusiness/triplex-next/components/SMSInput/components/SMSInputRefresh";
import { SMSInputSubmit } from "@sberbusiness/triplex-next/components/SMSInput/components/SMSInputSubmit";
import { SMSInputTooltip } from "@sberbusiness/triplex-next/components/SMSInput/components/SMSInputTooltip";
import styles from "@sberbusiness/triplex-next/components/SMSInput/styles/SMSInput.module.less";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";

// Соответствие размера имени класса.
const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Внутренние составляющие SMSInput. */
interface ISMSInputComposition {
    Tooltip: typeof SMSInputTooltip;
    Refresh: typeof SMSInputRefresh;
    Input: typeof SMSInputInput;
    Submit: typeof SMSInputSubmit;
}

/** Компонент для ввода СМС. */
export const SMSInput: React.FC<ISMSInputProps> & ISMSInputComposition = (props) => {
    const { children, className, code, disabled, error, onChangeCode, onSubmitCode, size, ...htmlDivAttributes } =
        props;

    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [tooltipId, setTooltipId] = useState<string>();
    const classSMSInput = clsx(styles.smsInput, className);

    return (
        <SMSInputContext.Provider
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
            <div className={classSMSInput} {...htmlDivAttributes} data-tx={process.env.npm_package_version}>
                {children}
            </div>
        </SMSInputContext.Provider>
    );
};

SMSInput.displayName = "SMSInput";
SMSInput.Tooltip = SMSInputTooltip;
SMSInput.Refresh = SMSInputRefresh;
SMSInput.Input = SMSInputInput;
SMSInput.Submit = SMSInputSubmit;
