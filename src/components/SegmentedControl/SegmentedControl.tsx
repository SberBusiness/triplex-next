import React from "react";
import clsx from "clsx";
import { SegmentedControlSegment } from "@sberbusiness/triplex-next/components/SegmentedControl/SegmentedControlSegment";
import {
    ISegmentedControlSingleProps,
    ISegmentedControlMultipleProps,
} from "@sberbusiness/triplex-next/components/SegmentedControl/types";
import {
    ESegmentedControlTheme,
    ESegmentedControlType,
} from "@sberbusiness/triplex-next/components/SegmentedControl/enums";
import {
    ISegmentedControlContextType,
    SegmentedControlContext,
} from "@sberbusiness/triplex-next/components/SegmentedControl/SegmentedControlContext";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import styles from "./styles/SegmentedControl.module.less";

/** Соответствие темы имени класса. */
const themeToClassNameMap = {
    [ESegmentedControlTheme.GENERAL_1]: styles.general1,
    [ESegmentedControlTheme.GENERAL_2]: styles.general2,
    [ESegmentedControlTheme.SECONDARY_1]: styles.secondary1,
    [ESegmentedControlTheme.SECONDARY_2]: styles.secondary2,
};

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Набор опций для выбора одного или нескольких вариантов. */
export const SegmentedControl = Object.assign(
    React.forwardRef<HTMLDivElement, ISegmentedControlSingleProps | ISegmentedControlMultipleProps>(
        ({ children, className, value, theme, type, size, disabled, onSelect, ...rest }, ref) => {
            const classNames = clsx(
                styles.segmentedControl,
                themeToClassNameMap[theme],
                sizeToClassNameMap[size],
                className,
            );

            const handleSegmentSelect: ISegmentedControlContextType["onSegmentSelect"] = ({
                selected,
                value: newSegmentValue,
            }) => {
                switch (type) {
                    case ESegmentedControlType.SINGLE:
                        if (selected) {
                            onSelect(newSegmentValue);
                        }
                        break;
                    case ESegmentedControlType.MULTIPLE:
                        if (selected) {
                            onSelect([...value, newSegmentValue]);
                        } else {
                            onSelect([...value].filter((segmentValue) => segmentValue !== newSegmentValue));
                        }
                }
            };

            return (
                <SegmentedControlContext.Provider
                    value={{
                        type,
                        value,
                        disabled: Boolean(disabled),
                        onSegmentSelect: handleSegmentSelect,
                    }}
                >
                    <div className={classNames} {...rest} data-tx={process.env.npm_package_version} ref={ref}>
                        {children}
                    </div>
                </SegmentedControlContext.Provider>
            );
        },
    ),
    {
        Segment: SegmentedControlSegment,
    },
);

SegmentedControl.displayName = "SegmentedControl";
