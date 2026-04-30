import React from "react";
import clsx from "clsx";
import styles from "../styles/ListItemControlsButton.module.less";
import { EFontWeightText, ETextSize } from "../../Typography/enums";
import { Text } from "../../Typography/Text";
import { IconWrapper } from "../../IconWrapper";

export interface IListItemControlsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Иконка кнопки. Отображается над текстом, если переданы и иконка, и children. */
    icon?: React.ReactNode;
}

/** Кнопка listItem для области под свайпом. */
export const ListItemControlsButton = React.forwardRef<HTMLButtonElement, IListItemControlsButtonProps>(
    ({ children, className, icon, ...rest }, ref) => (
        <button
            type="button"
            className={clsx(
                styles.listItemControlsButton,
                {
                    [styles.withIcon]: Boolean(icon),
                    [styles.withText]: Boolean(children),
                },
                className,
            )}
            {...rest}
            ref={ref}
        >
            <IconWrapper
                className={styles.listItemControlsButtonInner}
                disabled={!!rest.disabled}
                active={!!rest["aria-expanded"]}
            >
                {icon ? <span className={styles.listItemControlsButtonIcon}>{icon}</span> : null}
                {children ? (
                    <Text
                        className={styles.listItemControlsButtonLabel}
                        size={ETextSize.B4}
                        weight={EFontWeightText.SEMIBOLD}
                    >
                        {children}
                    </Text>
                ) : null}
            </IconWrapper>
        </button>
    ),
);

ListItemControlsButton.displayName = "ListItemControlsButton";
