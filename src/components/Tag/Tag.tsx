import React, { useCallback } from "react";
import clsx from "clsx";
import {
    CrossStrokeSrvIcon16,
    CrossStrokeSrvIcon20,
    CrossStrokeSrvIcon24,
    EditStrokeSrvIcon16,
    EditStrokeSrvIcon20,
    EditStrokeSrvIcon24,
} from "@sberbusiness/icons-next";
import { ITagProps } from "@sberbusiness/triplex-next/components/Tag/types";
import { Text } from "@sberbusiness/triplex-next/components/Typography/Text";
import { EFontType, ETextSize } from "@sberbusiness/triplex-next/components/Typography/enums";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import { createSizeToClassNameMap } from "@sberbusiness/triplex-next/utils/classNameMaps";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";
import styles from "./styles/Tag.module.less";

const sizeToClassNameMap = createSizeToClassNameMap(styles);

const sizeToTextSizeMap = {
    [EComponentSize.SM]: ETextSize.B4,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B2,
};

const sizeToEditIconMap = {
    [EComponentSize.SM]: <EditStrokeSrvIcon16 paletteIndex={5} />,
    [EComponentSize.MD]: <EditStrokeSrvIcon20 paletteIndex={5} />,
    [EComponentSize.LG]: <EditStrokeSrvIcon24 paletteIndex={5} />,
};

const sizeToRemoveIconMap = {
    [EComponentSize.SM]: <CrossStrokeSrvIcon16 paletteIndex={5} />,
    [EComponentSize.MD]: <CrossStrokeSrvIcon20 paletteIndex={5} />,
    [EComponentSize.LG]: <CrossStrokeSrvIcon24 paletteIndex={5} />,
};

/** Компонент, который демонстрирует выбранное значение того или иного параметра. */
export const Tag = React.forwardRef<HTMLSpanElement, ITagProps>(
    (
        { children, id, className, size, disabled, onRemove, onEdit, removeButtonProps, editButtonProps, ...restProps },
        ref,
    ) => {
        const renderContent = useCallback(() => {
            const type = disabled ? EFontType.DISABLED : EFontType.PRIMARY;

            return (
                <Text className={styles.content} type={type} size={sizeToTextSizeMap[size]}>
                    {children}
                </Text>
            );
        }, [children, size, disabled]);

        const renderEditButton = useCallback(() => {
            const { onClick, ...restEditButtonProps } = editButtonProps || {};

            return (
                <ButtonIcon
                    disabled={disabled}
                    onClick={(event) => {
                        onEdit?.(id);
                        onClick?.(event);
                    }}
                    {...restEditButtonProps}
                >
                    {sizeToEditIconMap[size]}
                </ButtonIcon>
            );
        }, [id, size, disabled, editButtonProps, onEdit]);

        const renderRemoveButton = useCallback(() => {
            const { onClick, ...restRemoveButtonProps } = removeButtonProps || {};

            return (
                <ButtonIcon
                    disabled={disabled}
                    onClick={(event) => {
                        onRemove?.(id);
                        onClick?.(event);
                    }}
                    {...restRemoveButtonProps}
                >
                    {sizeToRemoveIconMap[size]}
                </ButtonIcon>
            );
        }, [id, size, disabled, removeButtonProps, onRemove]);

        return (
            <span className={clsx(styles.tag, sizeToClassNameMap[size], className)} {...restProps} ref={ref}>
                {renderContent()}
                {onEdit && renderEditButton()}
                {renderRemoveButton()}
            </span>
        );
    },
);
