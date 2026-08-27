import React from "react";
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

/** Индекс цвета иконок в палитре — служебный серый, одинаковый для обеих кнопок. */
const ICON_PALETTE_INDEX = 5;

/** Соответствие размера тега имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Соответствие размера тега размеру текста. */
const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.SM]: ETextSize.B4,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.LG]: ETextSize.B2,
};

/** Соответствие размера тега иконке кнопки редактирования. */
const SIZE_TO_EDIT_ICON_MAP: Record<EComponentSize, React.ReactElement> = {
    [EComponentSize.SM]: <EditStrokeSrvIcon16 paletteIndex={ICON_PALETTE_INDEX} />,
    [EComponentSize.MD]: <EditStrokeSrvIcon20 paletteIndex={ICON_PALETTE_INDEX} />,
    [EComponentSize.LG]: <EditStrokeSrvIcon24 paletteIndex={ICON_PALETTE_INDEX} />,
};

/** Соответствие размера тега иконке кнопки удаления. */
const SIZE_TO_REMOVE_ICON_MAP: Record<EComponentSize, React.ReactElement> = {
    [EComponentSize.SM]: <CrossStrokeSrvIcon16 paletteIndex={ICON_PALETTE_INDEX} />,
    [EComponentSize.MD]: <CrossStrokeSrvIcon20 paletteIndex={ICON_PALETTE_INDEX} />,
    [EComponentSize.LG]: <CrossStrokeSrvIcon24 paletteIndex={ICON_PALETTE_INDEX} />,
};

/**
 * Компонент, который демонстрирует выбранное значение того или иного параметра.
 *
 * Кнопка удаления рендерится всегда, кнопка редактирования — только когда передан `onEdit`.
 * Обе кнопки — `ButtonIcon` без текста, поэтому `aria-label` задаёт потребитель
 * через `removeButtonProps` и `editButtonProps`.
 */
export const Tag = React.forwardRef<HTMLSpanElement, ITagProps>(
    (
        { children, id, className, size, disabled, onRemove, onEdit, removeButtonProps, editButtonProps, ...restProps },
        ref,
    ) => {
        // onClick кнопок вынимается из props, чтобы колбэк тега вызвался до пользовательского обработчика.
        const { onClick: onEditButtonClick, ...restEditButtonProps } = editButtonProps ?? {};
        const { onClick: onRemoveButtonClick, ...restRemoveButtonProps } = removeButtonProps ?? {};

        const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onEdit?.(id);
            onEditButtonClick?.(event);
        };

        const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onRemove?.(id);
            onRemoveButtonClick?.(event);
        };

        return (
            <span
                id={id}
                className={clsx(styles.tag, SIZE_TO_CLASS_NAME_MAP[size], className)}
                {...restProps}
                ref={ref}
            >
                <Text
                    className={styles.content}
                    type={disabled ? EFontType.DISABLED : EFontType.PRIMARY}
                    size={SIZE_TO_TEXT_SIZE_MAP[size]}
                >
                    {children}
                </Text>
                {onEdit && (
                    <ButtonIcon disabled={disabled} onClick={handleEditClick} {...restEditButtonProps}>
                        {SIZE_TO_EDIT_ICON_MAP[size]}
                    </ButtonIcon>
                )}
                <ButtonIcon disabled={disabled} onClick={handleRemoveClick} {...restRemoveButtonProps}>
                    {SIZE_TO_REMOVE_ICON_MAP[size]}
                </ButtonIcon>
            </span>
        );
    },
);

Tag.displayName = "Tag";
