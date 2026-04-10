import React from "react";
import clsx from "clsx";
import { IEmptyViewProps } from "./types";
import { EEmptyViewSize } from "./enums";
import { Title } from "../Typography/Title";
import { EFontType, EFontWeightText, EFontWeightTitle, ETextSize, ETitleSize } from "../Typography/enums";
import { Text } from "../Typography/Text";
import { Gap } from "../Gap/Gap";
import styles from "./styles/EmptyView.module.less";

const SIZE_CLASS_MAP: Record<EEmptyViewSize, string> = {
    [EEmptyViewSize.SM]: styles.sm,
    [EEmptyViewSize.MD]: styles.md,
};

/** Заглушка для пустых состояний. */
export const EmptyView = React.forwardRef<HTMLDivElement, IEmptyViewProps>(
    ({ className, size, icon, title, description, caption, buttons, ...rest }, ref) => {
        const renderTitle = () => {
            if (size === EEmptyViewSize.SM) {
                return (
                    <Title size={ETitleSize.H3} weight={EFontWeightTitle.MEDIUM}>
                        {title}
                    </Title>
                );
            }

            return (
                <Title size={ETitleSize.H2} weight={EFontWeightTitle.SEMIBOLD}>
                    {title}
                </Title>
            );
        };

        const renderDescriptionAndCaption = (text: React.ReactNode) => {
            if (size === EEmptyViewSize.SM) {
                return (
                    <Text size={ETextSize.B3} weight={EFontWeightText.REGULAR} type={EFontType.SECONDARY}>
                        {text}
                    </Text>
                );
            }

            return (
                <Text size={ETextSize.B2} weight={EFontWeightText.REGULAR} type={EFontType.SECONDARY}>
                    {text}
                </Text>
            );
        };

        return (
            <div
                className={clsx(styles.emptyView, SIZE_CLASS_MAP[size], { [styles.hasTitle]: !!title }, className)}
                ref={ref}
                {...rest}
            >
                <div className={styles.container}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    {icon && size === EEmptyViewSize.SM && <Gap size={8} />}

                    {(title || description || caption) && (
                        <div className={styles.textBlock}>
                            {title && renderTitle()}
                            {title && <Gap size={12} />}

                            {(description || caption) && (
                                <div className={styles.descriptionBlock}>
                                    {description && renderDescriptionAndCaption(description)}
                                    {caption && description && <Gap size={8} />}
                                    {caption && renderDescriptionAndCaption(caption)}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Gap size={size === EEmptyViewSize.SM ? 16 : 24} />
                {buttons && <div className={styles.buttons}>{buttons}</div>}
            </div>
        );
    },
);

EmptyView.displayName = "EmptyView";
