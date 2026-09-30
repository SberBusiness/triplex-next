import React, { useContext } from "react";
import clsx from "clsx";
import { ButtonBase } from "../Button/ButtonBase";
import { IconWrapper } from "../IconWrapper";
import { ESegmentedControlType } from "./enums";
import { SegmentedControlContext } from "./SegmentedControlContext";
import { ISegmentedControlSegmentProps } from "./types";
import { getSegmentTitle, isSegmentSelected } from "./utils";
import styles from "./styles/SegmentedControlSegment.module.less";

/** Элемент SegmentedControl, представляет собой опцию для выбора. */
export const SegmentedControlSegment = React.forwardRef<HTMLButtonElement, ISegmentedControlSegmentProps>(
    ({ children, className, value, title, disabled, onClick, ...rest }, ref) => {
        const {
            type,
            value: valueFromContext,
            disabled: disabledFromContext,
            onSegmentSelect,
        } = useContext(SegmentedControlContext);

        const selected = isSegmentSelected(type, value, valueFromContext);
        const isDisabled = disabled || disabledFromContext;
        const classNames = clsx(styles.segmentedControlSegment, { [styles.selected]: selected }, className);

        const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
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
            <IconWrapper displayContents disabled={isDisabled} active={selected}>
                <ButtonBase
                    className={classNames}
                    title={getSegmentTitle(title, children)}
                    disabled={isDisabled}
                    aria-pressed={selected}
                    onClick={handleClick}
                    {...rest}
                    ref={ref}
                >
                    <span className={styles.content}>{children}</span>
                </ButtonBase>
            </IconWrapper>
        );
    },
);

SegmentedControlSegment.displayName = "SegmentedControlSegment";
