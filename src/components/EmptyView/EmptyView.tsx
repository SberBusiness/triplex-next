import React from "react";
import clsx from "clsx";
import { IEmptyViewProps } from "./types";
import { EEmptyViewSize } from "./enums";
import { Title } from "../Typography/Title";
import { EFontType, EFontWeightText, EFontWeightTitle, ETextSize, ETitleSize } from "../Typography/enums";
import { Text } from "../Typography/Text";
import { Gap, TGapSize } from "../Gap/Gap";
import styles from "./styles/EmptyView.module.less";

const SIZE_CLASS_MAP: Record<EEmptyViewSize, string> = {
    [EEmptyViewSize.SM]: styles.sm,
    [EEmptyViewSize.MD]: styles.md,
};

const TITLE_CONFIG: Record<EEmptyViewSize, { size: ETitleSize; weight: EFontWeightTitle }> = {
    [EEmptyViewSize.SM]: { size: ETitleSize.H3, weight: EFontWeightTitle.MEDIUM },
    [EEmptyViewSize.MD]: { size: ETitleSize.H2, weight: EFontWeightTitle.SEMIBOLD },
};

const TEXT_SIZE_MAP: Record<EEmptyViewSize, ETextSize> = {
    [EEmptyViewSize.SM]: ETextSize.B3,
    [EEmptyViewSize.MD]: ETextSize.B2,
};

const BUTTONS_GAP_MAP: Record<EEmptyViewSize, TGapSize> = {
    [EEmptyViewSize.SM]: 16,
    [EEmptyViewSize.MD]: 24,
};

/** Заглушка для пустых состояний. */
export const EmptyView = React.forwardRef<HTMLDivElement, IEmptyViewProps>(
    ({ className, size, icon, title, description, caption, buttons, ...rest }, ref) => {
        const hasDescription = !!(description || caption);

        return (
            <div
                className={clsx(styles.emptyView, SIZE_CLASS_MAP[size], { [styles.hasTitle]: !!title }, className)}
                ref={ref}
                {...rest}
            >
                <div className={styles.container}>
                    {icon && <div className={styles.icon}>{icon}</div>}
                    {icon && size === EEmptyViewSize.SM && <Gap size={8} />}

                    {(title || hasDescription) && (
                        <div className={styles.textBlock}>
                            {title && <Title {...TITLE_CONFIG[size]}>{title}</Title>}
                            {title && hasDescription && <Gap size={12} />}

                            {hasDescription && (
                                <div className={styles.descriptionBlock}>
                                    {description && (
                                        <Text
                                            size={TEXT_SIZE_MAP[size]}
                                            weight={EFontWeightText.REGULAR}
                                            type={title ? EFontType.SECONDARY : EFontType.PRIMARY}
                                        >
                                            {description}
                                        </Text>
                                    )}
                                    {description && caption && <Gap size={8} />}
                                    {caption && (
                                        <Text
                                            size={TEXT_SIZE_MAP[size]}
                                            weight={EFontWeightText.REGULAR}
                                            type={EFontType.SECONDARY}
                                        >
                                            {caption}
                                        </Text>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {buttons && (
                    <>
                        <Gap size={BUTTONS_GAP_MAP[size]} />
                        <div className={styles.buttons}>{buttons}</div>
                    </>
                )}
            </div>
        );
    },
);

EmptyView.displayName = "EmptyView";
