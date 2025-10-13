import React, { useContext } from "react";
import clsx from "clsx";
import { ButtonBase } from "@sberbusiness/triplex-next/components/Button/ButtonBase";
import { ISegmentedControlSegmentProps } from "@sberbusiness/triplex-next/components/SegmentedControl/types";
import { ESegmentedControlType } from "@sberbusiness/triplex-next/components/SegmentedControl/enums";
import styles from "./styles/SegmentedControlSegment.module.less";
import { SegmentedControlContext } from "@sberbusiness/triplex-next/components/SegmentedControl/SegmentedControlContext";

/** Элемент SegmentedControl, представляет собой опцию для выбора. */
export const SegmentedControlSegment: React.FC<ISegmentedControlSegmentProps> = ({
    children,
    className,
    value,
    title,
    disabled,
    onClick,
    ...rest
}) => {
    const {
        type,
        value: valueFromContext,
        disabled: disabledFromContext,
        onSegmentSelect,
    } = useContext(SegmentedControlContext);

    const isSelected = (): boolean => {
        switch (type) {
            case ESegmentedControlType.SINGLE:
                return value === valueFromContext;
            case ESegmentedControlType.MULTIPLE:
                return valueFromContext.includes(value);
        }
    };

    const selected = isSelected();
    const classNames = clsx(
        styles.segmentedControlSegment,
        { [styles.selected]: selected },
        "hoverable",
        { active: selected },
        className,
    );

    const getTitle = () => {
        if (title) {
            return title;
        }

        if (typeof children === "string") {
            return children;
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch (type) {
            case ESegmentedControlType.SINGLE:
                onSegmentSelect({ value, selected: true });
                break;
            case ESegmentedControlType.MULTIPLE:
                onSegmentSelect({ value, selected: !selected });
                break;
        }

        onClick?.(event);
    };

    return (
        <ButtonBase
            className={classNames}
            title={getTitle()}
            disabled={disabled || disabledFromContext}
            aria-pressed={selected}
            onClick={handleClick}
            {...rest}
        >
            <span className={styles.content}>{children}</span>
        </ButtonBase>
    );
};

SegmentedControlSegment.displayName = "SegmentedControlSegment";
